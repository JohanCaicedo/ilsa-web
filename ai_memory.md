# AI Memory & Context Tracking

## Inventario de Componentes (Nuevos)

### Navigation UX (Nuevo)
- **`PageLoader.astro`**: 🆕 **Full Screen Transition Mask**.
    - **Función**: Intercepta eventos de Astro View Transitions (`before-preparation`) para mostrar un overlay inmediato al hacer clic en un enlace.
    - **UX Goal**: Oculta el estado "congelado" del navegador mientras se obtiene datos JSON o HTML del servidor.
    - **Estética**: Fondo `bg-white/90` con `backdrop-blur-xl` y spinner central con borde `var(--ilsa-blue)`.
    - **Integración**: Global en `Layout.astro`.

### Easter Egg (Glass Breaker) - ⚡ Updated 26/01/2026
- **`GlassBreakerEngine.tsx`**: Motor de juego tipo "Breakout" renderizado en Canvas sobre la UI.
    - **Liquid Glass Compliance**: 9/10. Ahora incluye botón de salida móvil con glassmorphism (`backdrop-blur-xl` + `bg-red-500/80`). Paneles de score y vidas mantienen estética coherente.
    - **Características**: 
        - ✨ **Visual Enhancements (26/01)**:
            - Bloques dorados con glow (`#FFD600` + shadow `#FFB800`) para máximo contraste.
            - Logo ILSA con rotación dinámica basada en velocidad (`rotation += dx * 0.1`).
        - 🎮 **Game Mechanics (26/01)**:
            - Sistema de durabilidad: `<p>` (2 HP), `<h2-h4>` (3 HP), `<nav/header/footer>` (5 HP).
            - Feedback visual: opacidad degrada con daño (`opacity = health / maxHealth`).
            - Puntaje persistente en `localStorage` (`glass_total_score`).
            - Fix crítico: condición de victoria movida después del procesamiento de colisiones.
        - 🎵 **Audio System (26/01)**:
            - Música MIDI cargada desde `/assets/music.json` (247KB).
            - Síntesis square wave (GBA-style) con Web Audio API.
            - Conversión MIDI→frecuencia: `440 * 2^((midi-69)/12)`.
            - Loop automático con cálculo dinámico de duración.
        - 📱 **Mobile Support (26/01)**:
            - Controles touch completos: `touchmove` para paleta, `touchstart` para lanzar/acelerar.
            - Botón de salida visible en esquina superior derecha.
            - Prevención de scroll (`{ passive: false }`).
        - 🌐 **Content Expansion (26/01)**:
            - 33 rutas en rotación (vs 9 originales): opinión (7), publicaciones (8), lab (1).
- **`EasterEggManager.tsx`**: Gestor de estado para la activación del Easter Egg.
    - **Lógica**: Escucha el código Konami (case-insensitive).
    - **Hidratación**: `client:load` para asegurar disponibilidad inmediata.
    - **Persistencia**: Usa `localStorage` para reiniciar el juego automáticamente tras la navegación.

### Assets
- **`public/assets/music.json`**: 🆕 **MIDI JSON Database** (26/01/2026).
    - Formato: Tone.js parsed MIDI (header + tracks + notes).
    - Track principal: "Piano" con ~2500 notas.
    - Tamaño: 247KB, 8994 líneas.

## Refactorizaciones y Cambios

### Session 26/01/2026 - Easter Egg Overhaul
- **`GlassBreakerEngine.tsx`**:
    - **Visual**: Cambio de bloques azules a dorados. Implementación de rotación de pelota con transformaciones Canvas.
    - **Mechanics**: 
        - Sistema de HP por tipo de elemento HTML.
        - Puntaje persistente usando `totalScoreRef` + `localStorage`.
        - Fix timing en condición de victoria (después de colisiones).
    - **Audio**: Reemplazo completo del sistema de melodía hardcoded por carga dinámica de MIDI JSON.
    - **Mobile**: Agregados handlers `touchmove` y `touchstart`. Botón de salida con glassmorphism.
    - **Content**: Expansión de `SITE_ROUTES` a 33 rutas.

- **`Layout.astro`**: (Sin cambios esta sesión).

### Session 26/01/2026 - Performance & Mobile UX (Evening)
- **`usePerformance.ts`**: 🆕 Hook para detectar capacidades del dispositivo (CPU, RAM, UserAgent).
    - **Niveles**: 'low' (Mobile/Weak), 'medium', 'high'.
- **`Liquid3D.tsx`**: 
    - **Optimización**: Se desactiva completamente (retorna `null`) en tier 'low' para garantizar 60fps.
    - **Adaptive Quality**: Reduce resolución y samples en tier 'medium'.
- **`Navbar.astro`**: 
    - **Easter Egg Activation**: Implementado **Long Press (2s)** en el logo.
    - **Mobile UX**: Previene menú contextual y navegación accidental al mantener presionado.
    - **Easter Egg Activation**: Implementado **Long Press (2s)** en el logo.
    - **Mobile UX**: Previene menú contextual y navegación accidental al mantener presionado.
    - **Mobile UX**: Previene menú contextual y navegación accidental al mantener presionado.
    - **Feedback**: Vibración háptica (200ms) al activar.

