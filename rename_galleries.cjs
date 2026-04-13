const fs = require('fs');
const json = fs.readFileSync('generated_galleries.json', 'utf8');
const targetFile = 'src/lib/galleries.ts';
const newCode = `// src/lib/galleries.ts

export interface GalleryImage {
    src: string;
    alt: string;
}

export interface GalleryAlbum {
    id: string; // Identificador único (kebab-case) del álbum
    title: string; // Título visible del álbum / carpeta
    location?: string; // Lugar, e.g., "Bogotá, Colombia"
    date?: string; // Fecha, e.g., "Octubre 2023"
    images: GalleryImage[]; // Lista de imágenes
}

export interface GalleryCategory {
    id: string; // Identificador de la sección, ej. "eventos-2023"
    title: string;
    description?: string;
    albums: GalleryAlbum[];
}

/**
 * Configuración central de las galerías.
 * Puedes agregar tantas categorías y álbumes como sea necesario.
 */
export const galleryData: GalleryCategory[] = [
    {
        id: "eventos-recientes",
        title: "",
        description: "",
        albums: ${json}
    }
];
`;
fs.writeFileSync(targetFile, newCode);
console.log("Restored galleries.ts from JSON successfully.");
