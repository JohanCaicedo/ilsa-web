# ILSA WEB - Design Documentation

## Brand Identity & Visual Strategy
The ILSA WEB interface is built on the **Liquid Glass** aesthetic—a philosophy of light refraction, ethereal depth, and tactile transparency. Every component must feel like it is layered over a living surface.

## Color Palette
All colors must be referenced using CSS variables to maintain system-wide consistency.

| Token | Usage | CSS Variable |
|-------|-------|--------------|
| Primary | Main buttons, links, accents | `var(--ilsa-blue)` |
| Dark Accents | Text, headers, primary contrast | `var(--ilsa-blue-dark)` |
| Surface | Backgrounds with glass effect | `rgba(255, 255, 255, 0.4)` |
| Borders | Subtle dividers and glass edges | `rgba(255, 255, 255, 0.6)` |
| Neutral | Secondary text, metadata | `var(--ilsa-gray-300)` |

## Typography
- **Headings**: Bold, modern sans-serif with tight letter spacing (`tracking-tight`).
- **Body**: Highly legible serif or clean sans-serif with generous line spacing.
- **Labels**: Small-scale, uppercase tracking for metadata and secondary labels.

## Liquid Glass Rules
When implementing the "Liquid Glass" effect, the following rules are mandatory:
1. **Refraction**: Use `backdrop-blur-md` or higher for translucent surfaces.
2. **Elevation**: Apply `border-white/20` or `border-white/60` to simulate the edge of a glass pane.
3. **Shadows**: Use soft, large shadows (e.g., `shadow-xl`) to give elements height.
4. **Transitions**: Smooth, high-inertia transitions (duration: 300ms–700ms, ease: cubic-bezier) for hover and click states.
5. **Transparency**: Never use solid white or gray for backgrounds; always use `bg-white/10` to `bg-white/40`.

## Component Integrity
- **Icons**: Only use the `Lucide` library for icons.
- **Images**: All images must be wrapped in `SmartImage.astro` for performance and consistent behavior.
- **Utils**: Use the `cn` utility for all tailwind class merges to avoid style collisions.
