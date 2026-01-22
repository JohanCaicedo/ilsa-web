# ILSA Web Project Technical Documentation

## 1. Overview & Philosophy
This project is a refactor and modernization of the web portal for the **Instituto Latinoamericano para una Sociedad y un Derecho Alternativos (ILSA)**.

**Design Philosophy:** "Liquid Glass & Clean Typography".
The design aims to evoke transparency and institutional modernity, avoiding generic corporate aesthetics. It is inspired by "Apple-style" interfaces through intensive use of:
-   **Blur/Glassmorphism**: Translucent overlays (`backdrop-blur`) to maintain visual context.
-   **Clean Typography**: Use of `Inter` with clear hierarchy and adjusted tracking.
-   **Subtle Interactions**: Micro-animations on buttons and links, soft shadows that react on hover.

## 2. Technology Stack
-   **Core Framework**: [Astro 5.0](https://astro.build/) (Hybrid Rendering: Static by default + Interactive Islands).
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (Utility engine, JIT compilation).
-   **Typography**: `Inter` (Google Fonts) imported globally.
-   **Iconography**: `Lucide React` (SVG icons rendered as components).
-   **Language**: TypeScript (Strict typing enabled).

## 3. Project Architecture

### 3.1 Directory Structure
The project follows a fractal structure based on **Atomic Design** for components and file-based routing for pages.

### 3.2 Atomic Design Methodology (Implementation)
-   **Atoms**: Pure components receiving simple props.
    -   Example: `NavButton.astro` handles visual variants (primary/secondary) but no business logic.
-   **Organisms**: Orchestrator components defining a section's structure.
    -   Example: `Navbar.astro` contains navigation data and assembles `NavDropdown` and `NavButton`.
-   **Layouts**: Define the application shell (`html`, `head`, global scripts).

## 4. Design System

### 4.1 Color Tokens
Defined in `:root` (`src/styles/global.css`) and extended in Tailwind.

| Token | Value | Usage |
| :--- | :--- | :--- |
| `--ilsa-blue` | `#4E7CCE` | Primary brand color (Buttons, accents). |
| `--ilsa-blue-dark` | `#375a9e` | Dark hover/active state. |
| `--ilsa-text-dark` | `#111827` | Main text (Headings, dark body). |
| `--ilsa-bg-light` | `#f3f4f6` | Secondary/neutral backgrounds. |

### 4.2 "Liquid Glass" Effect
The visual signature of the site. Applied to floating containers (Cards, Navbar, Headers).
-   **Background**: `bg-white/70` (White at 70% opacity).
-   **Blur**: `backdrop-blur-xl` or `backdrop-blur-2xl`.
-   **Border**: `border border-white/60` (Subtle semi-transparent border).
-   **Shadow**: `shadow-lg` or specific `shadow-[0_8px_32px_0_rgba(74,125,191,0.1)]` (Diffuse bluish glow).

### 4.3 Typography
-   **Family**: Inter (`sans-serif`).
-   **Weights**:
    -   `font-black` (900): Impact titles (H1).
    -   `font-bold` (700): Section headers and active navigation.
    -   `font-medium` (500): UI text and metadata.
    -   `font-light` (300): Fine details or subtitles.

## 5. Data Strategy & Routing

### 5.1 Static Pages
-   Location: `/src/pages/*.astro`
-   Examples: `/index`, `/nosotros/junta-directiva`.
-   Rendering: Build-time generation.

### 5.2 Dynamic Pages (Collections)
The site uses `getStaticPaths()` to generate routes from structured data.

**Use Case: Opinion (`/opinion/[slug]`)**
1.  **Data Source**: `src/lib/authors.ts` (`authorsConfig` object).
2.  **Generation**: Iterates keys (`freddy-ordonez-gomez`, etc.) to create routes.
3.  **Rendering**: The `[slug].astro` template receives author data and renders the profile.

**Use Case: Publications (`/publicaciones/[category]`)**
-   Predefined routes via category array (`archivo-historico`, `coediciones`, etc.).
-   Acts as a hub to list items (future API integration).

## 6. Maintenance Guides

### Adding a New Author
1.  Edit `src/lib/authors.ts`.
2.  Add a new entry with a unique key (kebab-case).
3.  Complete: `name`, `profileImage` (URL), `fullBio` (HTML/Text).
4.  Edit `src/components/organisms/Navbar.astro`.
5.  Add entry to the "Opinión" `items` array matching EXACTLY the key used in step 2.

### Modifying the Menu
-   The menu is defined in the `navStructure` object within `src/components/organisms/Navbar.astro`.
-   Supports two types: `"link"` (direct link) and `"dropdown"` (dropdown menu).
-   For dropdown items, if `href` is provided, the parent title is clickable.

## 7. Infrastructure & Architecture

This section describes how the "Ilsa Web" system is deployed and connected.

### 7.1 System Overview
The system uses a **Headless CMS** architecture, decoupling the frontend from content management backend.

-   **Frontend (The Web)**: Built with **Astro** and deployed on **Cloudflare Pages**. Responsible for presentation, fast rendering, and user experience.
-   **Backend (The Data)**: **WordPress** (hosted on traditional hosting). Acts solely as content repository and management engine (Headless).
-   **The Bridge (API)**: Communication between both worlds is handled via **GraphQL**.

### 7.2 Data Flow Diagram
```mermaid
graph LR
    User[End User] -->|HTTPS| CF[Cloudflare Pages (Frontend)]
    CF -->|Build Time (SSG)| WP[WordPress API (Backend)]
    WP -->|JSON/GraphQL| CF
    Editor[Content Editor] -->|WP Admin| WP
```

### 7.3 Infrastructure Components

1.  **Frontend (Cloudflare Pages)**
    *   **Repository**: Connected to GitHub (`main` branch).
    *   **Build Process**: On every `git push`, Cloudflare detects the change, runs `npm run build`, and generates static files.
    *   **Environment Variables**: Requires `WORDPRESS_API_URL` configured in Cloudflare dashboard to fetch data during build.

2.  **Backend (WordPress Host)**
    *   Must have **WPGraphQL** enabled to expose data.
    *   Does not serve direct web traffic to end users (frontend), only API responses to Cloudflare build server.

3.  **DNS & Domains**
    *   **Web (`ilsa.org.co`)**: Points to **Cloudflare Pages** via `CNAME` or `A` records. Ensures the web is served from Cloudflare's global network (CDN).
    *   **Email**: Managed externally (e.g., Google Workspace). **MX** records in DNS provider must remain intact and point to Google, *regardless* of web record pointing to Cloudflare.
    *   **Backend (`lab.ilsa.org.co` or similar)**: Specific subdomain where WordPress lives for editors to access.

---

## 8. License & Proprietary Rights

**© 2026 Instituto Latinoamericano para una Sociedad y un Derecho Alternativos (ILSA). All Rights Reserved.**

### Proprietary Software
This codebase is **Proprietary Software** owned by ILSA.

*   **Source Available**: The source code is publicly viewable for transparency, educational, and reference purposes.
*   **No Redistribution**: You are **NOT** allowed to copy, distribute, modify, or use this code as a template for other commercial or non-commercial projects without explicit written permission from ILSA.
*   **Private Use**: Cloning this repository for the sole purpose of contributing to the official ILSA project (as an authorized collaborator) is permitted.

For any licensing inquiries or usage permissions, please contact ILSA administration.
