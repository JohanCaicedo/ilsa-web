# 🧠 Memoria Técnica y Estado del Proyecto (Ilsa Web)

## 1. 🏗️ Estado de la Arquitectura
- **Core**: Astro 5.16.11 con Tailwind CSS 4.1.18.
- **Data Layer (`src/lib/wp.ts`)**: 
    - Centralizado en la función `wpQuery`.
    - **Caché**: Implementa `urlNoCache` mediante el parámetro `t=` para evadir el caché agresivo de Cloudflare/WordPress durante el desarrollo y build.
    - **Robustez**: Maneja errores de GraphQL y fallos de red con logs detallados.
- **Adaptador**: Cloudflare `@astrojs/cloudflare` para despliegue en Pages/Workers.

## 2. 📋 Inventario Técnico de Componentes (Atomic Design)

### Átomos (Atoms)
- **`LiquidBackground.astro`**: 🟢 **Full Compliance**. Define la base visual del sistema con blobs animados (`animate-blob`), desenfoque (`blur-[90px]`) y textura de ruido.
- **`Button.astro`**: 🟡 **Functional**. Botón base. Pendiente unificarse con `ui/button.tsx` si se usa React más extensamente.
- **`Breadcrumbs.astro`**: 🟢 **Compliant**. Usa `backdrop_blur` y bordes translúcidos.
- **`ReadingProgress.astro` / `ShareButtons.astro`**: 🔵 **Utility**. Componentes funcionales bien aislados.

### Moléculas (Molecules)
- **`OpinionCard.astro`**: 🟢 **Full Compliance**. Implementa `backdrop-blur-md`, `bg-white/10` y `border-white/20`. Es el estándar para "Glassmorphism" en el sitio.
- **`DirectorCard.astro`**: 🔥 **Premium Compliance**. Implementa refracción avanzada con blobs interactivos que siguen el cursor y variantes `dark`/`frosted`.
- **`TeamCard.astro`**: 🟢 **Compliant**. Usa `backdrop-blur-xl` y `bg-white/70`, siguiendo el estilo "frosted glass".
- **`ArticleCard.astro`**: 🟡 **Review Required**. Es funcional pero visualmente más simple; evaluar si debe adoptar más "refracción" para mayor consistencia.

### Organismos (Organisms)
- **`Navbar.astro`**: 🟢 **Compliant**. Estructura refractiva que ensambla átomos de navegación.
- **`ArticlePost.astro`**: 🔵 **Structural**. Maneja el renderizado de contenido WP.
- **`RelatedSlider.astro` / `ColumnistSlider.astro`**: 🔵 **Complex**. Orquestan tarjetas y lógica de carrusel.

## 3. 🛠️ Decisiones de Refactorización y Racional
- **Centralización en `wp.ts`**: Evita la dispersión de URLs de API y asegura que todos los componentes manejen los errores de la misma forma.
- **Mapeo de `authors.ts`**: Se decidió desacoplar la bio y fotos de los autores de WordPress para permitir perfiles más ricos y personalizados sin depender de la base de datos de WP, facilitando el control editorial sobre columnistas destacados.
- **Sistema de Tokens de Vidrio**: Se eliminaron estilos arbitrarios de `OpinionCard` para forzar el uso de `backdrop-blur` y opacidades variables, estableciendo el lenguaje visual **Liquid Glass**.

## 4. 🚀 Pendientes Críticos (Next Steps)
- **Inconsistencia de ArticleCard**: El diseño actual de `ArticleCard` es menos "vivo" que `OpinionCard` o `DirectorCard`. Estandarizar.
- **Placeholders en `authors.ts`**: Varios autores tienen URLs de imagen con comentarios `// PON TU URL AQUÍ`. Requiere limpieza de datos reales.
- **Sincronización `ui/` (React) vs Astro**: Asegurar que los componentes de Shadcn (`badge.tsx`, etc.) hereden las mismas variables de desenfoque que los componentes `.astro`.