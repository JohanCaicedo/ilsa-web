# ILSA Web Project

Modernización del portal web del **Instituto Latinoamericano para una Sociedad y un Derecho Alternativos (ILSA)**. Este proyecto marca una evolución hacia una arquitectura moderna, escalable y visualmente impactante.

## 1. Visión & Filosofía de Diseño

**"Liquid Glass & Clean Typography"**
El diseño rompe con la estética corporativa tradicional para abrazar una interfaz moderna, transparente y fluida.
-   **Liquid Glass**: Uso intensivo de efectos de cristal (`backdrop-blur`), bordes sutiles y sombras difusas para crear profundidad y contexto.
-   **Tipografía**: `Inter` como fuente principal, priorizando la legibilidad, jerarquía limpia y espacios generosos.
-   **Interacción**: Micro-animaciones sutiles y estados reactivos que dan vida a la interfaz.

## 2. Stack Tecnológico

La plataforma está construida sobre un stack moderno optimizado para rendimiento y mantenibilidad:

-   **Frontend**: [Astro 5.1](https://astro.build/) - Renderizado híbrido (SSG + Islas interactivas) para máximo rendimiento.
-   **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/) - Motor de diseño utilitario con compilación JIT.
-   **Lenguaje**: TypeScript - Tipado estricto para mayor robustez.
-   **Backend**: WordPress (Headless) - Gestión de contenido desacoplada.
-   **API**: WPGraphQL - Puente de datos eficiente entre WordPress y Astro.
-   **Componentes UI**: React - Para islas interactivas complejas.
-   **Iconografía**: Lucide React.
-   **Experimental**: Three.js para efectos visuales avanzados (ver `/lab`).

## 3. Arquitectura del Proyecto

El proyecto sigue una estructura fractal basada en **Atomic Design** dentro de `src/components`:

-   **Atoms**: Unidad mínima (Botones, Links, Iconos).
-   **Molecules**: Combinación de átomos (Tarjetas de Artículos, Inputs de búsqueda).
-   **Organisms**: Secciones complejas (Navbar, Footer, Sliders).
-   **Templates/Layouts**: Estructuras de página (`Layout.astro`).

### Estructura de Directorios Clave
```
/src
  /components    # Atomic Design (atoms, molecules, organisms)
  /pages         # Rutas de la aplicación (File-based routing)
    /actividades # Nueva sección de actividades
    /lab         # Laboratorio experimental (Three.js, pruebas)
    /opinion     # Artículos de opinión y perfiles
    /publicaciones # Biblioteca de publicaciones
  /lib           # Utilidades, configuración de API y helpers
  /styles        # CSS global y configuración de Tailwind
```

## 4. Características Principales

-   **Enrutamiento Dinámico**: Generación de páginas para autores (`/opinion/[slug]`) y publicaciones.
-   **Gestión de Autores**: Configuración centralizada en `src/lib/authors.ts` que mapea usuarios de WP con perfiles extendidos.
-   **Sección de Donaciones**: Página dedicada con integración de pasarelas (en desarrollo).
-   **Laboratorio Experimental**: Espacio en `/lab` para prototipar nuevas interacciones visuales sin afectar producción.

## 5. Flujo de Trabajo con IA (Agents)

Este proyecto está configurado para colaborar con Agentes de IA.
-   **`agents.md`**: Guía operativa para agentes. Define reglas de codificación, contexto del stack y convenciones.
-   **`ai_memory.md`**: Memoria a largo plazo del agente. Registra decisiones arquitectónicas, lecciones aprendidas y estado de sesiones anteriores.
-   **`PROJECT_DOCUMENTATION.md`**: Documentación técnica detallada y profunda (referencia).

## 6. Licencia

**© 2026 Instituto Latinoamericano para una Sociedad y un Derecho Alternativos (ILSA). Todos los derechos reservados.**

Este código es **Software Propietario**. El código fuente es visible con fines educativos y de transparencia, pero no se permite su redistribución o uso comercial/no-commercial sin autorización explícita.
