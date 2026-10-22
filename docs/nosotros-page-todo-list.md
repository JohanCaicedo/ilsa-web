# Todos: `/nosotros` Page Architecture Improvements
**Document:** Derived from `nosotros-page-architecture-review.md`
**Status:** Work in Progress
**Last Updated:** 2026-10-22

---

## Overview

| Phase | Tasks | Est. Time | Priority |
|-------|-------|-----------|----------|
| **P0: Critical Fixes** | 3 tasks | 4-5 hours | 🔴 Immediate |
| **P1: Architecture Cleanup** | 3 tasks | 10-14 hours | 🟡 Week 1 |
| **P2: Scalability** | 3 tasks | 7-11 hours | 🟢 Month |

**Total Estimated Time:** 21-30 hours

---

## ✅ Phase 0: Setup

- [ ] Create backup of current `src/pages/nosotros/index.astro` (`cp src/pages/nosotros/index.astro src/pages/nosotros/index.astro.backup`)
- [ ] Review this todo list with team
- [ ] Set up tracking board (GitHub Projects/Linear)

---

## 🔴 Phase 1: Critical Fixes (P0)

**Goal:** Fix runtime bugs and cache strategy violations that cause immediate user issues

### Task 1.1: Fix Cache Strategy for ISR
**Est:** 1-2 hours | **File:** `src/pages/nosotros/index.astro`, `src/lib/wp.ts`

- [x] Modify `src/lib/wp.ts` to add cache header helper
  - Add `setEdgeCacheHeader()` function
  - Export function for use in multiple routes
- [x] Update `src/pages/nosotros/index.astro` cache strategy:
  - Keep `export const prerender = true;` (static content)
  - Add: `Astro.response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');`
- [x] Test cache regeneration manually
- [x] Verify cache headers in response using browser dev tools or curl
- [ ] Commit with message: `"fix: switch nosotros page to ISR caching strategy"`

---

### Task 1.2: Add GraphQL Error Handling
**Est:** 30 minutes | **File:** `src/pages/nosotros/index.astro`

- [x] Add try-catch block around `wpQuery` call (lines 58-82)
- [x] Console.error for graceful degradation
- [x] Set fallback `seoData` to undefined (current behavior)
- [x] Test with network failure simulation
  - Temporarily mock failing WP endpoint
- [x] Verify page doesn't crash on gateway error
- [ ] Commit with message: `"fix: add graphql error handling to nosotros page"`

---

### Task 1.3: Extract AutoSlider Component
**Est:** 2-3 hours | **Files:**
- `src/components/templates/AutoSlider.astro` (create)
- `src/pages/nosotros/index.astro` (update)

**File Creation:**
- [x] Create `src/components/templates/AutoSlider.astro`
- [x] Copy inline slider HTML logic (lines 146-166, 295-319, 366-386, 455-475)
- [x] Import `SmartImage` from `../atoms`
- [x] Define prop interface
- [x] Implement `AutoSliderCanvas` Web Component
- [x] Test in isolation (develop locally first)

**File Updates:**
- [x] Import `AutoSlider` component in `src/pages/nosotros/index.astro`
- [x] Remove inline slider code blocks (4 instances)
- [x] Replace with `<AutoSlider class="..." slides={[]} autoplayDelay={4000} />`
- [x] Replace 4 arrays of image data with `slides` prop
- [x] Test all sliders in page functionality
- [x] Verify no regressions in functionality
- [x] Need to import SmartImage (which is already being used inline)
- [x] Verify dark mode and responsive design
- [ ] Commit with message: `"refactor: extract AutoSlider component for reusability"`

---

## 🚀 Phase 2: Architecture Cleanup (P1)

**Goal:** Eliminate code duplication and establish component reuse patterns

### Task 2.1: Create Reusable Team Card Component
**Est:** 3-4 hours | **Files:**
- `src/components/molecules/TeamCard.astro` (create)
- `src/pages/nosotros/index.astro` (update)

