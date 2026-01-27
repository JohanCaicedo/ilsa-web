# 🏗️ ILSA Web: Documentación Técnica de Arquitectura

**Versión:** 1.0.0
**Stack:** Astro 5, React 19, TailwindCSS 4, WordPress GraphQL, Cloudflare Pages.

---

## 1. Visión General del Sistema
Este proyecto es una aplicación web **híbrida (SSG + SSR)** diseñada para ofrecer el máximo rendimiento, seguridad y escalabilidad. Utiliza una arquitectura **Headless**, donde el frontend (Astro) está completamente desacoplado del backend (WordPress).

### Diagrama de Flujo de Datos
```mermaid
graph TD
    User[Usuarios / Internet] -->|HTTPS| CF[Cloudflare Pages Global CDN]
    
    subgraph "Frontend Layer (Astro)"
        CF -->|Static Assets| SSG[Páginas Pre-renderizadas (SSG)]
        CF -->|Dynamic Requests| SSR[Server Side Rendering (SSR)]
        SSG -->|Hydration| React[React Components (Interactivity)]
        SSR -->|Runtime| Function[Cloudflare Worker Function]
    end

    subgraph "Data Layer"
        WP[WordPress Backend (api.ilsa.org.co)] -->|GraphQL Query| Function
        Function -->|JSON Response| SSR
        BuildProcess[Build Time (CI/CD)] -->|GraphQL Query| WP
        BuildProcess -->|Generate HTML| SSG
    end

    subgraph "Optimization"
        BuildProcess -->|Cache Data| WPCache[.cache/wp (Smart Caching)]
        BuildProcess -->|Optimize Images| SmartImg[Conditional SmartImage]
    end
```

---

## 2. Componentes Clave

### 2.1. Núcleo: Astro & Rendering Strategy
El proyecto utiliza un enfoque híbrido configurado en `astro.config.mjs`:
-   **Static Site Generation (SSG)**: La mayoría de las páginas (Inicio, Nosotros, Publicaciones) se generan **una sola vez** durante el build (`npm run build`). Esto garantiza velocidad instantánea (TTFB < 50ms).
-   **Server Side Rendering (SSR)**: Páginas que requieren interactividad con datos vivos, como `/actividades` (para filtrado por año en tiempo real), se renderizan en el servidor (Cloudflare Function) bajo demanda. `prerender = false`.

### 2.2. Capa de Datos: WordPress GraphQL (`src/lib/wp.ts`)
Toda la data proviene de un endpoint GraphQL centralizado.
-   **`wpQuery`**: Función wrapper universal. Maneja las peticiones HTTP a WordPress.
-   **Smart Caching (`src/lib/wp-cache.ts`)**: Sistema de caché en sistema de archivos local (`.cache/wp`).
    -   *Propósito*: Durante el desarrollo y build, evita martillar la API de WordPress repetidamente. Si una query ya se hizo, se lee del disco (hash MD5 de la query).
    -   *Impacto*: Reduce tiempos de build de 10 min a < 2 min.

### 2.3. Sistema de Diseño "Liquid"
La interfaz utiliza **TailwindCSS v4** y componentes reactivos.
-   **Arquitectura Atómica**: `src/components/` dividida en `atoms`, `molecules`, `organisms`.
-   **Efectos Visuales**: `LiquidBackground` y `FloatingOrb` crean la identidad visual "fluida" sin impactar el rendimiento principal (cargados como islas interactivas).

---

## 3. Infraestructura y Despliegue (Cloudflare)

### 3.1. Adaptador Cloudflare
El sitio corre sobre la infraestructura Edge de Cloudflare (`adapter: cloudflare` en config).

### 3.2. Gestión de Rutas y Límites (`public/_routes.json`)
Cloudflare Functions tiene un límite estricto de **100 reglas** por proyecto y **100 caracteres** por regla de ruta.
-   **Problema**: Astro auto-genera reglas de exclusión para cada archivo estático. Con títulos largos de eventos (ej: "...seminario-interculturalidad..."), esto rompe el despliegue (Error 8000057).
-   **Solución**: Implementamos un `_routes.json` manual con estrategia de **Wildcards Granulares**.
    -   En lugar de listar `/actividades/evento-1`, `/actividades/evento-2`...
    -   Listamos `/actividades/a*`, `/actividades/b*`...
    -   Esto mantiene a `/actividades` (la raíz) dentro de la Function (SSR) pero sirve todo el contenido estático profundo directamente desde el CDN.

