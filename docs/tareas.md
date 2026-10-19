Vale, vamos a actualizar la página `@src/pages/nosotros/index.astro`. 

### 🎯 Objetivo Principal
Refactorizar la sección "Equipo de Trabajo" en `@src/pages/nosotros/index.astro` para organizar las categorías mediante un sistema interactivo de pestañas (tabs/toggle) y agregar a los nuevos integrantes/practicantes y actualizar la sección de comunicaciones.

---

### 📋 Requisitos y Especificaciones

1. **Datos del Equipo (`@src/lib/team.ts`)**:
   - Actualiza `@src/lib/team.ts` para registrar los siguientes perfiles con sus respectivos datos y descripciones:"
-  Revisar @integrantes.md
     
     * **Pestaña Comunicaciones:**
       - **Camilo Caicedo** (Comunicaciones y Estrategia Digital):
         > "Diseñador digital y multimedial de la Universidad Colegio Mayor de Cundinamarca, con formación complementaria en liderazgo e innovación en diseño (MIU y UNIR). Diseñador y comunicador de ILSA, encargado del diseño, coordinación y ejecución de la estrategia de comunicación digital y visual de la organización. Lidera la administración y optimización del ecosistema web institucional mediante arquitectura headless (Astro/WordPress), la producción de contenidos gráficos y editoriales (incluyendo publicaciones como El Otro Derecho), así como el registro fotográfico y audiovisual de eventos para el fortalecimiento de la identidad visual, la memoria institucional y la divulgación de la defensa de los derechos humanos."

     * **Pestaña Acompañamiento / Practicantes:**
       - **Silvana Rivera Prada** (Practicante de Comunicaciones):
         > "Mi nombre es Silvana Rivera Prada, soy estudiante de Política y Relaciones Internacionales de la Universidad Sergio Arboleda. Llego a ILSA con muchas ganas de aprender y de aportar desde mi formación a la comunicación institucional y al fortalecimiento de las alianzas de la organización. Hacer parte de una entidad que trabaja por una sociedad y un derecho alternativos representa una oportunidad valiosa, tanto para mi crecimiento profesional como para los espacios de diálogo y construcción colectiva que impulsamos todos los días."
       
       - **José Luis Méndez Pérez** (Practicante de Derecho de Tierras y Abogacía Popular):
         > "Mi nombre es José Luis Méndez Pérez, soy estudiante de la Universidad Nacional. Desde que me sumé al equipo de ILSA, mi trabajo se ha enfocado en fortalecer la abogacía popular y el derecho de tierras, herramientas clave para la defensa de los territorios y las comunidades. Junto con Santiago Ariza, con quien comparto un camino de trabajo y formación desde la universidad, he desarrollado investigaciones sobre la consulta previa campesina y participado en los encuentros de territorialidades para impulsarla. Creo firmemente que el derecho debe estar al servicio de las luchas populares y de la transformación social, y hacer parte de esta organización es un paso fundamental en ese compromiso."

2. **Sistema de Pestañas / Tabs (Equipo de Trabajo)**:
   - Crea un selector interactivo por pestañas para alternar entre las distintas áreas:
     - *Investigadores*
     - *Administración*
     - *Comunicaciones* (incluye a Camilo Caicedo)
     - *Acompañamiento* (incluye la sección de practicantes con Silvana Rivera Prada y José Luis Méndez Pérez)
   - Reutiliza la lógica de componentes e islas interactivas que ya existen en `@src/components/` (no hardcodees contenido directamente en el archivo Astro).

3. **Reutilización de Componentes y Diseño**:
   - **Tarjetas de Equipo:** Usa las mismas tarjetas visuales que se emplean en otras secciones (como Junta Directiva).
   - **Guía de Estilo:** Consulta y sigue estrictamente las directivas de diseño en `@agents/liquid-glass.md`.

---

### ⚠️ Restricciones
- **Aislamiento:** No modifiques ninguna otra sección de la página ni de la web. Únicamente enfócate en la sección **Equipo de Trabajo**.
- **Metodología:** Revisa primero los componentes de `@src/components/` y la estructura de `@src/lib/team.ts` antes de escribir código.

Nota: luego agregamos las fotos