**Component Creation:**
- [x] Create `src/components/molecules/TeamCard.astro`
- [x] Import `SmartImage` from `../atoms` (using native img for card layout control)
- [x] Import `TeamMember` type from `src/lib/team`
- [x] Define component props:
  - `member: TeamMember`
  - `variant: "executive" | "board" | "thumb"`
  - `index?: number`
- [x] Implement gold badge logic (only for index 0)
- [x] Implement hover effects
- [x] Add keyboard navigation (`tabindex="0"`)
- [x] Add ARIA labels
- [x] Test variant rendering

**File Updates:**
- [x] Replace `teamData` map block (lines 601-683) with `<TeamCard member={member} variant="executive" />`
- [x] Replace `boardData` map block (lines 704-789) with `<TeamCard member={member} variant="board" />`
- [x] Remove duplicate card markup
- [x] Test team modal integration
- [x] Verify gold badge only shows on directors/board
- [x] Check hover states and animations
- [x] Test keyboard navigation
- [ ] Commit with message: `"refactor: create reusable TeamCard component"`

---

### Task 2.2: Centralize Image Gallery Config
**Est:** 1-2 hours | **File:** `src/lib/pages/nosotros-gallery.ts` (create)

**File Creation:**
- [ ] Create `src/lib/pages/nosotros-gallery.ts`
- [ ] Define `GalleryConfig` and `ImageSlide` interfaces
- [ ] Move image data from:
  - `heroImages` → hero config
  - `geoImages` → geo config
  - `missionImages` → mission config
  - `visionImages` → vision config
  - `camposImages` → campos config
- [ ] Export `galeriaConfig` array and derived object
- [ ] Add type documentation

**File Updates:**
- [ ] Update `src/pages/nosotros/index.astro` to import galeria config
- [ ] Remove 5 static image arrays (lines 17-51)
- [ ] Replace with destructure: `const { hero, geo, mission, vision, campos } = galerias`
- [ ] Replace image references with `hero.images`, `geo.images`, etc.
- [ ] Clean up imports (remove unused variables)
- [ ] Verify all images display correctly
- [ ] Test slider regeneration
- [ ] Commit with message: `"refactor: centralize galeria config into lib layer"`

---

### Task 2.3: Extract Page Sections into Components
**Est:** 6-8 hours | **Files:**
- Create 4 new component files
- Update `src/pages/nosotros/index.astro`

**Component Creations:**

1. **HeroSection.astro**
   - Create `src/components/templates/nosotros/HeroSection.astro`
   - Extract lines 103-261 (hero + feature grid + divider)
   - Extract mission/vision into `MissionVisionSection.astro`
   - Test section independently

2. **PresenceSection.astro**
   - Create `src/components/templates/nosotros/PresenceSection.astro`
   - Extract lines 273-321 (ColombiaMap + geo slider)
   - Test slider functionality
   - Verify responsive layout

3. **MissionVisionSection.astro**
   - Create `src/components/templates/nosotros/MissionVisionSection.astro`
   - Extract lines 323-447 (mission/vision content + sliders)
   - Maintain tab/slide functionality
   - Test mobile behavior

4. **WorkAreasSection.astro**
   - Create `src/components/templates/nosotros/WorkAreasSection.astro`
   - Extract lines 449-582 (accordion + campos images)
   - Use existing `AccordionItem` component
   - Test accordion interaction

**File Updates:**
- [ ] Replace extracted sections with component imports in `src/pages/nosotros/index.astro`
- [ ] Reduce main page to <300 lines
- [ ] Test integrated page rendering
- [ ] Verify no regressions in section transitions
- [ ] Check performance (build time, LCP)
- [ ] Commit with message: `"refactor: extract page sections into reusable components"`

---

## 🏗️ Phase 3: Scalability & Future-Proofing (P2)

**Goal:** Make system more testable and maintainable

