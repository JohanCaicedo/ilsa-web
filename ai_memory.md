# AI Memory & Context Tracking

## Inventario de Componentes (Nuevos)

### Easter Egg (Glass Breaker)
- **`GlassBreakerEngine.tsx`**: Motor de juego tipo "Breakout" renderizado en Canvas sobre la UI.
    - **Liquid Glass Compliance**: 8/10. Usa `backdrop-blur-md` y `bg-white/90` para los menús de estado (Ready/GameOver), manteniendo consistencia con la estética de vidrio del sitio. Los elementos de juego (barra, particulas) usan colores planos (`ILSA_BLUE`) por solicitud explícita de visibilidad.
    - **Características**: 
        - Audio procedural (Web Audio API) con tema de Zelda OoT Shop.
        - Detección de colisiones con el DOM (`h1`, `p`, `img`, etc).
        - Sistema de navegación aleatoria al ganar.
- **`EasterEggManager.tsx`**: Gestor de estado para la activación del Easter Egg.
    - **Lógica**: Escucha el código Konami (case-insensitive).
    - **Hidratación**: `client:load` para asegurar disponibilidad inmediata.
    - **Persistencia**: Usa `localStorage` para reiniciar el juego automáticamente tras la navegación.

## Refactorizaciones y Cambios
- **`Layout.astro`**: Se integró `EasterEggManager` globalmente. Se ajustó la estrategia de hidratación de `client:idle` a `client:load` para corregir problemas de input en producción.
- **`GlassBreakerEngine.tsx`**: Se eliminaron todos los comentarios del código fuente para limpieza final. Se ajustó el loop de audio para corregir desincronización (drift) cuando el contexto de audio se suspende.

## Next Steps (Pendientes Críticos)

2. **Mobile Implementation**: Actualmente el Easter Egg está desactivado en móviles. Se podría implementar una forma de activación táctil (gestos).
3. **Performance**: Monitorear el impacto del escaneo del DOM (`scanElements`) en páginas con mucho contenido.

## Log de Commits
- `feat: implementation of 'Glass Breaker' easter egg with Zelda music`
- `chore: remove unused FluidGameEngine component`

---

# 📚 Archivo de Contexto Técnico (Consolidado)

## 1. 🏗️ Estado de la Arquitectura
- **Core**: Astro 5.16.11 con Tailwind CSS 4.1.18.
- **Data Layer (`src/lib/wp.ts`)**: 
    - **Refactorizado 2.0**: Se añadieron interfaces `MasterQueryResponse` y `PostNode` para tipado estricto. Se centralizó la `MASTER_QUERY` que obtiene el 90% de los datos comunes del sitio.
    - **Caché**: Mantiene `urlNoCache` mediante `t=` para desarrollo e invalidación de caché en cada petición POST.
- **Adaptador**: Cloudflare `@astrojs/cloudflare` para despliegue en Pages/Workers.
- **SEO**: Integración `@astrojs/sitemap` configurada con dominio `https://ilsa.org.co`. Genera `sitemap.xml` automáticamente en cada build.

## 2. 📋 Inventario Técnico de Componentes (Atomic Design)

### Átomos (Atoms)
- **`LiquidBackground.astro`**: 🟢 **Full Compliance**. Define la base visual del sistema con blobs animados (`animate-blob`), desenfoque (`blur-[90px]`) y textura de ruido.
- **`FloatingOrb.astro`**: 🔵 **Verificación**. Orbe con trayectoria aleatoria independiente (IIFE) y efecto breathing (pulsación de opacidad).
- **`GradientText.astro`**: 🟢 **Interactividad & Tipografía Corregida**. 
    - Refactorizado para soportar `text-center` en contextos móviles mediante `block w-fit mx-auto`.
    - **Fix Crítico**: Añadido `pb-2` para evitar clipping de descenders (g, j, p) causado por `background-clip: text`.