### Session 26/01/2026 - Event Integration & Multimedia Expansion
-   **`Actividades Page`**:
    -   **Integration**: Conectado a WP Event Manager vía GraphQL.
    -   **UX**: Implementado filtrado por año (SSR) y paginación dinámica.
    -   **Design**: Hero Section con "Liquid Glass" y tarjetas centradas (`justify-center`).
-   **`Multimedia Page`**:
    -   **New**: Página `/multimedia` creada con estructura base y Hero Section consistente.
    -   **Nav**: Añadida al menú principal y al Easter Egg (`GlassBreakerEngine` routes).
-   **`Navbar.astro`**:
    -   **Refactor**: Simplificación de estilos hover. Se eliminó animación compleja de texto.
    -   **Interaction**: Nuevo efecto estándar: `scale-110` + cambio de color a Azul ILSA.
    -   **Fix**: Eliminado `overflow-hidden` en Dropdowns para evitar cortes de texto (ej: "Multimedia").


### Session 26/01/2026 - Interactive Components Fixes & Robustness
- **`NavDropdown.astro`**: 
    - **Perf**: Se desactivó `Liquid3D` (`use3D={false}`) para evitar colapso de contextos WebGL y "cajas negras" en menús.
- **`SimpleAccordion.astro`**: 
    - **Refactor**: Reescritura total del script. Se eliminó `cloneNode` (frágil) y se implementó **Event Delegation** en `document` para soportar View Transitions.
- **`ColumnistSlider.astro`**: 
    - **UX/Fix**: Corrección de `z-index` (10) en flechas de navegación.
    - **Logic**: Mejora en la lógica de "drag vs click" y manejo de eventos `stopPropagation`.
- **`Pagination.astro`**: 
    - **Feature**: Soporte para `postsPerPage` dinámico vía props y data-attributes.

### Session 26/01/2026 - Event Integration & Multimedia Expansion
-   **`Actividades Page`**:
    -   **Integration**: Conectado a WP Event Manager vía GraphQL.
    -   **UX**: Implementado filtrado por año (SSR) y paginación dinámica.
    -   **Design**: Hero Section con "Liquid Glass" y tarjetas centradas (`justify-center`).
-   **`Multimedia Page`**:
    -   **New**: Página `/multimedia` creada con estructura base y Hero Section consistente.
    -   **Nav**: Añadida al menú principal y al Easter Egg (`GlassBreakerEngine` routes).
-   **`Navbar.astro`**:
    -   **Refactor**: Simplificación de estilos hover. Se eliminó animación compleja de texto.
    -   **Interaction**: Nuevo efecto estándar: `scale-110` + cambio de color a Azul ILSA.
    -   **Fix**: Eliminado `overflow-hidden` en Dropdowns para evitar cortes de texto (ej: "Multimedia").

-   **`Routing Fix`**:
    -   **Deleted**: `src/pages/publicaciones/[collection].astro` eliminado para resolver conflicto de rutas en el build. Ahora todas las colecciones usan archivos explícitos.

## Next Steps (Pendientes Críticos)

### Prioridad Alta (Próxima Sesión)
1. **Easter Egg - Power-Ups**: Implementar power-ups visuales (slow-motion, extra vida, multiball permanente).
2. **Easter Egg - Audio Feedback**: Sonidos únicos por tipo de bloque destruido (ej: piano para `<p>`, orquesta para headers).
3. **Easter Egg - High Scores**: Sistema de tabla de puntajes compartida (Firebase/Supabase).

### Mejoras UX
4. **Mobile Gestures**: Explorar gestos de activación alternativos al Konami Code (ej: triple-tap en logo).
5. **Performance Audit**: Monitorear impacto del escaneo DOM (`scanElements`) en páginas con +1000 elementos.

### Mantenimiento
### Mantenimiento & Contenido
6. **Limpieza Elementor**: Ejecutar plan de limpieza de contenido "sucio" de Elementor (Opción A: Revertir a bloques nativos).
7. **Eventos**: Integrar Custom Post Type `event_listing` de WP Event Manager en WPGraphQL.
8. **Image Optimization**: Verificar si páginas no-publicaciones necesitan actualización de queries para `mediaDetails`.
9. **CSS Transitions**: Ajustar duración de fade si 0.5s resulta lento para usuarios.

## Log de Commits
- `feat: implementation of 'Glass Breaker' easter egg with Zelda music`
- `chore: remove unused FluidGameEngine component`
- `feat(easter-egg): add durability system and persistent scoring`
- `feat(easter-egg): integrate MIDI music with GBA synthesis`
- `feat(easter-egg): add full mobile touch support`
- `feat(perf): implement adaptive 3d rendering and long-press easter egg activation`
- `fix(components): refactor interactive elements (dropdowns, accordion, slider, pagination)`

---

# 📚 Archivo de Contexto Técnico (Consolidado)