### Task 3.1: Make Modal Data-Driven
**Est:** 4-6 hours | **Files:**
- `src/components/molecules/TeamModal.astro` (update)
- `src/pages/nosotros/index.astro` (update)

**Component Updates:**
- [ ] Remove hardcoded `.interactive-card[data-team-id]` selectors
- [ ] Accept `props.members: TeamMember[]` instead of reading from global scope
- [ ] Accept `props.onClose: () => void` callback
- [ ] Remove inline data references
- [ ] Make dynamic data injection via JS
- [ ] Add prop validation (TypeScript interfaces)
- [ ] Test modal with various team sizes

**File Updates:**
- [ ] Update template to pass computed `allMembers` array as prop
- [ ] Pass `onClose` function
- [ ] Remove `define:vars={{ allMembers }}` script block
- [ ] Verify modal opens for any team member
- [ ] Test closing behavior
- [ ] Verify focus management
- [ ] Accessibility audit (ARIA labels, focus trap)
- [ ] Commit with message: `"refactor: make TeamModal data-driven and prop-based"`

---

### Task 3.2: Add TypeScript Accessibility Checklist
**Est:** 2-3 hours | **Files:**
- `src/lib/a11y.ts` (create)
- Add to CI pipeline

**File Creation:**
- [ ] Create `src/lib/a11y.ts`
- [ ] Define `validateTeamCardCard()` function
- [ ] Add prop validation pattern
- [ ] Create helper for focus trap validation
- [ ] Add keyboard nav compliance checker

**CI Updates:**
- [ ] Add npm script: `"type-check:a11y": "node src/lib/a11y.ts"`
- [ ] Add to CI/CD pipeline (GitHub Actions or similar)
- [ ] Configure pre-commit hook if desired
- [ ] Make types enforcement strict
- [ ] Commit with message: `"feat: add TypeScript accessibility checker to CI"`

---

### Task 3.3: Track Design Token Usage
**Est:** 1-2 hours | **Files:**
- `.eslintrc.json` (update)
- `global.css` (check for theme variables)

**Linter Configuration:**
- [ ] Add eslint rule to restrict inline color hex codes
- [ ] Configure exception for `global.css`
- [ ] Document allowed inline patterns
- [ ] Set up lint-staged for pre-commit enforcement
- [ ] Run linter on current codebase to identify violations

**Documentation:**
- [ ] Add comment prefix for inline tokens: `/* design-token: #4e7cce */`
- [ ] Document theme variables in `global.css`
- [ ] Create design token lookup sheet
- [ ] Commit with message: `"style: add design token linter rule"`

---

## 📊 Phase Completion Criteria

### Phase 1 Complete When:
- ✅ ISR cache headers verified via tracing async.propagate-tests using Cloudflare logs
- ✅ No runtime errors when page loads
- ✅ All sliders function correctly with extracted component
- ✅ GraphQL errors handled gracefully

### Phase 2 Complete When:
- ✅ Team cards reuse single component
- ✅ No duplicate rendering logic (184 lines eliminated)
- ✅ Image config centralized (~25 lines reduced)
- ✅ Image sections decomposed (4 components created)
- ✅ Main page reduced to <400 lines

### Phase 3 Complete When:
- ✅ Modal data-driven (no DOM selectors)
- ✅ TypeScript check runs successfully in CI
- ✅ Design token violations flagged in lint
- ✅ All automated tests passing
- ✅ Accessibility audit completed (axe-core)

---

## 🔍 Acceptance Testing Checklist

After all phases complete, verify:

- [ ] Page builds successfully without warnings
- [ ] All original functionality preserved
- [ ] Performance metrics improved or unchanged:
  - [ ] LCP reduced by 15% (target: <2.5s)
  - [ ] TBT reduced by 20% (target: <600ms)
  - [ ] Layout Shift: <0.1