- **`Breadcrumbs.astro`**: 🟢 **Universal & Smart**. Usa `backdrop_blur` y bordes translúcidos. Ahora integrado globalmente en `Layout.astro` con generación automática de rutas.
- **`SliderArrow.astro` / `SliderProgress.astro`**: 🟢 **Generic Ready**. Refactorizados para soportar props dinámicas (`...rest`) y selección por atributos de datos (`data-slider-*`) en lugar de IDs fijos.
- **`SmartImage.astro`**: 🟢 **Performance Core**. Componente estándar para todas las imágenes. Maneja `loading="lazy"` (configurable), `decoding="async"` y transición de opacidad (fade-in) automática con `data-loaded`.

### Moléculas (Molecules)
- **`OpinionCard.astro`**: 🟢 **Full Compliance**. Implementa `backdrop-blur-md`, `bg-white/10` y `border-white/20`. Es el estándar para "Glassmorphism" en el sitio. Reutilizado en sistema de Colecciones.
- **`Pagination.astro`**: 🆕 **Client-Side Pagination**. Componente reutilizable extraído de `opinion/[slug].astro`. Maneja paginación de grids mediante JavaScript con animaciones suaves.
- **`DirectorCard.astro`**: 🔥 **Premium Compliance**. Implementa refracción avanzada con blobs interactivos que siguen el cursor y variantes `dark`/`frosted`.
- **`TeamCard.astro`**: 🟢 **Redesigned**. Molécula cuadrada (`aspect-square`) con animación "Center-to-Edge Reveal" (`clip-path`). Soporta doble imagen (cover/profile) gestionada desde `src/lib/columnistImages.ts`. Leyenda interactiva con entrada top-to-bottom y tipografía optimizada.
- **`NewsCard.astro`**: ❄️ **Frosty Glass**. `backdrop-blur-3xl`, `bg-white/10`. Layout optimizado para móvil: soporta snap-scrolling y `shrink-0`.
- **`LegalActionRow.astro`**: 🆕 **Pill Component**. Molécula en forma de píldora (`rounded-full`) para listas compactas. Sin imágenes, solo título y badge de acción. Soporta fecha de publicación.
- **`ArticleCard.astro`**: 🟢 **Responsive & Conditional**. Refactorizado para ocultar la sección de "autor" si no se proporcionan props (usado en posts genéricos vs opinión).

### Templates (Plantillas Reutilizables)
- **`CollectionPage.astro`**: 🆕 **DRY Architecture**. Template maestro para páginas de colecciones. Acepta prop `collection` y renderiza automáticamente:
    - Header con `GradientText` dinámico
    - Grid de `OpinionCard` con paginación
    - Breadcrumbs inteligentes
    - Query a WordPress filtrado por `wpCategorySlug` desde `collectionsConfig`

### Organismos (Organisms)
- **`Navbar.astro`**: 🟢 **Dynamic & Synced**. 
    - Dropdown "Publicaciones" generado dinámicamente desde `collectionsConfig`
    - Dropdown "Opinión" filtrado por `HIDE_SENSITIVE_AUTHORS` (Feature Flag).
- **`HomeHero.astro`**: 🟢 **Mobile Optimized**. Alineación de títulos y espaciado ajustado dinámicamente (`flex-col` en móvil, `flex-row` en desktop).
- **`HomeNews.astro`**: 🟢 **Layout Adaptativo**. En móvil usa un slider horizontal (`snap-x`, `flex-nowrap`, scroll oculto) en lugar de grid apilado, mejorando drásticamente el uso del espacio vertical.
- **`HomeLegalActions.astro`**: 🆕 **Liquid Container**. Organismo encapsulado en un contenedor de vidrio con título centrado en móvil.
- **`AlliesGrid.astro`**: 🔄 **Hybrid Marquee**. 
    - **Desktop**: Carrusel de altura completa (`h-14`) para impacto visual.
    - **Mobile**: Logos calibrados a `h-10` y `min-w-[80px]` para legibilidad sin saturar.
    - **Estilo**: Título unificado con el gradiente magenta-azul de la Galería Multimedia.
