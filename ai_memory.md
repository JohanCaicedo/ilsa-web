# AI Memory & Context Tracking

## Inventario de Componentes (Nuevos)

### Modular Gallery System (Nuevo)
- **`src/lib/galleries.ts`**: 🆕 Base de datos de imágenes (Categorías -> Álbumes -> Fotos).
- **`GalleryFolderCard.astro`**: 🆕 Molécula "Carpeta" 2x2. Estética Liquid Glass. Almacena data en `<script type="application/json">` para despliegue perezoso.
- **`AlbumViewerModal.astro`**: 🆕 Organismo tipo `<dialog>`. Se inyectan imágenes dinámicamente vía vanilla JS para evitar saturación del DOM inicial en páginas con muchas galerías.
- **`GalleryLightbox.astro`** (Modificado): Integrado soporte para invocación global delegada vía `CustomEvent('open-lightbox')`. Adicionado botón dedicado para forzar "Descargar" evadiendo limitantes CORS/href simple vía fetch.
- **`GallerySection.astro`**: 🆕 Contenedor inyectable. Recibe `categoryId` y mapea asíncronamente las folders de `galleries.ts`.

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

### Session 27/04/2026 - Integración de PayPal para Donaciones
- **`donaciones.astro`**:
    - **Plataforma de Pago**: Se reemplazó el widget de Ko-fi por una integración directa con PayPal (paypal.me).
    - **Tono Institucional**: Se reescribió el copy de la página para eliminar anglicismos ("incidencia política" en vez de "advocacy") y lenguajes emocionales/de caridad, adoptando un tono riguroso, académico e institucional acorde a la labor de ILSA.
    - **Micro-interacciones UI**: Se añadieron animaciones de entrada (`fade-in-up`), levitación de contenedores (`float`), efecto de brillo (shimmer) continuo en el botón de pago y micro-transiciones suaves en tarjetas e inputs para potenciar la estética "Liquid Glass".
- **`src/components/molecules/PayPalDonation.tsx` (Nueva Isla React)**:
    - **Robustez de UI**: Se extrajo toda la lógica de selección de montos y el redireccionamiento a PayPal en un componente de React puro. Montado mediante `client:load` para garantizar la ejecución perfecta del código del lado del cliente, resolviendo problemas de hidratación cruzada con Astro View Transitions.

### Session 13/04/2026 - Sistema Modular de Galerías y Automatización Multimedia
- **Arquitectura de Galerías**:
    - Se construyó e implementó el **Sistema Modular de Galerías** para centralizar la gestión de lotes fotográficos.
    - Diseño ajustado al patrón **Liquid Glass** de ILSA, desde las previsualizaciones 2x2 (`GalleryFolderCard.astro`), pasando por el modal de listado como "Tarjeta Flotante" inmersiva con fuerte blur y bordes de cristal (`AlbumViewerModal.astro`), hasta el Lightbox nativo a nivel `<dialog>`.
    - **SEO y Performance**: Para que la página indexe de inmediato sin importar si la galería tiene 100 fotografías, se implementaron inyecciones diferidas de JS y las colecciones se transmiten codificadas en `<script type="application/json">`.
    - **ViewTransitions Leak Fix**: Se solucionó un bug crítico en `GalleryLightbox.astro` (Astro MPA) aislando su `window.addEventListener('open-lightbox')` con `_boundOpenLightbox` y purgado explícito en su `disconnectedCallback`, previniendo que clicks generen ejecuciones múltiples que colapsen el modal nativo en navegaciones cruzadas.
- **Automatización de Ingesta Node.js**:
    - Se escribieron e integraron scripts auxiliares (como `rename_galleries.cjs` / `process_mercado.cjs`) capaces de procesar masivamente volúmenes enteros desde el sistema de archivos del usuario.
    - El script es inteligente: acorta nombres enormes de subdirectorios a slugs eficientes (e.g. `visita-chita-julio`, `mercado-campesino-sep-2005`), renombra y numera la totalidad del material fotográfico interno y mapea estructuradamente al archivo padre `src/lib/galleries.ts` para autocompletar la BD.
- **Refinamientos Visuales y Consistencia**:
    - Limpieza de títulos genéricos. La ruta `/multimedia` fue estilizada, reteniendo de forma minimalista toda la carga visual en el contenido de evento con el gran heading "Galería Fotográfica".
    - El componente **Galería Fotográfica** fue reposicionado a primer nivel, de inmediato después de los vídeos principales de YouTube (Hero Section).
    - **Universal Lightbox**: Componentes de imágenes asilados y codificados de forma rígida (Carruseles del *Día de la Jueza*, *Pashukanis* y el collage mampostería de *Mujeres Buscadoras*) ahora utilizan arrays precompilados de Astro y lanzan payloads despachados hacia evento `open-lightbox`, integrándose armónicamente al visor unificado interactivo en vez de permanecer sin reacción a clics.

