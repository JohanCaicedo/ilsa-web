# AI Memory - ILSA WEB (Headless Astro)

## Nuevos Componentes

### `src/components/molecules/TeamCardNosotros.astro`
- **Nuevo** - Tarjeta de equipo usada en `/nosotros` (Dirección, Junta, Asamblea)
- **Liquid Glass**: Sí (`bg-white/40`, `border-white/60`, `backdrop-blur-md`, `backdrop-blur-xl`, `shadow-lg`)
- Cumple con reflow de pestañas y hover interactivo
- Estado `highlight` con insignia dorada y anillo de enfoque

## Refactorizaciones

### `Navbar.astro` — **Menú Hamburguesa Móvil (Sesión actual)**
- **Rediseño completo** del overlay móvil: de dropdown absoluto a **full-screen Liquid Glass** (`fixed inset-0`, `bg-white/10`, `backdrop-blur-3xl`, `border-white/20`)
- **Navegación Acordeón nativa** (`<details>/<summary>`) para dropdowns "Nosotros", "Opinión", "Publicaciones" — colapsados por defecto, animación CSS nativa, cero JS extra
- **Accesibilidad AA**: `role="dialog"`, `aria-modal="true"`, `aria-label`, `aria-expanded` dinámico en toggle, foco visible (`focus:ring`), botón cerrar (X) dedicado
- **Cierre por backdrop**: click fuera del panel cierra menú; delegación de eventos única compatible con **Astro View Transitions** (flag `hasNavbarListenerRegistered`)
- **CTAs anclados** al footer del overlay con touch targets ≥ 48px (`py-4 text-lg`)
- **Animación escalonada** (stagger) via `style={--delay}` en items de navegación
- **Easter Egg** long-press en logo preservado intacto

### `WorkTeamTabs.astro`
- **CSS Grid stacking** (`grid-area: panel`) reemplazando `absolute/inset-0` para eliminar "salto" entre pestañas
- **Pestaña "Administración" activa por defecto** (índice buscado dinámicamente)
- **Estados hover en tab activo**: mantiene azul base, `#314b79` al hover con `scale(1.02)` y sombra elevada
- Icono "acompañamiento" restaurado con `vertical-align: -0.125em`
- Instancias únicas con `instanceId` + atributos `aria` consistentes
- **Tipos TS**: `style` object, `<article>` wrapper, `HTMLElement` tipado en JS para `hidden`/`offsetHeight`/`focus`

### `TeamModal.astro`
- **Forzar recarga de imagen**: limpieza de `src` + fallback `setTimeout` para cache busted
- `loading="eager"` en `<img>` del modal
- `@ts-nocheck` para compatibilidad de build

### `SmartImage.astro`
- Añadido `object-cover` en branch de fallback `<img>` para consistencia con `astro:assets/Image`

### `tsconfig.json`
- Removido `baseUrl` deprecado (TS 5.6+), migrado a `paths` puro

## Decisiones de Diseño

| Decisión | Justificación |
|---|---|
| CSS Grid stacking sobre absolute positioning | Elimina reflow al cambiar pestañas; contenedor se adapta al panel activo |
| Clase `.is-active` + `<style>` nativo | Sobrescribe `hover:` de Tailwind que el JS no puede manipular en runtime |
| Color `#314b79` al hover de tab activo | Mantiene contraste azul oscuro; evita "flash" a blanco |
| `SmartImage` en tarjetas | `object-cover` garantizado + fade-in + lazy loading |
| **Acordeón nativo `<details>` en menú móvil** | HTML semántico, accesible por defecto, animable con CSS, 0 bytes JS |
| **Full-screen overlay vs dropdown** | En móvil, el dropdown solapado bajo la barra genera confusión de z-index y límites de toque; el overlay full-screen es patrón nativo iOS/Android esperado |
| **Liquid Glass `bg-white/10` + `backdrop-blur-3xl`** | Consistencia con sistema de diseño: refracción real, no opacidad plana |

## Componentes Relacionados

- `SmartImage.astro` - Usado en TeamCardNosotros
- `TeamModal.astro` - Modal de perfil individual
- `WorkTeamTabs.astro` - Tabs del equipo de trabajo
- `Layout.astro` - Layout padre de `/nosotros`

## Next Steps (Pendientes Críticos)

1. **[ALTA]** Verificar `tsconfig.json` error TS5102 `baseUrl` en CI/CD antes del merge
2. **[MEDIA]** Migrar `TeamCard.astro` al patrón `SmartImage` + `<article>` (actual está inconsist. con Nosotros)
3. **[BAJA]** Unificar `TeamCard` y `TeamCardNosotros` (duplican lógica, diferencia es variante highlight)
4. **[BAJA]** Extraer `<style>` de WorkTeamTabs a `global.css` para consistencia de scope
5. **[MEDIA]** Validar contraste WCAG AA del menú móvil (`text-slate-900` sobre `bg-white/10` + blur) en dispositivos reales
6. **[BAJA]** Añadir animación stagger real (JS `requestAnimationFrame` al abrir) si el CSS `animate-in` no tiene soporte completo en Tailwind v4 config actual
