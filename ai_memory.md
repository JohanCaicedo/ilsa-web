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
- **`Breadcrumbs.astro`**: 🟢 **Compliant**. Usa `backdrop_blur` y bordes translúcidos.
- **`SliderArrow.astro` / `SliderProgress.astro`**: 🟢 **Generic Ready**. Refactorizados para soportar props dinámicas (`...rest`) y selección por atributos de datos (`data-slider-*`) en lugar de IDs fijos.

### Moléculas (Molecules)
- **`OpinionCard.astro`**: 🟢 **Full Compliance**. Implementa `backdrop-blur-md`, `bg-white/10` y `border-white/20`. Es el estándar para "Glassmorphism" en el sitio.
- **`DirectorCard.astro`**: 🔥 **Premium Compliance**. Implementa refracción avanzada con blobs interactivos que siguen el cursor y variantes `dark`/`frosted`.
- **`TeamCard.astro`**: 🟢 **Compliant**. Usa `backdrop-blur-xl` y `bg-white/70`, siguiendo el estilo "frosted glass".
- **`ArticleCard.astro`**: 🟡 **Review Required**. Es funcional pero visualmente más simple; evaluar si debe adoptar más "refracción" para mayor consistencia.

### Organismos (Organisms)
- **`Navbar.astro`**: 🟢 **Compliant**. Estructura refractiva que ensambla átomos de navegación.
- **`RelatedSlider.astro` / `ColumnistSlider.astro`**: 🟢 **Sistémicos**. Orquestan tarjetas y lógica de carrusel. Refactorizados para soportar múltiples instancias aisladas.
    - **Lógica de Arrastre**: "Grab" de alta fidelidad para desktop con detección de umbral de 5px para distinguir entre scroll y clics.
    - **Selección Aislada**: Evita colisiones de IDs mediante selectores de atributos de datos y scoping en JavaScript.

### Páginas (Pages)
- **`opinion/index.astro`**: 🟢 **Implementado**. Implementa el Hero de "Liquid Glass", una cuadrícula de columnistas basada en `authors.ts` y un `RelatedSlider` limitado a las 20 columnas de opinión más recientes.

## 3. 🛠️ Decisiones de Refactorización y Racional
- **Aislamiento de Sliders**: Se abandonó el uso de IDs globales (`btn-prev`, etc.) a favor de selectores de atributos de datos. Esto es crítico para la estabilidad en aplicaciones Astro con transiciones de página nativas.
- **Mapeo de `authors.ts`**: Se desacopló la bio y fotos de los autores de WordPress para permitir perfiles más ricos y personalizados sin depender de la base de datos de WP.
- **Protección de Clics en Sliders**: Se implementó una lógica de captura de eventos para prevenir que los enlaces en las tarjetas se activen accidentalmente durante un movimiento de arrastre.

## 4. 🚀 Pendientes Críticos (Next Steps)
- **Sincronización de Autores**: El mapeo en `authors.ts` debe mantenerse sincronizado con los perfiles en el WP de producción (`api.ilsa.org.co`).
- **Placeholder Cleanup**: Reemplazar URLs temporales en `src/lib/authors.ts` por imágenes finales alojadas en el CDN/WP.
- **Estandarización de `ArticleCard`**: Evaluar si este componente debe recibir el tratamiento de refracción de `OpinionCard` para mantener la coherencia visual total.
