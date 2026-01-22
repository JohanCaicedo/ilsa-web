# Protocolo de Transformación de Código Externo (ILSA Web)

Al recibir código de fuentes externas (como PrebuiltUI), el agente debe ejecutar esta transformación:

## 1. Conversión de Arquitectura
- **Astro 5.1**: Convertir a componente `.astro` (Organism).
- **Tailwind 4.0**: Validar que use la directiva `@theme` de `@src/styles/global.css`.
- **Props**: Hacer el componente flexible mediante interfaces de Props en Astro.

## 2. Estética Liquid Glass (Obligatorio)
- **Refracción**: Aplicar `backdrop-blur-md`, `bg-white/10` y `border-white/20`.
- **Layout**: Envolver en contenedores que respeten las clases `max-w-4xl` o `max-w-[1400px]` de `@src/layouts/Layout.astro`.

## 3. Consistencia Sistémica
- **Atmos/Molecules**: SUSTITUIR elementos genéricos por componentes existentes como `@src/components/atoms/Button.astro` o `@src/components/molecules/ArticleCard.astro`.
- **Utilidades**: Usar la función `cn` de `@src/lib/utils.ts` para la gestión de clases.

## 4. Registro y Memoria
- **Catálogo**: Añadir el nuevo componente a `@components_catalog.md`.
- **Memoria**: Documentar la creación en `@ai_memory.md` y generar el texto del commit para Git.
## 5. Concistencia tipografía
- **Fuente**: Usar la fuente Inter para el texto definidos en `@src/styles/global.css`.

## 6. Concistencia colores
- **Colores**: Usar los colores definidos en `@src/styles/global.css`.

## 7. Concistencia estilos
- **Estilos**: Usar los estilos definidos en `@src/styles/global.css`.
