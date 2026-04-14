// src/lib/galleries.ts

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
        albums: [
    {
        "id": "visita-chita-julio",
        "title": "Visita a huertas",
        "location": "Chita",
        "date": "Julio",
        "images": [
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-1.webp",
                "alt": "Visita a huertas - Imagen 1"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-2.webp",
                "alt": "Visita a huertas - Imagen 2"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-3.webp",
                "alt": "Visita a huertas - Imagen 3"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-4.webp",
                "alt": "Visita a huertas - Imagen 4"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-5.webp",
                "alt": "Visita a huertas - Imagen 5"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-6.webp",
                "alt": "Visita a huertas - Imagen 6"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-7.webp",
                "alt": "Visita a huertas - Imagen 7"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-8.webp",
                "alt": "Visita a huertas - Imagen 8"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-9.webp",
                "alt": "Visita a huertas - Imagen 9"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-10.webp",
                "alt": "Visita a huertas - Imagen 10"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-11.webp",
                "alt": "Visita a huertas - Imagen 11"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-12.webp",
                "alt": "Visita a huertas - Imagen 12"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-13.webp",
                "alt": "Visita a huertas - Imagen 13"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-14.webp",
                "alt": "Visita a huertas - Imagen 14"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-15.webp",
                "alt": "Visita a huertas - Imagen 15"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-16.webp",
                "alt": "Visita a huertas - Imagen 16"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-17.webp",
                "alt": "Visita a huertas - Imagen 17"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-18.webp",
                "alt": "Visita a huertas - Imagen 18"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-19.webp",
                "alt": "Visita a huertas - Imagen 19"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-20.webp",
                "alt": "Visita a huertas - Imagen 20"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-21.webp",
                "alt": "Visita a huertas - Imagen 21"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-22.webp",
                "alt": "Visita a huertas - Imagen 22"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-23.webp",
                "alt": "Visita a huertas - Imagen 23"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-24.webp",
                "alt": "Visita a huertas - Imagen 24"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-25.webp",
                "alt": "Visita a huertas - Imagen 25"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-26.webp",
                "alt": "Visita a huertas - Imagen 26"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-27.webp",
                "alt": "Visita a huertas - Imagen 27"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-28.webp",
                "alt": "Visita a huertas - Imagen 28"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-29.webp",
                "alt": "Visita a huertas - Imagen 29"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-30.webp",
                "alt": "Visita a huertas - Imagen 30"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-31.webp",
                "alt": "Visita a huertas - Imagen 31"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-32.webp",
                "alt": "Visita a huertas - Imagen 32"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-33.webp",
                "alt": "Visita a huertas - Imagen 33"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-34.webp",
                "alt": "Visita a huertas - Imagen 34"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-35.webp",
                "alt": "Visita a huertas - Imagen 35"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-36.webp",
                "alt": "Visita a huertas - Imagen 36"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-37.webp",
                "alt": "Visita a huertas - Imagen 37"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-38.webp",
                "alt": "Visita a huertas - Imagen 38"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-39.webp",
                "alt": "Visita a huertas - Imagen 39"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-40.webp",
                "alt": "Visita a huertas - Imagen 40"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-41.webp",
                "alt": "Visita a huertas - Imagen 41"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-42.webp",
                "alt": "Visita a huertas - Imagen 42"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-43.webp",
                "alt": "Visita a huertas - Imagen 43"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-44.webp",
                "alt": "Visita a huertas - Imagen 44"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-45.webp",
                "alt": "Visita a huertas - Imagen 45"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-46.webp",
                "alt": "Visita a huertas - Imagen 46"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-47.webp",
                "alt": "Visita a huertas - Imagen 47"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-48.webp",
                "alt": "Visita a huertas - Imagen 48"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-49.webp",
                "alt": "Visita a huertas - Imagen 49"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-50.webp",
                "alt": "Visita a huertas - Imagen 50"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-51.webp",
                "alt": "Visita a huertas - Imagen 51"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-52.webp",
                "alt": "Visita a huertas - Imagen 52"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-53.webp",
                "alt": "Visita a huertas - Imagen 53"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-54.webp",
                "alt": "Visita a huertas - Imagen 54"
            },
            {
                "src": "/images/multimedia-galeria/visita-chita-julio/visita-chita-julio-55.webp",
                "alt": "Visita a huertas - Imagen 55"
            }
        ]
    },
    {
        "id": "aprestamiento-huertas-abril-2025",
        "title": "Aprestamiento de tierra para huertas",
        "location": "Chita y Socotá",
        "date": "Abril 2025",
        "images": [
            {
                "src": "/images/multimedia-galeria/aprestamiento-huertas-abril-2025/aprestamiento-huertas-abril-2025-1.webp",
                "alt": "Aprestamiento de tierra para huertas - Imagen 1"
            },
            {
                "src": "/images/multimedia-galeria/aprestamiento-huertas-abril-2025/aprestamiento-huertas-abril-2025-2.webp",
                "alt": "Aprestamiento de tierra para huertas - Imagen 2"
            },
            {
                "src": "/images/multimedia-galeria/aprestamiento-huertas-abril-2025/aprestamiento-huertas-abril-2025-3.webp",
                "alt": "Aprestamiento de tierra para huertas - Imagen 3"
            },
            {
                "src": "/images/multimedia-galeria/aprestamiento-huertas-abril-2025/aprestamiento-huertas-abril-2025-4.webp",
                "alt": "Aprestamiento de tierra para huertas - Imagen 4"
            }
        ]
    },
    {
        "id": "planton-socha-capacitacion-feb-2025",
        "title": "Plantón contra minería y capacitación",
        "location": "Socha, Chita y Socotá",
        "date": "Febrero 2025",
        "images": [
            {
                "src": "/images/multimedia-galeria/planton-socha-capacitacion-feb-2025/planton-socha-capacitacion-feb-2025-1.webp",
                "alt": "Plantón contra minería y capacitación - Imagen 1"
            },
            {
                "src": "/images/multimedia-galeria/planton-socha-capacitacion-feb-2025/planton-socha-capacitacion-feb-2025-2.webp",
                "alt": "Plantón contra minería y capacitación - Imagen 2"
            },
            {
                "src": "/images/multimedia-galeria/planton-socha-capacitacion-feb-2025/planton-socha-capacitacion-feb-2025-3.webp",
                "alt": "Plantón contra minería y capacitación - Imagen 3"
            },
            {
                "src": "/images/multimedia-galeria/planton-socha-capacitacion-feb-2025/planton-socha-capacitacion-feb-2025-4.webp",
                "alt": "Plantón contra minería y capacitación - Imagen 4"
            },
            {
                "src": "/images/multimedia-galeria/planton-socha-capacitacion-feb-2025/planton-socha-capacitacion-feb-2025-5.webp",
                "alt": "Plantón contra minería y capacitación - Imagen 5"
            },
            {
                "src": "/images/multimedia-galeria/planton-socha-capacitacion-feb-2025/planton-socha-capacitacion-feb-2025-6.webp",
                "alt": "Plantón contra minería y capacitación - Imagen 6"
            },
            {
                "src": "/images/multimedia-galeria/planton-socha-capacitacion-feb-2025/planton-socha-capacitacion-feb-2025-7.webp",
                "alt": "Plantón contra minería y capacitación - Imagen 7"
            },
            {
                "src": "/images/multimedia-galeria/planton-socha-capacitacion-feb-2025/planton-socha-capacitacion-feb-2025-8.webp",
                "alt": "Plantón contra minería y capacitación - Imagen 8"
            },
            {
                "src": "/images/multimedia-galeria/planton-socha-capacitacion-feb-2025/planton-socha-capacitacion-feb-2025-9.webp",
                "alt": "Plantón contra minería y capacitación - Imagen 9"
            },
            {
                "src": "/images/multimedia-galeria/planton-socha-capacitacion-feb-2025/planton-socha-capacitacion-feb-2025-10.webp",
                "alt": "Plantón contra minería y capacitación - Imagen 10"
            },
            {
                "src": "/images/multimedia-galeria/planton-socha-capacitacion-feb-2025/planton-socha-capacitacion-feb-2025-11.webp",
                "alt": "Plantón contra minería y capacitación - Imagen 11"
            },
            {
                "src": "/images/multimedia-galeria/planton-socha-capacitacion-feb-2025/planton-socha-capacitacion-feb-2025-12.webp",
                "alt": "Plantón contra minería y capacitación - Imagen 12"
            },
            {
                "src": "/images/multimedia-galeria/planton-socha-capacitacion-feb-2025/planton-socha-capacitacion-feb-2025-13.webp",
                "alt": "Plantón contra minería y capacitación - Imagen 13"
            },
            {
                "src": "/images/multimedia-galeria/planton-socha-capacitacion-feb-2025/planton-socha-capacitacion-feb-2025-14.webp",
                "alt": "Plantón contra minería y capacitación - Imagen 14"
            },
            {
                "src": "/images/multimedia-galeria/planton-socha-capacitacion-feb-2025/planton-socha-capacitacion-feb-2025-15.webp",
                "alt": "Plantón contra minería y capacitación - Imagen 15"
            },
            {
                "src": "/images/multimedia-galeria/planton-socha-capacitacion-feb-2025/planton-socha-capacitacion-feb-2025-16.webp",
                "alt": "Plantón contra minería y capacitación - Imagen 16"
            },
            {
                "src": "/images/multimedia-galeria/planton-socha-capacitacion-feb-2025/planton-socha-capacitacion-feb-2025-17.webp",
                "alt": "Plantón contra minería y capacitación - Imagen 17"
            },
            {
                "src": "/images/multimedia-galeria/planton-socha-capacitacion-feb-2025/planton-socha-capacitacion-feb-2025-18.webp",
                "alt": "Plantón contra minería y capacitación - Imagen 18"
            },
            {
                "src": "/images/multimedia-galeria/planton-socha-capacitacion-feb-2025/planton-socha-capacitacion-feb-2025-19.webp",
                "alt": "Plantón contra minería y capacitación - Imagen 19"
            },
            {
                "src": "/images/multimedia-galeria/planton-socha-capacitacion-feb-2025/planton-socha-capacitacion-feb-2025-20.webp",
                "alt": "Plantón contra minería y capacitación - Imagen 20"
            },
            {
                "src": "/images/multimedia-galeria/planton-socha-capacitacion-feb-2025/planton-socha-capacitacion-feb-2025-21.webp",
                "alt": "Plantón contra minería y capacitación - Imagen 21"
            },
            {
                "src": "/images/multimedia-galeria/planton-socha-capacitacion-feb-2025/planton-socha-capacitacion-feb-2025-22.webp",
                "alt": "Plantón contra minería y capacitación - Imagen 22"
            },
            {
                "src": "/images/multimedia-galeria/planton-socha-capacitacion-feb-2025/planton-socha-capacitacion-feb-2025-23.webp",
                "alt": "Plantón contra minería y capacitación - Imagen 23"
            },
            {
                "src": "/images/multimedia-galeria/planton-socha-capacitacion-feb-2025/planton-socha-capacitacion-feb-2025-24.webp",
                "alt": "Plantón contra minería y capacitación - Imagen 24"
            },
            {
                "src": "/images/multimedia-galeria/planton-socha-capacitacion-feb-2025/planton-socha-capacitacion-feb-2025-25.webp",
                "alt": "Plantón contra minería y capacitación - Imagen 25"
            },
            {
                "src": "/images/multimedia-galeria/planton-socha-capacitacion-feb-2025/planton-socha-capacitacion-feb-2025-26.webp",
                "alt": "Plantón contra minería y capacitación - Imagen 26"
            }
        ]
    },
    {
        "id": "seguimiento-huertas-nov-2025",
        "title": "Trabajo de seguimiento de huertas",
        "location": "Chita y Socotá",
        "date": "Noviembre 2025",
        "images": [
            {
                "src": "/images/multimedia-galeria/seguimiento-huertas-nov-2025/seguimiento-huertas-nov-2025-1.webp",
                "alt": "Trabajo de seguimiento de huertas - Imagen 1"
            },
            {
                "src": "/images/multimedia-galeria/seguimiento-huertas-nov-2025/seguimiento-huertas-nov-2025-2.webp",
                "alt": "Trabajo de seguimiento de huertas - Imagen 2"
            },
            {
                "src": "/images/multimedia-galeria/seguimiento-huertas-nov-2025/seguimiento-huertas-nov-2025-3.webp",
                "alt": "Trabajo de seguimiento de huertas - Imagen 3"
            },
            {
                "src": "/images/multimedia-galeria/seguimiento-huertas-nov-2025/seguimiento-huertas-nov-2025-4.webp",
                "alt": "Trabajo de seguimiento de huertas - Imagen 4"
            },
            {
                "src": "/images/multimedia-galeria/seguimiento-huertas-nov-2025/seguimiento-huertas-nov-2025-5.webp",
                "alt": "Trabajo de seguimiento de huertas - Imagen 5"
            },
            {
                "src": "/images/multimedia-galeria/seguimiento-huertas-nov-2025/seguimiento-huertas-nov-2025-6.webp",
                "alt": "Trabajo de seguimiento de huertas - Imagen 6"
            }
        ]
    },
    {
        "id": "taller-semillas-mayo-2025",
        "title": "Intercambio de semillas y bioinsumos",
        "location": "Chita y Socotá",
        "date": "Mayo 2025",
        "images": [
            {
                "src": "/images/multimedia-galeria/taller-semillas-mayo-2025/taller-semillas-mayo-2025-1.webp",
                "alt": "Intercambio de semillas y bioinsumos - Imagen 1"
            },
            {
                "src": "/images/multimedia-galeria/taller-semillas-mayo-2025/taller-semillas-mayo-2025-2.webp",
                "alt": "Intercambio de semillas y bioinsumos - Imagen 2"
            },
            {
                "src": "/images/multimedia-galeria/taller-semillas-mayo-2025/taller-semillas-mayo-2025-3.webp",
                "alt": "Intercambio de semillas y bioinsumos - Imagen 3"
            },
            {
                "src": "/images/multimedia-galeria/taller-semillas-mayo-2025/taller-semillas-mayo-2025-4.webp",
                "alt": "Intercambio de semillas y bioinsumos - Imagen 4"
            },
            {
                "src": "/images/multimedia-galeria/taller-semillas-mayo-2025/taller-semillas-mayo-2025-5.webp",
                "alt": "Intercambio de semillas y bioinsumos - Imagen 5"
            },
            {
                "src": "/images/multimedia-galeria/taller-semillas-mayo-2025/taller-semillas-mayo-2025-6.webp",
                "alt": "Intercambio de semillas y bioinsumos - Imagen 6"
            },
            {
                "src": "/images/multimedia-galeria/taller-semillas-mayo-2025/taller-semillas-mayo-2025-7.webp",
                "alt": "Intercambio de semillas y bioinsumos - Imagen 7"
            },
            {
                "src": "/images/multimedia-galeria/taller-semillas-mayo-2025/taller-semillas-mayo-2025-8.webp",
                "alt": "Intercambio de semillas y bioinsumos - Imagen 8"
            },
            {
                "src": "/images/multimedia-galeria/taller-semillas-mayo-2025/taller-semillas-mayo-2025-9.webp",
                "alt": "Intercambio de semillas y bioinsumos - Imagen 9"
            },
            {
                "src": "/images/multimedia-galeria/taller-semillas-mayo-2025/taller-semillas-mayo-2025-10.webp",
                "alt": "Intercambio de semillas y bioinsumos - Imagen 10"
            },
            {
                "src": "/images/multimedia-galeria/taller-semillas-mayo-2025/taller-semillas-mayo-2025-11.webp",
                "alt": "Intercambio de semillas y bioinsumos - Imagen 11"
            },
            {
                "src": "/images/multimedia-galeria/taller-semillas-mayo-2025/taller-semillas-mayo-2025-12.webp",
                "alt": "Intercambio de semillas y bioinsumos - Imagen 12"
            },
            {
                "src": "/images/multimedia-galeria/taller-semillas-mayo-2025/taller-semillas-mayo-2025-13.webp",
                "alt": "Intercambio de semillas y bioinsumos - Imagen 13"
            },
            {
                "src": "/images/multimedia-galeria/taller-semillas-mayo-2025/taller-semillas-mayo-2025-14.webp",
                "alt": "Intercambio de semillas y bioinsumos - Imagen 14"
            },
            {
                "src": "/images/multimedia-galeria/taller-semillas-mayo-2025/taller-semillas-mayo-2025-15.webp",
                "alt": "Intercambio de semillas y bioinsumos - Imagen 15"
            },
            {
                "src": "/images/multimedia-galeria/taller-semillas-mayo-2025/taller-semillas-mayo-2025-16.webp",
                "alt": "Intercambio de semillas y bioinsumos - Imagen 16"
            },
            {
                "src": "/images/multimedia-galeria/taller-semillas-mayo-2025/taller-semillas-mayo-2025-17.webp",
                "alt": "Intercambio de semillas y bioinsumos - Imagen 17"
            },
            {
                "src": "/images/multimedia-galeria/taller-semillas-mayo-2025/taller-semillas-mayo-2025-18.webp",
                "alt": "Intercambio de semillas y bioinsumos - Imagen 18"
            },
            {
                "src": "/images/multimedia-galeria/taller-semillas-mayo-2025/taller-semillas-mayo-2025-19.webp",
                "alt": "Intercambio de semillas y bioinsumos - Imagen 19"
            },
            {
                "src": "/images/multimedia-galeria/taller-semillas-mayo-2025/taller-semillas-mayo-2025-20.webp",
                "alt": "Intercambio de semillas y bioinsumos - Imagen 20"
            },
            {
                "src": "/images/multimedia-galeria/taller-semillas-mayo-2025/taller-semillas-mayo-2025-21.webp",
                "alt": "Intercambio de semillas y bioinsumos - Imagen 21"
            },
            {
                "src": "/images/multimedia-galeria/taller-semillas-mayo-2025/taller-semillas-mayo-2025-22.webp",
                "alt": "Intercambio de semillas y bioinsumos - Imagen 22"
            },
            {
                "src": "/images/multimedia-galeria/taller-semillas-mayo-2025/taller-semillas-mayo-2025-23.webp",
                "alt": "Intercambio de semillas y bioinsumos - Imagen 23"
            }
        ]
    }
