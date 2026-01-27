# Documentación Técnica del Proyecto ILSA Web

## 1. Visión General y Filosofía
El proyecto es una refactorización y modernización del portal web del **Instituto Latinoamericano para una Sociedad y un Derecho Alternativos (ILSA)**.

**Filosofía de Diseño:** "Liquid Glass & Clean Typography".
El diseño busca evocar transparencia y modernidad institucional, evitando la estética corporativa genérica. Se inspira en interfaces tipo "Apple" por su uso intensivo de:
-   **Blur/Glassmorphism**: Superposiciones translúcidas (`backdrop-blur`) para mantener contexto visual.
-   **Tipografía Limpia**: Uso de `Inter` con jerarquía clara y tracking ajustado.
-   **Interacciones Sutiles**: Micro-animaciones en botones y enlaces, sombras suaves que reaccionan al hover.

## 2. Tecnologías (Stack Tecnológico)
-   **Core Framework**: [Astro 5.0](https://astro.build/) (Renderizado Híbrido: Estático por defecto + Islas interactivas).
-   **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/) (Motor de utilidades, compilación JIT).
-   **Tipografía**: `Inter` (Google Fonts) importada globalmente.
-   **Iconografía**: `Lucide React` (Iconos SVG renderizados como componentes).
-   **Lenguaje**: TypeScript (Tipado estricto habilitado).

## 3. Arquitectura del Proyecto

### 3.1 Estructura de Directorios
El proyecto sigue una estructura fractal basada en **Atomic Design** para los componentes y enrutamiento basado en archivos para las páginas.



### 3.2 Metodología Atomic Design (Implementación)
-   **Átomos**: Componentes puros que reciben props simples.
    -   Ejemplo: `NavButton.astro` maneja variantes visuales (primary/secondary) pero no lógica de negocio.
-   **Organismos**: Componentes orquestadores que definen la estructura de una sección.
    -   Ejemplo: `Navbar.astro` contiene los datos de navegación y ensambla `NavDropdown` y `NavButton`.
-   **Layouts**: Definen la cáscara de la aplicación (`html`, `head`, global scripts).

## 4. Sistema de Diseño (Design System)

### 4.1 Tokens de Color
Definidos en `:root` (`src/styles/global.css`) y extendidos en Tailwind.

| Token | Valor | Uso |
| :--- | :--- | :--- |
| `--ilsa-blue` | `#4E7CCE` | Color primario de marca (Botones, acentos). |
| `--ilsa-blue-dark` | `#375a9e` | Estado hover/active oscuro. |
| `--ilsa-text-dark` | `#111827` | Texto principal (Títulos, cuerpo oscuro). |
| `--ilsa-bg-light` | `#f3f4f6` | Fondos secundarios/neutros. |

### 4.2 Efecto "Liquid Glass"
La firma visual del sitio. Se aplica a contenedores flotantes (Cards, Navbar, Headers).
-   **Fondo**: `bg-white/70` (Blanco al 70% de opacidad).
-   **Blur**: `backdrop-blur-xl` o `backdrop-blur-2xl`.
-   **Borde**: `border border-white/60` (Borde sutil semitransparente).
-   **Sombra**: `shadow-lg` o específica `shadow-[0_8px_32px_0_rgba(74,125,191,0.1)]` (Brillo azulado difuso).

### 4.3 Tipografía
-   **Familia**: Inter (`sans-serif`).
-   **Pesos**:
    -   `font-black` (900): Títulos de impacto (H1).
    -   `font-bold` (700): Encabezados de sección y navegación activa.
    -   `font-medium` (500): Texto de UI y metadatos.
    -   `font-light` (300): Detalles o subtítulos finos.

## 5. Estrategia de Datos y Enrutamiento

### 5.1 Páginas Estáticas
-   Ubicación: `/src/pages/*.astro`
-   Ejemplos: `/index`, `/nosotros/junta-directiva`.
-   Renderizado: Build-time generation.

### 5.2 Páginas Dinámicas (Collections)
El sitio usa `getStaticPaths()` para generar rutas desde datos estructurados.

**Caso de Uso: Opinión (`/opinion/[slug]`)**
1.  **Fuente de Datos**: `src/lib/authors.ts` (Objeto `authorsConfig`).
2.  **Generación**: Iteramos sobre las llaves (`freddy-ordonez-gomez`, etc.) para crear las rutas.
3.  **Renderizado**: La plantilla `[slug].astro` recibe los datos del autor y renderiza el perfil.

**Caso de Uso: Publicaciones (`/publicaciones/[category]`)**
-   Rutas predefinidas mediante array de categorías (`archivo-historico`, `coediciones`, etc.).
-   Actúa como hub para listar items (futura integración con API).

## 6. Guías de Mantenimiento

### Añadir un nuevo autor
1.  Editar `src/lib/authors.ts`.
2.  Añadir nueva entrada con clave única (kebab-case).
3.  Completar: `name`, `profileImage` (URL), `fullBio` (HTML/Texto).
4.  Editar `src/components/organisms/Navbar.astro`.
5.  Añadir entrada en el array `items` de "Opinión" coincidiendo EXACTAMENTE con la clave usada en el paso 2.

