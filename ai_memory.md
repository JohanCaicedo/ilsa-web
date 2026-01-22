# 🧠 Memoria Técnica y Estado del Proyecto (Ilsa Web)

## 1. 🏗️ Estado de la Arquitectura
- **Core**: Astro 5.16.11 con Tailwind CSS 4.1.18.
- **Data Layer (`src/lib/wp.ts`)**: 
    - **Refactorizado 2.0**: Se añadieron interfaces `MasterQueryResponse` y `PostNode` para tipado estricto. Se centralizó la `MASTER_QUERY` que obtiene el 90% de los datos comunes del sitio.
    - **Caché**: Mantiene `urlNoCache` mediante `t=` para desarrollo e invalidación de caché en cada petición POST.
- **Adaptador**: Cloudflare `@astrojs/cloudflare` para despliegue en Pages/Workers.

## 2. 📋 Inventario Técnico de Componentes (Atomic Design)

### Átomos (Atoms)
- **`LiquidBackground.astro`**: 🟢 **Full Compliance**. Define la base visual del sistema con blobs animados (`animate-blob`), desenfoque (`blur-[90px]`) y textura de ruido.
- **`FloatingOrb.astro`**: 🔵 **Verificación**. Orbe con trayectoria aleatoria independiente (IIFE) y efecto breathing (pulsación de opacidad).
- **`GradientText.astro`**: 🟢 **Interactividad & Centrado**. Refactorizado para soportar `text-center` en contextos móviles mediante `block w-fit mx-auto`. Esto soluciona problemas de alineación en textos multi-línea.
- **`Breadcrumbs.astro`**: 🟢 **Compliant**. Usa `backdrop_blur` y bordes translúcidos.
- **`SliderArrow.astro` / `SliderProgress.astro`**: 🟢 **Generic Ready**. Refactorizados para soportar props dinámicas (`...rest`) y selección por atributos de datos (`data-slider-*`) en lugar de IDs fijos.

### Moléculas (Molecules)
- **`OpinionCard.astro`**: 🟢 **Full Compliance**. Implementa `backdrop-blur-md`, `bg-white/10` y `border-white/20`. Es el estándar para "Glassmorphism" en el sitio.
- **`DirectorCard.astro`**: 🔥 **Premium Compliance**. Implementa refracción avanzada con blobs interactivos que siguen el cursor y variantes `dark`/`frosted`.
- **`TeamCard.astro`**: 🟢 **Compliant**. Usa `backdrop-blur-xl` y `bg-white/70`, siguiendo el estilo "frosted glass".
- **`NewsCard.astro`**: ❄️ **Frosty Glass**. `backdrop-blur-3xl`, `bg-white/10`. Layout optimizado para móvil: soporta snap-scrolling y `shrink-0`.
- **`LegalActionRow.astro`**: 🆕 **Pill Component**. Molécula en forma de píldora (`rounded-full`) para listas compactas. Sin imágenes, solo título y badge de acción. Soporta fecha de publicación.
- **`ArticleCard.astro`**: 🟢 **Responsive & Conditional**. Refactorizado para ocultar la sección de "autor" si no se proporcionan props (usado en posts genéricos vs opinión).

### Organismos (Organisms)
- **`Navbar.astro`**: 🟢 **Compliant**. Estructura refractiva que ensambla átomos de navegación.
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
- **`[...uri].astro`**: 🟢 **Global Entry Point**. Refactorizada para manejar TODAS las rutas de posts (Noticias, Opinión, etc.) usando `MASTER_QUERY`. Detecta categorías y renderiza condicionalmente los componentes específicos (como breadcrumbs y bio de autor).

## 3. 🛠️ Decisiones de Refactorización y Racional
- **Experiencia Móvil (Spacing & Layout)**: Se realizó una reducción agresiva de márgenes verticales (`py-20` -> `py-10`, `mb-24` -> `mb-12`) en móvil para mejorar la densidad de información. Se reemplazaron grids apilados por **sliders horizontales** (News, Gallery) para evitar páginas infinitas en celular.
- **Centrado de Texto**: Se identificó que `GradientText` (`inline-block`) no respondía a `text-center`. Se estandarizó el uso de `block w-fit mx-auto` en todos los organismos para garantizar alineación perfecta en móvil.
- **Universalización de Artículos**: Se eliminó la restricción de que `[...uri].astro` solo sirviera opinión. Ahora es la plantilla maestra para cualquier contenido, garantizando consistencia de diseño y SEO en todo el sitio.
- **Estabilidad de Layout**: En `AlliesGrid` y `ImageGallery`, se usaron propiedades de flexbox rígidas (`shrink-0`, `min-w`) para evitar deformaciones en pantallas estrechas.

## 4. 🚀 Pendientes Críticos (Next Steps)
- **Validación de SEO**: Verificar que los metadatos dinámicos generados en `[...uri].astro` sean correctos para tipos de contenido no-opinión.
- **Paginación**: Implementar carga progresiva o paginación en las listas de noticias si el volumen de contenido crece.
- **Accesibilidad Móvil**: Verificar áreas táctiles en los nuevos sliders horizontales.