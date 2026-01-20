# ILSA-Web

Este repositorio contiene el código fuente para el sitio web del **Instituto Latinoamericano para una Sociedad y un Derecho Alternativos (ILSA)**.

El proyecto está construido utilizando tecnologías web modernas para ofrecer un rendimiento óptimo, una experiencia de desarrollo ágil y una arquitectura mantenible.

## 🚀 Tecnologías Clave

*   **[Astro](https://astro.build/)**: Framework web principal enfocado en contenido y rendimiento.
*   **[React](https://react.dev/)**: Biblioteca para componentes de UI interactivos.
*   **[Tailwind CSS](https://tailwindcss.com/)**: Framework de utilidades para el diseño y estilizado.
*   **[Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)**: Metodología de diseño utilizada para organizar los componentes en `src/components` (atoms, molecules, organisms).

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

*   [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
*   npm (normalmente incluido con Node.js)

## 🛠️ Instalación y Configuración

1.  **Clonar el repositorio**:

    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd ilsa-web
    ```

2.  **Instalar dependencias**:

    ```bash
    npm install
    ```

3.  **Iniciar el servidor de desarrollo**:

    ```bash
    npm run dev
    ```

    El sitio estará disponible en `http://localhost:4321`.

## 📂 Estructura del Proyecto

La estructura de directorios sigue las convenciones de Astro, con una organización de componentes basada en Atomic Design:

```text
/
├── public/           # Archivos estáticos (imágenes, fuentes, etc.)
├── src/
│   ├── components/   # Componentes de UI organizados por Atomic Design
│   │   ├── atoms/
│   │   ├── molecules/
│   │   ├── organisms/
│   │   └── ui/       # Componentes base de UI (ej. shadcn/ui)
│   ├── layouts/      # Plantillas de diseño principales (ej. Layout.astro)
│   ├── lib/          # Utilidades y funciones auxiliares
│   ├── pages/        # Rutas y páginas del sitio (basado en archivos)
│   └── styles/       # Estilos globales (global.css)
├── astro.config.mjs  # Configuración de Astro
├── package.json      # Dependencias y scripts
└── tailwind.config.mjs # Configuración de Tailwind
```

## 📜 Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo local. |
| `npm run build` | Compila el sitio para producción en la carpeta `dist/`. |
| `npm run preview` | Vista previa local de la compilación de producción. |
| `npm run astro` | Ejecuta comandos CLI de Astro (ej. `astro add`). |

## 🤝 Contribución

1.  Asegúrate de seguir la estructura de componentes Atomic Design al crear nuevos elementos de UI.
2.  Utiliza las clases de Tailwind CSS para el estilizado.
3.  Mantén el código limpio y comentado donde sea necesario.
