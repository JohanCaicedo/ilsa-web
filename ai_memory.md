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

### Session 27/08/2026 - Incidente crítico: páginas CMS vacías en Cloudflare Pages (solucionado)

#### Síntoma observado en producción
- En `https://ilsa.org.co/noticias`, `https://ilsa.org.co/actividades`, `https://ilsa.org.co/multimedia` y las entradas de WordPress resueltas por `src/pages/[...uri].astro` se mostraban únicamente el `Navbar` y el fondo global. El contenido central no aparecía.
- El fallo era exclusivo del sitio desplegado en Cloudflare Pages: los HTML/las rutas funcionaban al ejecutar el proyecto localmente con el Worker de Pages y el build local sí generaba el contenido.
- El contenido no estaba simplemente oculto por CSS: en la respuesta pública afectada el `<main>` contenía el breadcrumb, pero faltaban las tarjetas, el artículo o las secciones de la página.
- Una página podía aparentar funcionar en una prueba aislada por el caché, pero el comportamiento no era fiable. El problema reaparecía al navegar, usar una URL nueva o pedir una ruta no cacheada.

#### Diagnóstico definitivo
1. El sitio usaba `output: "server"` y varias rutas con `export const prerender = false`; por ello Cloudflare enviaba cada visita al Worker SSR.
2. El Worker debía consultar `https://api.ilsa.org.co/graphql` en tiempo de petición para obtener WordPress. Durante el diagnóstico se observaron fallos reales del origen: respuestas `500` de WordPress (incluido el mensaje de error de conexión con la base de datos) y después `403` del WAF/Hostinger. Cuando esa consulta fallaba durante el render/streaming, el documento quedaba incompleto y solo sobrevivía la estructura ya emitida por el layout.
3. El intento previo de quitar `ClientRouter` de Astro y el ajuste de visibilidad de `WPLoader` eran correcciones defensivas válidas, pero no resolvían la dependencia crítica del Worker hacia WordPress.
4. El factor que impedía que los HTML prerenderizados se sirvieran de inmediato era `public/_routes.json`. Este archivo manual tiene precedencia sobre la generación automática de rutas de `@astrojs/cloudflare`. Conservaba `include: ["/*"]` y no excluía `/noticias`, `/multimedia` ni las URLs de artículos fechadas, por lo que Pages seguía enviando esas solicitudes al Worker SSR incluso cuando el build ya había creado sus archivos HTML.

#### Estrategia aplicada
- Se cambió el contenido que no necesita datos dinámicos por petición a generación estática durante el build. Así WordPress se consulta una vez por despliegue, no para cada visitante.
- Se mantuvo el Worker disponible para las rutas que sí requieran lógica dinámica; el cambio está limitado a las rutas publicadas como archivos estáticos en el CDN.
- Se modificó explícitamente el `_routes.json` manual para que Cloudflare Pages entregue esos archivos desde el CDN sin invocar SSR.
- Esta decisión sustituye de forma intencional el patrón ISR/SSR recomendado para CMS en estas rutas concretas: la disponibilidad de WordPress desde el Worker era menor que la necesidad de que la página siempre responda completa. La frescura del contenido queda ligada a cada deployment.

#### Cambios de código y configuración

1. **Entradas de WordPress — `src/pages/[...uri].astro`**
   - Se cambió de `prerender = false` a `prerender = true`.
   - Se añadió `getStaticPaths()` usando `fetchAllPosts()` de `src/lib/wp.ts`, respetando el acceso centralizado a WPGraphQL.
   - Cada `post.uri` se normaliza eliminando las barras inicial/final y se usa como parámetro de la ruta catch-all. Esto genera archivos como `dist/2026/08/guerra-hibrida-america-latina/index.html`.
   - El post ya obtenido durante el build se pasa mediante `Astro.props.post`; si se renderiza en desarrollo bajo demanda se conserva el fallback `fetchPostByURI(postUri)`.
   - Los artículos relacionados se inicializan como `[]` durante el build para no disparar una consulta GraphQL adicional por cada artículo. Esto evita cientos de llamadas y evita que una indisponibilidad parcial de WP aborte el deployment. El fallback dinámico a `getRelatedPosts()` se conserva para usos locales/on-demand.

2. **Listados de CMS — `src/pages/noticias/index.astro` y `src/pages/actividades/index.astro`**
   - Se cambiaron a `export const prerender = true`.
   - `dist/noticias/index.html` y `dist/actividades/index.html` se generan completos en cada build, incluyendo las tarjetas alimentadas por WordPress/Event Manager.
   - Consecuencia funcional: los filtros/paginación que dependieran exclusivamente de parámetros SSR no se recalculan desde WP para cada URL; la prioridad es entregar una página completa y estable desde el CDN.