,
            {
            "id": "mercado-campesino-sep-2005",
            "title": "Cuarto Mercado Campesino",
            "location": "Bogotá",
            "date": "Septiembre 2005",
            "images": [
            {
            "src": "/images/multimedia-galeria/mercado-campesino-sep-2005/mercado-campesino-sep-2005-1.webp",
            "alt": "Cuarto Mercado Campesino - Imagen 1"
            },
            {
            "src": "/images/multimedia-galeria/mercado-campesino-sep-2005/mercado-campesino-sep-2005-2.webp",
            "alt": "Cuarto Mercado Campesino - Imagen 2"
            },
            {
            "src": "/images/multimedia-galeria/mercado-campesino-sep-2005/mercado-campesino-sep-2005-3.webp",
            "alt": "Cuarto Mercado Campesino - Imagen 3"
            },
            {
            "src": "/images/multimedia-galeria/mercado-campesino-sep-2005/mercado-campesino-sep-2005-4.webp",
            "alt": "Cuarto Mercado Campesino - Imagen 4"
            },
            {
            "src": "/images/multimedia-galeria/mercado-campesino-sep-2005/mercado-campesino-sep-2005-5.webp",
            "alt": "Cuarto Mercado Campesino - Imagen 5"
            },
            {
            "src": "/images/multimedia-galeria/mercado-campesino-sep-2005/mercado-campesino-sep-2005-6.webp",
            "alt": "Cuarto Mercado Campesino - Imagen 6"
            },
            {
            "src": "/images/multimedia-galeria/mercado-campesino-sep-2005/mercado-campesino-sep-2005-7.webp",
            "alt": "Cuarto Mercado Campesino - Imagen 7"
            },
            {
            "src": "/images/multimedia-galeria/mercado-campesino-sep-2005/mercado-campesino-sep-2005-8.webp",
            "alt": "Cuarto Mercado Campesino - Imagen 8"
            },
            {
            "src": "/images/multimedia-galeria/mercado-campesino-sep-2005/mercado-campesino-sep-2005-9.webp",
            "alt": "Cuarto Mercado Campesino - Imagen 9"
            },
            {
            "src": "/images/multimedia-galeria/mercado-campesino-sep-2005/mercado-campesino-sep-2005-10.webp",
            "alt": "Cuarto Mercado Campesino - Imagen 10"
            },
            {
            "src": "/images/multimedia-galeria/mercado-campesino-sep-2005/mercado-campesino-sep-2005-11.webp",
            "alt": "Cuarto Mercado Campesino - Imagen 11"
            },
            {
            "src": "/images/multimedia-galeria/mercado-campesino-sep-2005/mercado-campesino-sep-2005-12.webp",
            "alt": "Cuarto Mercado Campesino - Imagen 12"
            },
            {
            "src": "/images/multimedia-galeria/mercado-campesino-sep-2005/mercado-campesino-sep-2005-13.webp",
            "alt": "Cuarto Mercado Campesino - Imagen 13"
            },
            {
            "src": "/images/multimedia-galeria/mercado-campesino-sep-2005/mercado-campesino-sep-2005-14.webp",
            "alt": "Cuarto Mercado Campesino - Imagen 14"
            },
            {
            "src": "/images/multimedia-galeria/mercado-campesino-sep-2005/mercado-campesino-sep-2005-15.webp",
            "alt": "Cuarto Mercado Campesino - Imagen 15"
            }
            ]
            }
        ]
    }
];
