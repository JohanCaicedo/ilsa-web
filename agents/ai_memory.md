# 🧠 Memoria Técnica y Estado del Proyecto (Ilsa Web)

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
- **`TeamCard.astro`**: 🟢 **Compliant & Clickable**. Usa `backdrop-blur-xl` y `bg-white/70`. Ahora envuelto en anchors en `/opinion` para navegación a perfiles de autores.
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
    - Dropdown "Opinión" actualizado con slugs correctos de autores (`carlos-frederico-mares`, `german-burgos`)
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

## 6. 🚀 Pendientes Críticos (Next Steps)
- **Testing de Colecciones**: Verificar que todas las 8 páginas de publicaciones renderizan correctamente con datos reales de WordPress
- **Validación de Breadcrumbs**: Probar navegación en rutas profundas (ej: post dentro de colección dentro de publicaciones)
- **Build de Producción**: Ejecutar `npm run build` para verificar sitemap.xml y rutas estáticas
- **Google Search Console**: Enviar sitemap una vez desplegado a producción
- **Accesibilidad**: Verificar áreas táctiles en TeamCards clickables y navegación por teclado en breadcrumbs