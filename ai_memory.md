# AI Memory - ILSA WEB (Headless Astro)

## Nuevos Componentes

### `src/components/molecules/TeamCardNosotros.astro`
- **Nuevo** - Tarjeta de equipo usada en `/nosotros` (Dirección, Junta, Asamblea)
- **Liquid Glass**: Sí (`bg-white/40`, `border-white/60`, `backdrop-blur-md`, `backdrop-blur-xl`, `shadow-lg`)
- Cumple con reflow de pestañas y hover interactivo
- Estado `highlight` con insignia dorada y anillo de enfoque

## Refactorizaciones

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
