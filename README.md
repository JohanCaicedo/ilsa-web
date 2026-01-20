# Proyecto Web ILSA

Repositorio oficial para el desarrollo del nuevo portal web del **Instituto Latinoamericano para una Sociedad y un Derecho Alternativos (ILSA)**.

Este proyecto representa una modernización completa de la presencia digital de ILSA, utilizando una arquitectura basada en componentes (Atomic Design) y un diseño visual contemporáneo ("Liquid Glass").

## 📚 Documentación Técnica
Para detalles profundos sobre arquitectura, tokens de diseño y guías de desarrollo, consulta:
👉 **[PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md)**

## 🚀 Tecnologías Clave

*   **[Astro 5](https://astro.build/)**: Framework core. Renderizado híbrido (Estático + Islas).
*   **[Tailwind CSS v4](https://tailwindcss.com/)**: Motor de estilos y sistema de diseño.
*   **[TypeScript](https://www.typescriptlang.org/)**: Tipado estático para robustez.
*   **Atomic Design**: Organización fractal de componentes (`src/components/atoms`, `molecules`, `organisms`).

## ✨ Características Recientes (v2.0)

*   **Navbar "Liquid Glass"**: Nueva navegación flotante con efectos de desenfoque (`backdrop-blur`), menús desplegables anidados y branding actualizado (Logo 2025).
*   **Arquitectura de Contenidos Expandida**:
    *   `/nosotros`: Secciones institucionales (Dirección, Junta).
    *   `/opinion`: Sistema dinámico de columnistas basado en `authors.ts`.
    *   `/publicaciones`: Catálogo organizado por categorías (Coediciones, Archivo Histórico, etc.).
    *   `/actividades`: Calendario y listado de eventos.
*   **Diseño Visual**: Implementación de tipografía `Inter` (Apple-style) y paleta de colores institucional (`--ilsa-blue`).



## 📂 Estructura Principal

```text
/src
├── components/   # UI Kit (Atomic Design)
│   ├── atoms/    # NavLink, NavButton, NavDropdown...
│   └── organisms/# Navbar, Footer...
├── layouts/      # Plantillas globales (Layout.astro)
├── lib/          # Lógica (authors.ts, configuraciones)
├── pages/        # Rutas (index, opinion/[slug], etc.)
└── styles/       # global.css (Tokens de diseño)
```

---
*Desarrollado con estándares de código moderno para ILSA.*