### Modificar el Menú
-   El menú se define en el objeto `navStructure` dentro de `src/components/organisms/Navbar.astro`.
-   Soporta dos tipos: `"link"` (enlace directo) y `"dropdown"` (menú desplegable).
-   Para items dropdown, si se provee `href`, el título padre es clicable.
## Query de datos
query MasterQuery {
    posts(first: 1000) {
    nodes {

      id
      databaseId
      slug
      uri
      

      title
      date
      modified 
      excerpt 
      content 
      

      categories {
        nodes {
          name
          slug
          termTaxonomyId
        }
      }
      tags {
        nodes {
          name
          slug
        }
      }
      

      featuredImage {
        node {
          sourceUrl
          altText
          caption
          mediaDetails {
            width
            height
          }
        }
      }
      

      author {
        node {
          name
          firstName
          lastName
          avatar {
            url
          }
        }
      }


      seo {
        title                 # Título SEO (lo que sale en Google en azul)
        metaDesc              # Descripción meta (el texto gris en Google)
        canonical             # URL canónica
        opengraphTitle        # Título para Facebook/LinkedIn/WhatsApp
        opengraphDescription  # Descripción para redes
        opengraphImage {
          sourceUrl           # La imagen que sale al compartir el link
        }
        twitterTitle          # Título específico para X (Twitter)
        twitterDescription    # Descripción para X
        twitterImage {
          sourceUrl           # Imagen para X
        }
        readingTime           # Tiempo de lectura estimado (en minutos)
      }
    }
  }
  }
}

### 6.1 Query de Eventos (Actividades)
Usada para el calendario y listado de actividades (`/actividades`).

```graphql
query MasterEventsQuery {
  events(first: 100) {
    nodes {
      id
      title
      slug
      content
      eventDate       # Campo custom (meta: _event_start_date)
      eventLocation   # Campo custom (meta: _event_location)
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
}
```

---
*Generado automáticamente por Antigravity Agent - 2026-01-20*


## 7. Infraestructura y Arquitectura

Esta sección describe cómo está desplegado y conectado el sistema "Ilsa Web".

### 7.1 Visión General del Sistema

El sistema utiliza una arquitectura **Headless CMS**, desacoplando el frontend del backend de gestión de contenidos.

-   **Frontend (La Web)**: Construido con **Astro** y desplegado en **Cloudflare Pages**. Es responsable de la presentación, el renderizado rápido y la experiencia de usuario.
-   **Backend (Los Datos)**: **WordPress** (alojado en un hosting tradicional). Actúa únicamente como repositorio de contenidos y motor de gestión (Headless).
-   **El Puente (API)**: La comunicación entre ambos mundos se realiza mediante **GraphQL**.

### 7.2 Diagrama de Flujo de Datos

```mermaid
graph LR
    User[Usuario Final] -->|HTTPS| CF[Cloudflare Pages (Frontend)]
    CF -->|Build Time (SSG)| WP[WordPress API (Backend)]
    WP -->|JSON/GraphQL| CF
    Editor[Editor de Contenidos] -->|WP Admin| WP
```

### 7.3 Componentes de Infraestructura

1.  **Frontend (Cloudflare Pages)**
    *   **Repositorio**: Conectado a GitHub (`main` branch).
    *   **Build Process**: Cada vez que se hace un `git push`, Cloudflare detecta el cambio, ejecuta `npm run build` y genera los archivos estáticos.
    *   **Environment Variables**: Requiere `WORDPRESS_API_URL` configurada en el panel de Cloudflare para saber de dónde sacar los datos durante el build.

2.  **Backend (WordPress Host)**
    *   Debe tener habilitado **WPGraphQL** para exponer los datos.
    *   No sirve tráfico web directo a usuarios finales (frontend), solo respuestas API al servidor de build de Cloudflare.

3.  **DNS y Dominios**
    *   **Web (`ilsa.org.co`)**: Apunta a **Cloudflare Pages** mediante registros `CNAME` o `A`. Esto asegura que la web se sirva desde la red global (CDN) de Cloudflare.
    *   **Correo Electrónico**: Gestionado externamente (ej. Google Workspace). Los registros **MX** en el proveedor de DNS deben mantenerse intactos y apuntar a Google, *independientemente* de que el registro web apunte a Cloudflare.
    *   **Backend (`lab.ilsa.org.co` o similar)**: Subdominio específico donde vive el WordPress para que los editores entren.

### 7.4 Flujo de Despliegue (CI/CD)

1.  Desarrollador hace cambios en código -> `push` a GitHub.
2.  Cloudflare Pages detecta el commit.
3.  Cloudflare inicia entorno de build -> Descarga repo -> Instala dependencias (`npm ci`).
4.  Ejecuta `npm run build`:
    *   Astro consulta la API de WordPress (GraphQL).
    *   Genera HTML estático para todas las páginas.
5.  Cloudflare despliega la carpeta `dist/` a su red global.