### 3.3. Optimización de Memoria (OOM Fix)
Cloudflare Free Tier tiene límites de memoria (128MB/256MB) para el proceso de build.
-   **Estrategia**: `SmartImage` y `OpinionCard` implementan **Optimización Condicional**.
    -   Imágenes de eventos antiguos (< 2025): Se sirven como etiquetas `<img>` estándar (sin procesamiento de build).
    -   Imágenes recientes (>= 2025): Se procesan con `<Image />` de Astro (WebP, avif, responsive).
    -   *Resultado*: Ahorro del 80% de memoria RAM durante el build.

---

## 4. Estructura de Directorios Críticos

```bash
/
├── .cache/wp/          # Caché persistente de queries GraphQL (No subir a git)
├── public/
│   └── _routes.json    # [CRÍTICO] Control manual de reglas de enrutamiento Cloudflare
├── src/
│   ├── components/     # Atomic Design (atoms, molecules, organisms)
│   ├── layouts/        # Layout.astro (Global Shell: SEO, Nav, Transitions)
│   ├── lib/            # Lógica de negocio
│   │   ├── wp.ts       # Cliente GraphQL
│   │   └── wp-cache.ts # Lógica de caché filesystem
│   └── pages/          # File-based Routing
│       ├── actividades/
│       │   ├── index.astro   # SSR (Dinámico)
│       │   └── [slug].astro  # SSG (Estático)
│       └── [...uri].astro    # Catch-all para páginas genéricas de WP
└── astro.config.mjs    # Configuración del compilador y adaptador
```

## 5. Comandos de Desarrollo

| Comando | Acción | Descripción |
| :--- | :--- | :--- |
| `npm run dev` | Servidor Local | Inicia entorno de desarrollo con Hot Reload. |
| `npm run build` | Compilación Prod | Genera la carpeta `dist/` lista para deploy. |
| `npm run preview` | Simulación Local | Sirve la carpeta `dist/` usando el runtime de Wrangler (Cloudflare). |

## 6. Procedimiento de Resolución de Problemas (Troubleshooting)

### Si el deploy falla por "Routes Limit":
1.  Revisar `public/_routes.json`.
2.  Asegurar que **no** se hayan agregado reglas individuales largas automáticamente en `dist/_routes.json`.
3.  Si hay nuevas secciones, agregarlas a la lista `exclude` usando wildcards (`/nueva-seccion/*`).

### Si el build falla por memoria (OOM):
1.  Verificar que `SmartImage` sigue usando la lógica condicional `shouldOptimize`.
2.  Reducir el número de imágenes procesadas ajustando el año de corte en `OpinionCard.astro`.
# Bug fix and improvements
#### NPM run Build fix
1. [x] Arrow buttons in post slider not working
2. [x] Pagination not working in authors page, Publicaciones pages
- [x] Button arrow in opinion slider not working <!-- id: 8 -->
4. [x] Dropdown  card not working in about us page
5. [x] Update team cards UI, use --ilsa-blue
6. [ ] Real photo for team members
7. [x] Description modal for our teams 
8. [x] Update dropdown menu (Nosotros > historia, misión, visión, dirección, junta directiva, asamblea de socias y socios)
9. [ ] Authors page in movil, improve speed load articles. (SKIPPED)
10. [x] (Coediciones, En Clave de Sur) dont show post.# Bug fix and improvements
#### NPM run Build fix
1. Arrow buttons in post slider not working
2. Pagination not working in authors page, Publicaciones pages
3. Button arrow in opinion slider not working
4. Dropdown  card not working in about us page
5. Update team cards UI, use --ilsa-blue
6. Real photo for team members
7. Description modal for our teams 
8. Update dropdown menu (Nosotros > historia, misión, visión, dirección, junta directiva, asamblea de socias y socios)
9. Authors page in movil, improve speed load articles.
10. (Coediciones, En Clave de Sur) dont show post.