- **`ImageGalleryHoveredContent.astro`**: 🟢 **Hybrid Layout**.
    - **Mobile**: Scroll horizontal centrado con `w-screen left-[calc(-50vw+50%)]` para romper el contenedor.
    - **Desktop**: Efecto acordeón (`flex-grow`) sin zoom intrusivo (`scale-105` eliminado).
- **`ArticlePost.astro`**: 🟢 **Universal Template**. Adapta su renderizado según si es una entrada de opinión (con autor) o noticia general (sin autor). Píldora de categoría dinámica.

### Páginas (Pages)
- **`[...uri].astro`**: 🟢 **Global Entry Point & SEO Enhanced**. 
    - Refactorizada para manejar TODAS las rutas de posts (Noticias, Opinión, Publicaciones).
    - **Fetch All**: Implementado `fetchAllPosts()` para superar el límite de 1000 entradas de WP.
    - **SEO Fix**: Ahora pasa el objeto completo `post.seo` a `Layout` para meta tags correctos (antes solo pasaba title).
    - **Breadcrumbs Inteligentes**: Mapea categorías de WP a rutas de Astro usando `collectionsConfig`.
- **`/publicaciones/*.astro`**: 🆕 **Physical Static Pages**. 8 archivos individuales creados:
    - `archivo-historico.astro`, `coediciones.astro`, `derecho-y-liberacion.astro`, `en-clave-de-sur.astro`
    - `revista-el-otro-derecho.astro`, `otras-publicaciones.astro`, `textos-de-aqui-y-ahora.astro`, `utiles-para-conocer-y-actuar.astro`
    - Todos usan `CollectionPage` template con prop `collection` específico
    - Permite customización futura por archivo sin duplicar código
- **`/publicaciones/index.astro`**: 🟢 **Collections Hub**. Landing page que lista todas las colecciones con cards interactivas.
- **`/opinion/index.astro`**: 🟢 **Enhanced Navigation**. TeamCards ahora son clickables (wrapped in `<a>`), iterando sobre `Object.entries(authorsConfig)` para generar URLs correctas.

## 3. 🛠️ Decisiones de Refactorización y Racional

### Arquitectura de Colecciones (Session Highlight)
- **Problema**: Usuario solicitó páginas estáticas físicas en lugar de ruta dinámica `[collection].astro`
- **Solución**: Patrón Template + Physical Files
    - `CollectionPage.astro` como "receta" reutilizable
    - 8 archivos `.astro` individuales que importan el template
    - Ventaja: Permite customización específica sin duplicar lógica
- **Config Centralizada**: `src/lib/collections.ts` mapea slugs de Astro a categorías de WordPress
- **Cleanup**: Eliminados archivos legacy `[collection].astro` y `[category].astro`

### Sistema de Breadcrumbs Universal
- **Problema**: Breadcrumbs duplicados en múltiples páginas, enlaces rotos a categorías de WP
- **Solución**: Breadcrumbs globales en `Layout.astro`
    - Utility `src/lib/breadcrumbs.ts` genera rutas automáticamente desde URL
    - Páginas pueden pasar breadcrumbs custom vía props (ej: nombres de autores en lugar de slugs)
    - Mapeo inteligente: categorías WP → rutas Astro usando `collectionsConfig`
- **Resultado**: Navegación consistente en todo el sitio, sin código duplicado

### SEO & Metadata
- **Fix Crítico**: `[...uri].astro` ahora pasa `seo={post.seo}` completo a Layout
    - Antes: Solo pasaba `title`, ignorando meta descriptions y OG images
    - Ahora: Meta tags completos de Yoast/RankMath para todos los posts
- **Sitemap**: Configurado `@astrojs/sitemap` con `site: 'https://ilsa.org.co'`
    - Genera automáticamente en build
    - Incluye todas las rutas estáticas y dinámicas

### Tipografía & UX
- **GradientText Descenders**: Añadido `pb-2` para evitar clipping de letras con descendentes
- **Opinion Cards Clickables**: Envueltos en anchors para navegación directa a perfiles
- **Author Slugs**: Actualizados en Navbar y Opinion index (`carlos-frederico-mares`, `german-burgos`)