### Session 30/03/2026 - Reestructuración de Organigrama y Ajustes Visuales
- **`src/pages/nosotros/index.astro`**:
    - **Reestructuración Visual**: Se consolidó el diseño estricto de las tarjetas interactivas de Dirección Ejecutiva y Junta Directiva empleando CSS Grid clásico (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-5`) para garantizar identidad absoluta de tamaño (anchura y altura de 450px) para todas sin importar en qué fila estén.
    - **UI/UX Refinada**: Eliminación de efectos "accordion" horizontales indeseados. Ahora emplean un zoom sutil (`scale-110`) y aparición en overlay desde abajo.
    - **Centrado Absoluto**: Se aplicó flexbox vertical (`items-center justify-center`) en las tarjetas de "Equipo de Trabajo" asegurando el centrado perfecto de cada título y descripción.
    - **Gesto de Autoridad**: Se inyectó una distinción elegante a la tarjeta del Director Ejecutivo (insignia flotante Liquid Glass, ring iluminado y gradiente índigo profundo) sin alterar su tamaño de grilla.
    - **Rutas**: Actualización del botón de llamada a la acción hacia `/nosotros/manual-marca`.
- **`src/lib/team.ts`**:
    - **Actualización de Data**: Se actualizó rigurosamente el rol, `bio` y `fullDescription` de Freddy Ordóñez para evidenciar su rol institucional como Director Ejecutivo desde agosto de 2025.
- **`src/pages/nosotros/manual-marca.astro`**:
    - **Move Component**: Se reubicó exitosamente el archivo a `src/pages/nosotros/manual-marca.astro`.
    - **Vite SSR Fix**: Se ajustaron las declaraciones relativas (`../../`) de Layouts y Components para reparar la compilación del renderizador.


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
-   **`Deployment Fixes`**:
    -   **OOM Fix**: Implementada optimización condicional de imágenes (`shouldOptimize`). Solo se procesan imágenes de eventos `year >= 2025` durante el build. Las anteriores usan `<img>` nativo para ahorrar RAM en Cloudflare.
    -   **Long URL Fix**: Creado `public/_routes.json` manual para forzar el uso de wildcards (`/actividades/*`) y evitar la generación automática de reglas detalladas que exceden el límite de 100 caracteres de Cloudflare. Se verificó que este archivo tiene precedencia sobre el adaptador.

### Session 10/03/2026 - AuthorCard Liquid Glass Rewrite
- **`AuthorCard.astro`**:
    - **Full Rewrite**: Componente completamente reescrito. Abandonado el esquema de gradiente radial sólido a favor de la estética **Liquid Glass** del proyecto.
    - **Estructura de Capas**: (1) Imagen de fondo a sangre completa con `SmartImage` y scale-on-hover, (2) Overlay cinematográfico `from-black/90 via-black/50`, (3) Refracción Frosty en borde superior con `from-white/15`, (4) Contenido editorial sobre glass.
    - **Panel Frosty para Excerpt**: Nuevo campo `excerpt` renderizado dentro de un panel de cristal esmerilado (`bg-white/8 backdrop-blur-2xl border-white/15`) que refuerza la identidad Liquid Glass.
    - **Badge de Autor**: Pill con `bg-white/10 backdrop-blur-xl border-white/20` en vez de texto plano.
    - **Animaciones**: Cubic-bezier personalizado para sombras y transforms. Indicador "Leer →" revelado desde la izquierda on-hover. Brillo inferior como línea de acento (`via-white/30`).
    - **Dimensiones**: Cambió de `320x320` a `w-full max-w-[360px] h-[460px]` para aprovechar mejor la grilla responsiva.
- **`ArticlePost.astro` (Nuevos Estilos)**:
    - **Soporte PDF Premium**: Se implementó una transformación total para el bloque de WordPress `.wp-block-file`. Ahora, cuando el usuario sube un PDF desde Gutenberg, se renderiza automáticamente como una **Resource Card** con estética Liquid Glass.
    - **Visualizador Interactivo**: Se integró un script vanilla JS que detecta enlaces PDF en bloques de archivos. Inyecta dinámicamente un botón "Ver PDF" que despliega un visor integrado (`iframe`) con estilos de cristal y animaciones suaves. Incluye lógica de lazy-loading y fallback para móviles.
    - **Diseño**: Fondo `rgba(255,255,255,0.4)` con `backdrop-blur(12px)`, sombras tintadas, icono de documento dinámico mediante máscara SVG de Heroicons y botón de descarga coherente con la paleta de ILSA.
    - **Alineación de Texto**: Se corrigió un problema donde las alineaciones de WordPress (Gutenberg y Clásico) no se respetaban. Se añadieron reglas `!important` para `.has-text-align-*` y estilos inline de alineación.
    - **Tipografía y Prosa**: Se restauraron estilos para `ul/ol/li`, `table`, `hr` y elementos `code` que eran eliminados por el reset de Tailwind CSS.

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
- `feat(ui): redesign AuthorCard with premium Liquid Glass aesthetic and excerpt support`
- `refactor(ui): apply Vercel web-design-guidelines to AuthorCard transitions and spatial composition`

---

# 📚 Archivo de Contexto Técnico (Consolidado)



### Session 27/01/2026 - Critical Bug Fixes & UI Enhancements
- **Slider Fixes**:
  - **`RelatedSlider.astro`**: Scoped selector to `[data-slider-type="related"]` to resolve conflict with ColumnistSlider.
  - **`ColumnistSlider.astro`**: Refactored to use unique `data-columnist-*` attributes, isolating logic and fixing arrow navigation issues.
- **Pagination**:
  - **`AuthorPage.astro`**: Refactored to use the shared `Pagination.astro` component, eliminating custom/legacy logic.
- **UI & Navigation**:
  - **`nosotros/index.astro`**:
    - **Team Modal**: Implemented `TeamModal.astro` (using native `<dialog>`) and refactored `DirectorCard` to trigger it.
    - **Deep Linking**: Added IDs to sections for direct navigation.
    - **Styling**: Updated styling to match brand guidelines (`--ilsa-blue`).
  - **`Navbar.astro`**: Updated "Nosotros" dropdown with deep links (Historia, Misión, etc.).

- **Data/Logic**:
  - **`collections.ts`**: Updated slugs for 'coediciones' and 'en-clave-de-sur' (added `-publicaciones` suffix) to fix "Empty Collections" bug.
  - **`src/lib/team.ts`**: Centralized team data structure.

### Inventario de Componentes (Nuevos/Modificados)
- **`TeamModal.astro`** (Nuevo):
  - **Función**: Modal nativo (`<dialog>`) para mostrar detalles de miembros del equipo.
  - **Liquid Glass**: Cumple 8/10. Usa `backdrop-blur-xl` y `bg-white/90` para el contenedor.
  - **Interacción**: Trigger via `DirectorCard` + `data-team-id`. Cierre con click fuera o botón ESC.
- **`DirectorCard.astro`** (Modificado):
  - **Refactor**: Acepta `id` prop para binding con el modal. UI mejorada con bordes más visibles (`opacity-30`).

### Decisiones de Diseño
- **Native Dialogs**: Se optó por `<dialog>` nativo en lugar de librerías externas para `TeamModal` para maximizar rendimiento y accesibilidad sin hidratación pesada.
- **Isolation by Attributes**: Para resolver conflictos entre sliders y paginación, se migró de selectores genéricos (`data-slider-*`) a específicos (`data-columnist-*`, `data-grid-*`), blindando los componentes contra interferencias globales.
- **Type Safety**: Se forzó `type="button"` en todos los elementos interactivos (`SliderArrow`, `Pagination`) para prevenir comportamientos erráticos de formulario en navegadores móviles.

### Pendientes Críticos (Next Steps)
1.  **🚀 DEPLOYMENT**: Es CRÍTICO desplegar para que el fix de `collections.ts` (slugs) surta efecto y las páginas vacías se llenen.
2.  **Monitorización**: Verificar en producción si el atributo `type="button"` resolvió definitivamente el "reset" de la paginación.
3.  **Mobile Performance**: La optimización de carga en `AuthorPage` (Task #9) fue pospuesta y debe ser retomada.

### Session 30/03/2026 - Restructuración Organigrama "Nosotros"
- **`team.ts`**:
    - **Refactor**: Se hicieron opcionales las props `bio` y `fullDescription` en `TeamMember`.
    - **New**: Se animó la creación de `assemblyData` con 14 asambleístas y se vincularon fotos de perfil faltantes.
- **`nosotros/index.astro`**:
    - **Layout**: Reescritura completa y reordenamiento de los equipos en formato Organigrama descendente (Niveles 1 a 4). Incorporación de componentes compactos en cristal para Asambleístas (Avatar + Nombre colegiado) y módulos visuales expandidos para grupos como "Investigadores" y "Comunicaciones".