3. **Multimedia — `src/pages/multimedia/index.astro`**
   - Se cambió a `export const prerender = true`.
   - Se eliminó la cabecera ISR que solo tenía sentido cuando la página se servía por SSR. La página usa contenido definido en el repositorio, por lo que no necesita pasar por el Worker.
   - El build confirmó la creación de `dist/multimedia/index.html` con contenido real.

4. **Imágenes remotas — `src/components/molecules/OpinionCard.astro`**
   - `shouldOptimize` se fijó en `false` para las imágenes remotas de WordPress.
   - Motivo: el optimizador intentaba descargar imágenes durante el build; un `403` temporal del origen podía hacer fallar todo el deployment. Las imágenes se sirven como URL remota en lugar de bloquear la publicación por una optimización no esencial.

5. **Routing de Cloudflare Pages — `public/_routes.json`**
   - Se añadieron las exclusiones:
     - `/noticias` y `/noticias/*`
     - `/actividades`
     - `/multimedia` y `/multimedia/*`
     - `/19*` y `/20*` para las entradas históricas de WordPress con URL basada en año (`/1985/...`, `/2026/...`, etc.).
   - En `_routes.json`, `include: ["/*"]` dirige por defecto al SSR; cada patrón de `exclude` se entrega como activo estático y no invoca la función. Estas exclusiones son imprescindibles mientras exista el archivo manual.
   - La configuración de `astro.config.mjs` no sustituye este archivo: `public/_routes.json` gana por precedencia. Cualquier ruta estática nueva que se agregue en el futuro debe revisarse también en este archivo.

6. **Correcciones defensivas previas**
   - `src/layouts/Layout.astro`: se retiró `ClientRouter` de `astro:transitions` (commit `9201a1e`) para eliminar una posible fuente de navegación parcial/hidratación inconsistente.
   - `src/components/molecules/WPLoader.astro`: el contenido real queda visible por defecto (`opacity: 1; visibility: visible`) y el skeleton se oculta con `display: none` (commit `84a1d6c`). Antes, una animación con `opacity: 0` podía dejar contenido invisible si se cancelaba/pausaba. Este cambio protege todas las páginas que usan el componente, aunque no era la causa raíz del SSR incompleto.

#### Validación realizada
- `npm run build` completó correctamente después de los cambios.
- El build generó los índices estáticos y **288 entradas de WordPress** desde `src/pages/[...uri].astro`.
- Se verificó la existencia y contenido de:
  - `dist/noticias/index.html`
  - `dist/actividades/index.html`
  - `dist/multimedia/index.html`
  - `dist/2026/08/guerra-hibrida-america-latina/index.html`
- Se inspeccionó el `dist/_routes.json` final y confirmó las exclusiones mencionadas.
- Tras el deployment de Cloudflare Pages se comprobaron las URLs públicas desde un navegador real:
  - `/noticias` mostró titular, tarjetas y textos.
  - `/2026/08/guerra-hibrida-america-latina/` mostró el artículo completo (más de 22.000 caracteres en el `<main>`).
  - `/multimedia` mostró el hero, galería y secciones audiovisuales completas.

#### Commits asociados (publicados en `main`)
- `9201a1e` — `fix: layout ClientRouter`
- `84a1d6c` — `fix: wploader`
- `1970042` — `fix: prerender wordpress content for cloudflare pages`
- `ed6868f` — `fix: serve prerendered wordpress pages from pages`
- `0494569` — `fix: prerender multimedia for cloudflare pages`

#### Regla operativa para el futuro
- Al publicar o editar contenido en WordPress, ejecutar un nuevo deployment de Cloudflare Pages (o hacer un commit vacío que lo dispare) para regenerar las páginas estáticas. El sitio ya no depende de WP durante la visita, pero el HTML se actualiza en el build.
- Para una ruta nueva con datos de WordPress, decidir primero si debe ser estática o realmente dinámica. Si se pre-renderiza, añadir una exclusión apropiada a `public/_routes.json`; de lo contrario Pages la seguirá mandando al Worker.
- Antes de volver a SSR/ISR, comprobar que WPGraphQL y el WAF permiten de manera estable las consultas desde Cloudflare Workers. Debe haber manejo explícito de errores/fallback para que una caída de WordPress no genere documentos parciales.
- No eliminar las exclusiones `/19*` y `/20*` sin reemplazarlas por reglas equivalentes: cubren todo el archivo histórico y futuro de entradas fechadas.

