# Guía de Diseño: Liquid Glass & Frosty (ILSA Web)

Esta es la guía definitiva de implementación visual para el proyecto. Todos los estilos deben derivar de `src/styles/global.css`.

## 1. Principios Fundamentales
*   **Default Theme**: **Light Mode**. La interfaz se construye sobre fondos claros (`--ilsa-bg-light`).
*   **Fuente**: **Inter** (definida en `global.css` como `font-sans`).
*   **Estética**: Fusión de **Fluidos Orgánicos** (Liquid) y **Cristal Gélido** (Frosty).

## 2. Tokens Globales (`src/styles/global.css`)
No uses valores Hexadecimales arbitrarios. Usa las variables definidas.

### Paleta Corporativa
| Token CSS | Tailwind Class | Uso |
| :--- | :--- | :--- |
| `--ilsa-blue` | `text-[var(--ilsa-blue)]` | Color primario, enlaces, acentos. |
| `--ilsa-blue-dark` | `text-[var(--ilsa-blue-dark)]` | Estados hover, fondos oscuros profundos. |
| `--ilsa-text-dark` | `text-[var(--ilsa-text-dark)]` | Títulos principales (h1, h2). |
| `--ilsa-text-gray` | `text-[var(--ilsa-text-gray)]` | Texto de cuerpo y metadatos. |

### Sistema Glass (Variables)
| Token CSS | Valor Ref | Uso |
| :--- | :--- | :--- |
| `--glass-surface` | `rgba(255, 255, 255, 0.6)` | Paneles generales. |
| `--glass-border` | `rgba(255, 255, 255, 0.6)` | Bordes sutiles. |
| `--glass-shadow` | `rgba(74, 125, 191, 0.15)` | Sombras tintadas (no negras puras). |

## 3. Recetas de Componentes (Copy-Paste)

### A. Tarjeta "Frosty Glass" (Premium)
*Estándar actual para Destacados (ej. `NewsCard`).*
Se caracteriza por un desenfoque extremo y transparencia casi total.
```html
<div class="
    rounded-3xl 
    border border-white/20 
    bg-white/10 
    backdrop-blur-3xl 
    shadow-lg 
    hover:shadow-2xl 
    transition-all duration-300
    perspective-1000
    group
">
    <!-- Contenido con padding p-5 -->
    <!-- Efecto Glow opcional: bg-gradient-to-b from-white/20 to-transparent -->
</div>
```

### B. Tarjeta "Liquid Glass" (Estándar)
*Estándar para listados densos (ej. `OpinionCard`).*
Más legible, mayor opacidad.
```html
<div class="
    rounded-2xl 
    border border-white/60 
    bg-white/40 
    backdrop-blur-md 
    shadow-sm 
    hover:-translate-y-1 
    transition-all
">
    <!-- Contenido -->
</div>
```

### C. Tipografía Interactiva
Para títulos de sección, usar el componente `GradientText`.
```astro
<GradientText 
    text="Título Sección" 
    size="text-4xl" 
    from="var(--ilsa-blue)" 
    to="var(--ilsa-blue-dark)" 
/>
```

## 4. Atmósfera y Fondos
El efecto Glass necesita "algo" detrás para funcionar.
Usar **Blobs** con blur extremo en contenedores `relative`.

```html
<!-- Background Decor -->
<div class="absolute inset-0 -z-10 overflow-hidden opacity-60 pointer-events-none">
    <div class="absolute top-0 left-0 w-[500px] h-[500px] bg-[var(--ilsa-blue)]/10 rounded-full blur-[100px]"></div>
</div>
```

## 5. Accesibilidad y Layout
1.  **Padding**: Usar espacios compactos (`p-5`, `p-6`) en tarjetas para maximizar contenido.
2.  **Contraste**: Asegurar que el texto sobre cristal tenga suficiente peso (`font-medium` o `font-semibold`).
3.  **Botones**: Anclar botones de acción ("Leer más") al fondo con `mt-auto` para alineación visual.