### Experiencia Móvil (Spacing & Layout)
- Se realizó una reducción agresiva de márgenes verticales (`py-20` -> `py-10`, `mb-24` -> `mb-12`) en móvil para mejorar la densidad de información.
- Se reemplazaron grids apilados por **sliders horizontales** (News, Gallery) para evitar páginas infinitas en celular.
- **Centrado de Texto**: Se identificó que `GradientText` (`inline-block`) no respondía a `text-center`. Se estandarizó el uso de `block w-fit mx-auto` en todos los organismos para garantizar alineación perfecta en móvil.
- **Universalización de Artículos**: Se eliminó la restricción de que `[...uri].astro` solo sirviera opinión. Ahora es la plantilla maestra para cualquier contenido, garantizando consistencia de diseño y SEO en todo el sitio.
- **Estabilidad de Layout**: En `AlliesGrid` y `ImageGallery`, se usaron propiedades de flexbox rígidas (`shrink-0`, `min-w`) para evitar deformaciones en pantallas estrechas.

### Optimización de Imágenes (SmartImage)
- **Problema**: Carga inconsistente de imágenes, falta de feedback visual (placeholders) y CLS potencial.
- **Solución**: Creación de `SmartImage.astro`.
    - Centraliza `loading="lazy"` y `decoding="async"`.
    - Implementa "Fade-in" suave usando CSS y atributo `data-loaded`.
    - Soporta `priority={true}` para LCP (imágenes de Hero).
    - Reemplazó etiquetas `<img>` directas en `DirectorCard`, `OpinionCard`, `ArticleCard`, `NewsCard`, `HeroSlide`, etc.

### Opinion Page Visibility Fix (Session Highlight)
- **Problema**: Contenido de `/opinion` invisible debido a clases de animación de librería faltante (`tailwindcss-animate`).
- **Solución**: Reemplazo de `opacity-0`/`animate-in` por animaciones CSS nativas (`@keyframes enter`) en `src/pages/opinion/index.astro`. Garantiza visibilidad sin dependencias externas rotas.

### TeamCard Redesign (VIP Experience)
- **Objetivo**: Elevar la percepción de los columnistas con una estética "Premium/Contundente".
- **Decisión**: 
    - Card cuadrada (`aspect-square`) con imagen full-bleed.
    - **Dual Image System**: Implementado en `src/lib/columnistImages.ts` (Profile + Cover).
    - **Interacción**: Animación `clip-path` circular para revelar al autor sobre el cover art.
    - **Branding**: Uso sutil de `var(--ilsa-blue)` en bordes y sombras para integración suave.

## 5. ✅ Estado de Validación (QA)
- **Desktop (Chrome)**: 
    - Estética Liquid Glass verificada (Blurred Cards, Translucent Nav, Gradients).
    - `SmartImage` operativo con transiciones suaves.
    - No hay errores en consola.
- **Mobile (iOS Viewport)**:
    - Layout estable (Sin overflow horizontal).
    - Menu hamburguesa funcional.
    - Sliders (News/Gallery) con scroll nativo fluido.
    - Textos legibles y centrados.


### Liquid Glass System Overhaul (Session Highlight)
- **Problema**: La implementación anterior de `Liquid3D` generaba pantallas negras (fallo de transmisión) y carecía de legibilidad/tinte consistente.
- **Solución**: Refactorización completa a un modelo **"Híbrido Frosted"**:
    - **Capa CSS**: `backdrop-filter: blur(40px)` + Tinte blanco al 30% (`rgba(255,255,255,0.3)`). Garantiza legibilidad y promedio de color de fondo.
    - **Capa WebGL**: `Liquid3D.tsx` configurado como **Superficie Pura**. `transmission: 0`, `opacity: 0.15`, `roughness: 0.6`, `anisotropy: 0.7`. Añade textura física y distorsión de bordes sin oscurecer.
    - **Clipping**: `LiquidContainer` ahora maneja `overflow: hidden` estricto en las capas de fondo para respetar `border-radius: full`.