- [ ] Cache headers correctly set
- [ ] Mobile responsiveness verified on:
  - [ ] iPhone 12 (390px width)
  - [ ] iPhone 14 Pro (393px width)
  - [ ] iPad Pro (1024px width)
  - [ ] Desktop 1920px
- [ ] Dark mode functioning correctly
- [ ] ESLint passes with no warnings
- [ ] TypeScript types valid throughout
- [ ] Automated tests (axe-core) score ≥95%

---

## 📈 Progress Tracking

| Phase | Tasks | Completed | Remaining | % |
|-------|-------|-----------|-----------|---|
| Phase 0: Setup | 4 tasks | 0 | 4 | 0% |
| **Phase 1** | 3 tasks | 0 | 3 | 0% |
| **Phase 2** | 3 tasks | 0 | 3 | 0% |
| **Phase 3** | 3 tasks | 0 | 3 | 0% |
| **Total** | 12 tasks | 0 | 12 | 0% |

**Session Progress Indicators:**
- 🔴 = Not Started
- 🟡 = In Progress
- 🟢 = Completed

---

## 📝 Remarks & Notes

### Known Risk Areas:
- AutoSlider extraction requires careful testing of all 4 slider instances
- TeamCard integration must preserve gold badge logic only for specific members
- Modal refactor is highest risk (4-6 hours) - recommend done last

### Recommended Workflow:
1. Start with Phase 0 setup
2. Execute Phase 1 tasks first (critical bugs)
3. Sink time into Phase 2.3 comprehensively → likely tools-share
4. Do TeamCard (2.1) with sizing/shadows override → simple
5. Leave Phase 3 until end (lower priority)

### Team Communication:
- Share this todo list with developers
- Schedule weekly sync for Phase 1 updates
- Block dedicated time for Phase 2.3 (single-day iteration)

---

**Created:** 2026-10-22 by Claude Code Pricing
**Next Review:** After Phase 1 completion
---

## 🔄 ADJUSTMENT FROM INFRASTRUCTURE ANALYSIS

**Date:** 2026-10-22

**Updated Task 1.1** (original was incorrect because nosotros doesn't use WordPress):

### Task 1.1: Add Edge Caching for Performance (No WordPress Required)
**Est:** 10 minutes | **File:** `src/pages/nosotros/index.astro`

**✅ CORRECTED Understanding:**
- `/nosotros` does NOT use WordPress GraphQL
- Uses only local static content from `src/lib/team.ts`
- Should KEEP `prerender = true` (it's purely static)
- Add Cache-Control headers for performance only (zero cost, backwards compatible)

- [ ] Verify page does NOT use `wpQuery` (confirmed: line 14 imports but never calls)
- [ ] Verify all data is local (teamData, boardData arrays, image paths)
- [ ] Add performance cache headers:
  ```astro
  export const prerender = true;  // ← KEEP this (static content)

  // ✅ Add for performance (backward compatible, no CMS sync needed):
  Astro.response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  ```
- [ ] Test with curl to verify Cache-Control header present
- [ ] Verify no breaking changes
- [ ] Commit with message: `"perf: add edge caching to static nosotros page (no CMS sync needed)"`

**Why this is correct:**
1. ❌ No longer "CMS-based content violation" (it's static)
2. ✅ "Edge caching for static HTML" (performance optimization)
3. ✅ Zero impact on admin workflow (content still manual edit)
4. ✅ Cloudflare will edge-cache static response
5. ✅ Users get instant first-byte latency
6. ✅ No risk of stale CMS content (no CMS involved)

**Props结构的本质
- src/pages/opinion/index.astro (NOWP: ❌)
- src/pages/actividades/index.astro (NOWP: ❌)
- src/pages/noticias/index.astro (NOWP: ❌)
- src/pages/[...uri].astro (NOWP: ❌)

**Use Cases:✅**
- Backend fetches data from WP or local
- Frontend passes data to component as props
- Component has TypeScript interfaces
- Zero direct DOM manipulation (framework handles it)
- Testable in isolation

===

