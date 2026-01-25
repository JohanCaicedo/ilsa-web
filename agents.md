# Contexto del Proyecto: ILSA WEB (Headless Astro)

Actúa como un experto en Astro 5.1 y Tailwind 4.0. Tu objetivo es mantener la consistencia sistémica y reutilizar componentes existentes.

## 1. Stack Tecnológico
- **Framework**: Astro 5.1 con SSR/SSG.
- **Estilos**: Tailwind CSS 4.0 (usando @theme inline en global.css).
- **Backend**: WordPress Headless vía GraphQL (WPGraphQL).
- **Integraciones**: React para componentes complejos y Lucide para iconos.
- **Viusal**: Threejs para animaciones complejas.

## 2. Inventario de Componentes Existentes (¡NO DUPLICAR!)
Antes de crear UI, verifica si puedes usar o extender estos archivos:

### Átomos (Atoms) - src/components/atoms/
- **Botones**: `Button.astro`, `navbar/NavButton.astro`.
- **Navegación**: `navbar/NavLink.astro`, `navbar/NavDropdown.astro`, `Breadcrumbs.astro`.
- **Funcionales**: `ReadingProgress.astro`, `ShareButtons.astro`, `SliderArrow.astro`, `SliderProgress.astro`, `SmartImage.astro`.

### Moléculas (Molecules) - src/components/molecules/
- **Tarjetas**: `ArticleCard.astro` (general) y `OpinionCard.astro` (específica para columnas).

### Organismos (Organisms) - src/components/organisms/
- **Estructura**: `Navbar.astro`.
- **Galería**: `ImageGalleryHoveredContent.astro`.
- **Contenido**: `ArticlePost.astro` (Cuerpo del post de WP).
- **Sliders**: `ColumnistSlider.astro`, `RelatedSlider.astro`.

### UI Base (Shadcn/React) - src/components/ui/
- `badge.tsx`, `button.tsx`, `card.tsx`, `navigation-menu.tsx`.

## 3. Reglas de Oro de Programación
1. **Datos**: Toda consulta a WP debe usar `wpQuery` de `src/lib/wp.ts`. Nunca uses fetch directo.
2. **Autores**: Usa el mapeo de `src/lib/authors.ts`. No asumas la data de WP como única fuente para columnistas.
3. **Diseño (Liquid Glass)**: Sigue el sistema de refracción. Usa `backdrop-blur-md`, `bg-white/10` y `border-white/20`. Consulta `Liquid glass.docx` para la física del vidrio.
4. **Layout**: Usa `Layout.astro`. Respeta las props `title` y `width` ("narrow" | "wide") para el ancho del contenedor.
5. **Utilidades**: Usa `cn` de `src/lib/utils.ts` para combinar clases de Tailwind.
6. **Imágenes**: Usa SIEMPRE `SmartImage.astro` en lugar de `<img>`. Este componente maneja lazy loading, decodificación asíncrona y animaciones de entrada automáticamente.

## 4. Historial y Consistencia
- Revisa siempre `@src/components` antes de proponer una nueva "molécula".
- Si refactorizas, actualiza este contexto para no repetir errores pasados.

## 5. Esquema de Datos (GraphQL MasterQuery)
El backend en `api.ilsa.org.co` devuelve objetos con la siguiente estructura. Úsala para tipar componentes y extraer metadatos:

- **Identificadores**: `id`, `databaseId`, `slug`, `uri`.
- **Contenido**: `title`, `date`, `modified`, `excerpt`, `content`.
- **Clasificación**: `categories` y `tags` (acceder vía `nodes`).
- **Multimedia**: `featuredImage.node` incluye `sourceUrl`, `altText` y `mediaDetails` (width/height).
- **Autor**: `author.node` incluye `name`, `firstName`, `lastName` y `avatar.url`.
- **SEO (Yoast)**: Acceder vía campo `seo`. Incluye:
    - `title`, `metaDesc`, `canonical`.
    - Redes Sociales: `opengraphTitle`, `opengraphImage.sourceUrl`, `twitterImage.sourceUrl`.
    - Lectura: `readingTime` (tiempo estimado en minutos).
## Protocolo de Finalización
- Al final de cada sesión, el agente DEBE proponer la actualización de `@ai_memory.md` y generar el texto de un commit para Git basado en los cambios detectados en el sistema de archivos.