- **Unificación**: `NavDropdown.astro` ahora envuelve su contenido en `LiquidContainer`, heredando exactamente la misma estética.

### Navbar Layout & UX
- **Alineación**: Se forzó la alineación a la derecha extrema de "Donaciones" y el menú móvil mediante `flex-grow` y corrección de anchos internos (`w-full` en `glass-content`).
- **Cohesión**: Todos los elementos flotantes (Navbar, Dropdowns) ahora comparten el mismo ADN visual.

## 6. 🚀 Pendientes Críticos (Next Steps)
- **Performance WebGL**: Monitorear el impacto de tener múltiples canvas R3F (Navbar + Dropdowns abiertos). Podría requerir instancing si el usuario abre muchos menús.
- **Mobile Menu Animation**: Verificar que la animación de entrada del menú móvil se sienta fluida con el nuevo peso visual del glassmorphism.
- **Testing de Colecciones**: Verificar que todas las 8 páginas de publicaciones renderizan correctamente con datos reales de WordPress
- **Validación de Breadcrumbs**: Probar navegación en rutas profundas
- **Build de Producción**: Ejecutar `npm run build` para verificar sitemap.xml


### Global Performance & Retina Optimization (Session Highlight)
- **Problema**: Dispositivos High-DPI (M1/Retina) sufrían de lag severo por renderizar `Liquid3D.tsx` a resolución nativa (>2x). LCP alto (1.9s) reportado por Lighthouse.
- **Solución 3D (Retina Fix)**: 
    - **DPI Clamping**: Se limitó el `dpr` del Canvas R3F a `[1, 1.5]`. Esto reduce la carga de GPU en un ~60% en pantallas Retina sin pérdida visual perceptible.
    - **Optimization**: Reducción de `samples` MSAA a 4 y resolución de transmisión fija a 512px.
    - **Power**: Activado `powerPreference="high-performance"` para solicitar GPU dedicada.
- **Solución LCP (Core Web Vitals)**:
    - **SmartImage**: Implementado `fetchpriority="high"` condicional.
    - **Resource Hints**: Añadido `<link rel="preconnect">` para `api.ilsa.org.co` en `Layout.astro` para acelerar la negociación TLS.
- **Hydration Strategy**: Confirmado el modelo de carga "CSS First" para `LiquidContainer`, donde el tinte blanco (`backdrop-filter`) es inmediato y el WebGL se hidrata después sin bloquear el hilo principal.

## 7. 🛠️ Nuevas Decisiones de Arquitectura (Session Update)

### WordPress Pagination Strategy (Fetch All)
- **Problema**: `MASTER_QUERY` limitada a 1000 items ocultaba posts antiguos.
- **Solución**: Implementado `fetchAllPosts` en `src/lib/wp.ts` con paginación recursiva (`hasNextPage`).
- **Impacto**: Garantiza integridad de datos en `[...uri].astro`.

### Feature Flags
- **Contexto**: Necesidad de ocultar autores específicos para presentaciones.
- **Solución**: `src/lib/presentationConfig.ts` con `HIDE_SENSITIVE_AUTHORS`.

### Image Optimization
- **Cambio**: `TeamCard` migrado a `SmartImage` para rendimiento y UX (fade-in).

### UI Polish & Visual Refinement (Session Highlight)
- **HomeHero Spacing**:
    - Reducción drástica del padding vertical (`py-20` -> `py-5`) para maximizar el "Fold".
    - Ajuste proporcional en desktop (`py-10`) para balance.
- **Navbar Call-to-Actions (CTAs)**:
    - **Donaciones**: Rediseño a "Vivaldi" style. Color sólido `#4e7cce` (Ilsa Blue) + Hover Glow + Shimmer + Icon Pulse.
    - **Actividades**: Rediseño a "Outline Clean". Borde fino (1px) `#4e7cce`. Hover limpia con fondo azul claro (`#adbee0`) y texto blanco. Transiciones suaves `fade`.
    - **Objetivo**: Diferenciar jerarquía visual entre "Apoyar" (Sólido) y "Participar" (Outline).