### Session 24/08/2026 - Creación de Página Especial "Territorialidades Campesinas"
- **`src/pages/noticias/especiales/territorialidades-campesinas.astro`**:
    - **New**: Página especial para el "Primer Encuentro de Territorialidades Campesinas de los Departamentos de Boyacá, Santander y Cundinamarca" (15 de mayo de 2026).
    - **Liquid Glass Compliance**: 10/10. Basada en `Layout.astro`, con acentos de cristal (`bg-white/50 backdrop-blur-3xl border border-white/60 shadow-2xl`), cita destacada del CONPES 4184 sobre panel esmerilado con icono `Quote`, tabla estilizada de territorialidades (ZRC, TECAM, APPA) y visualización limpia sin fotos superiores indeseadas.
    - **Fidelidad de Texto**: 100% fiel al documento original `CAMPESINADO Y SU LUCHA POR EL TERRITORIO.md` sin textos ni títulos inventados, limpiando artefactos de citación.
    - **Video de Instagram Reel**: Integración de iframe Reel (`DYa8Q6kRCDo`) en contenedor 9:16 de 460px (`max-w-[460px] aspect-[9/16]`) con fondo de refracción.
    - **Galería de Evento**: Grilla 4 columnas en relación vertical 2:3 de 26 fotos del evento conectada directamente al componente unificado `GalleryLightbox`.
    - **SEO**: Objeto `SeoData` completo con canonical, metadatos, imagen destacada (`Territorialidades-campesinas-Evento-8.webp`), opengraph y twitter cards.
- **`src/lib/unifiedContent.ts`**:
    - **Update**: Registro explícito de `territorialidades-campesinas` en `especialesMeta` con su fecha oficial (15/05/2026), título descriptivo e imagen `Evento-8.webp`.

### Session 03/08/2026 - Creación de Página Especial "Convocatoria 28A"
- **`src/pages/noticias/especiales/convocatoria-28a.astro`**:
    - **New**: Página especial para la "Galería de la Memoria del Estallido Social (28A)".
    - **Liquid Glass Compliance**: 10/10. Paleta corporativa estricta Azul ILSA (`var(--ilsa-blue)`, `var(--ilsa-blue-dark)`), eliminados tonos rojos/naranjas. Banner principal limpio sin overlay oscuro.
    - **Multimedia & PDF**:
        - 6 piezas informativas IG en relación 4:5 integradas con `GalleryLightbox`.
        - Visor interactivo PDF (`Galeria-de-la-memoria.pdf`) con relación de aspecto carta (`aspect-[17/22]`) y botón de descarga directa.
        - Video vertical Instagram Reel (`Da_jckxgW5Y`) en iframe 9:16 dentro de tarjeta de cristal de 460px.
    - **Fix Centrado**: Corrección de centrado tipográfico pasando `as="h1"` y `class="text-center w-full"` directamente a `GradientText` en lugar de envolverlo en un `<h1>` redundantemente.
- **`src/lib/unifiedContent.ts`**:
    - **Update**: Registro de `convocatoria-28a` en `especialesMeta`.

### Session 23/06/2026 - Creación de Página Especial "Bienes SAE - ILSA"
- **`src/pages/noticias/especiales/sae.astro`**:
    - **New**: Creación de la página especial con diseño premium "Liquid Glass" que documenta la entrega de siete inmuebles por la SAE a organizaciones sociales en Bogotá.
    - **Video e Interacción**: Integración de video local del director Freddy Ordóñez (`/images/sae/Palabras-Freddy_1.webm`) al lado de una tarjeta de cita contextual, eliminando estructuras lineales aburridas.
    - **Cuadrícula y Lightbox**: Implementación de una grilla de organizaciones aliadas destacando el valor de reparación del refugio claretiano, y una galería masonry de 4 fotos conectadas a `GalleryLightbox` para visualización fluida.
    - **Caching e ISR**: Configurado SSR (`prerender = false`) con cabecera de cache a 1 hora para Cloudflare.
- **`src/lib/unifiedContent.ts`**:
    - **Update**: Registro de la página de la SAE en la constante `registeredLocalPages` para que se liste automáticamente en las vistas generales de noticias del portal.

### Session 27/06/2026 - Auto-descubrimiento de páginas especiales en unifiedContent
- **`src/lib/unifiedContent.ts`**:
    - **Refactor**: Reemplazado el array `registeredLocalPages` (manual) por auto-descubrimiento vía `import.meta.glob` que escanea `src/pages/noticias/especiales/*.astro`.
    - **`especialesMeta`**: Map opcional para sobreescribir título/fecha/imagen en páginas que lo requieran.
    - **Fallback automático**: cualquier `.astro` nuevo en `especiales/` aparece en el grid sin tocar código. Si no tiene entrada en `especialesMeta`, se genera un título desde el filename (kebab-case → Title Case).
    - **`standaloneLocalPages`**: Solo para páginas fuera de `especiales/` (ej. `jurisdiccion-agraria-y-rural`).
- **`src/pages/noticias/especiales/cinco-años-del-estallido-social.astro`**, **`alerta-temprana-unal.astro`**: Registradas implícitamente vía auto-descubrimiento.

### Session 28/04/2026 - Refinamiento Institucional y Tono de Comunicación
- **`tono-y-estilo.md`**:
    - **New**: Se creó una guía de estilo basada en los documentos fundacionales (1978) de ILSA, estableciendo el uso de lenguaje institucional, crítico y emancipatorio.
- **`src/pages/nosotros/index.astro`**:
    - **UX Writing**: Se reescribieron los textos de "Hero", "Misión", "Visión" y "Campos de Acción" para alinearse estrictamente a la guía de estilo, priorizando el rigor sociopolítico.
    - **New Section**: Se incorporó la sección "Historia Institucional" narrando cronológicamente el desarrollo de ILSA desde la OEA hasta la praxis emancipatoria actual, replicando el diseño **Liquid Glass** de la vista con paneles side-by-side y un `auto-slider` de galería.

### Session 27/04/2026 - Integración Dual de Donaciones (ePayco + PayPal)
- **`donaciones.astro`**:
    - **Plataformas de Pago**: Se reemplazó Ko-fi por un sistema dual. ePayco Checkout para donaciones nacionales (COP) y PayPal para internacionales (USD).
    - **Tono Institucional**: Se reescribió el copy de la página para eliminar anglicismos ("incidencia política") y adoptar un tono riguroso acorde a ILSA.
    - **Seguridad**: Se delegó el almacenamiento de la Llave Pública de ePayco al entorno de Cloudflare Pages mediante `.env`.
- **`src/components/molecules/DonationManager.tsx` (Isla React)**:
    - **Robustez de UI**: Se extrajo toda la lógica de selección de país, montos y ejecución de pasarelas a un componente de React montado con `client:load` para resolver problemas de hidratación cruzada con Astro View Transitions.
    - **Micro-interacciones Avanzadas (Liquid Glass)**: Se pulió drásticamente el diseño visual usando controles segmentados (píldoras fluidas), inputs expansivos, luces interiores (`shimmer`) y sombras dinámicas (`currentColor`), respetando estrictamente la jerarquía tipográfica global del proyecto.

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

### Session 28/04/2026 - Historia Institucional y Optimización Responsive
-   **`tono-y-estilo.md`**:
    -   **New**: Se estableció un manual de tono formal, crítico y situado para estandarizar la voz de ILSA en toda la plataforma.
-   **`nosotros/index.astro`**:
    -   **Update**: Textos de Misión, Visión y Campos de Acción alineados al nuevo tono institucional.
    -   **New**: Integración de la sección "Historia Institucional" preservando la fidelidad del texto base (`historia.md`) mediante un layout zig-zag.
    -   **Images**: Integración de fotografías de archivo mediante el componente `SmartImage` manteniendo el diseño Liquid Glass y los zooms on-hover.
    -   **Responsive Fix**: Adición de `px-6` y reducción de paddings en tarjetas móviles para garantizar una visualización cómoda sin desbordamientos de texto.
-   **`donaciones.astro` y `DonationManager.tsx`**:
    -   **Responsive Fix**: Eliminación de "overpadding" (márgenes excesivos) en móviles que apretaban el diseño. Ajuste de fuentes a `text-xs` y reestructuración de la grilla de cantidades para evitar superposición en pantallas estrechas.

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
- `feat(news): add territorialidades-campesinas special page with Instagram reel and 26-photo gallery`
- `feat(news): add convocatoria-28a special page with Azul ILSA palette and PDF viewer`
- `feat(news): add premium sae specials page with video and dynamic masonry gallery`
- `feat(unified-content): register sae specials page in main timeline`
- `feat(content): define institutional tone guidelines and integrate history section into about page`
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

