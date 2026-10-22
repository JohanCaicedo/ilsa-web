/**
 * Centralized Gallery Configuration for /nosotros page
 * Extracted from src/pages/nosotros/index.astro
 */

export interface GallerySlide {
    /** Image source path */
    src: string;
    /** Alt text for accessibility */
    alt: string;
}

export interface GalleryConfig {
    /** Unique identifier for the gallery */
    id: string;
    /** Display name for the gallery */
    name: string;
    /** Array of slide configurations */
    slides: GallerySlide[];
    /** Default autoplay delay in ms */
    autoplayDelay?: number;
}

export const galerias: GalleryConfig[] = [
    {
        id: "hero",
        name: "Hero - Territorio y Naturaleza",
        slides: [
            { src: "/images/gallery/Nosotros (5).webp", alt: "Territorio y Naturaleza" },
            { src: "/images/gallery/Nosotros (6).webp", alt: "Territorio y Naturaleza" },
            { src: "/images/gallery/Nosotros (7).webp", alt: "Territorio y Naturaleza" },
            { src: "/images/gallery/Nosotros (12).webp", alt: "Territorio y Naturaleza" },
            { src: "/images/gallery/Nosotros (14).webp", alt: "Territorio y Naturaleza" },
        ],
        autoplayDelay: 4000,
    },
    {
        id: "geo",
        name: "Geográfica - Ubicación en América Latina",
        slides: [
            { src: "/images/gallery/HomeGalery (1).webp", alt: "Ubicación Geográfica ILSA" },
            { src: "/images/gallery/Nosotros (1).webp", alt: "Ubicación Geográfica ILSA" },
            { src: "/images/gallery/Nosotros (8).webp", alt: "Ubicación Geográfica ILSA" },
            { src: "/images/gallery/Nosotros (15).webp", alt: "Ubicación Geográfica ILSA" },
        ],
        autoplayDelay: 4000,
    },
    {
        id: "mission",
        name: "Misión - Trabajo Comunitario",
        slides: [
            { src: "/images/gallery/HomeGalery (2).webp", alt: "Trabajo comunitario de ILSA con movimientos sociales" },
            { src: "/images/gallery/Nosotros (2).webp", alt: "Trabajo comunitario de ILSA con movimientos sociales" },
            { src: "/images/gallery/Nosotros (9).webp", alt: "Trabajo comunitario de ILSA con movimientos sociales" },
            { src: "/images/gallery/HomeGalery (6).webp", alt: "Trabajo comunitario de ILSA con movimientos sociales" },
        ],
        autoplayDelay: 4000,
    },
    {
        id: "vision",
        name: "Visión - Territorios y Comunidades",
        slides: [
            { src: "/images/gallery/HomeGalery (3).webp", alt: "Territorios y comunidades que defiende ILSA" },
            { src: "/images/gallery/Nosotros (3).webp", alt: "Territorios y comunidades que defiende ILSA" },
            { src: "/images/gallery/Nosotros (10).webp", alt: "Territorios y comunidades que defends ILSA" },
            { src: "/images/gallery/Nosotros (13).webp", alt: "Territorios y comunidades que defends ILSA" },
        ],
        autoplayDelay: 4000,
    },
    {
        id: "campos",
        name: "Campos de Acción - Intervención Territorial",
        slides: [
            { src: "/images/gallery/HomeGalery (4).webp", alt: "Campos de acción e intervención territorial de ILSA" },
            { src: "/images/gallery/HomeGalery (5).webp", alt: "Campos de acción e intervención territorial de ILSA" },
            { src: "/images/gallery/Nosotros (4).webp", alt: "Campos de acción e intervención territorial de ILSA" },
            { src: "/images/gallery/Nosotros (11).webp", alt: "Campos de acción e intervención territorial de ILSA" },
        ],
        autoplayDelay: 4000,
    },
];

/**
 * Helper to get gallery by ID
 */
export function getGalleryById(id: string): GalleryConfig | undefined {
    return galerias.find((g) => g.id === id);
}

/**
 * Helper to extract just the image src array for AutoSlider component
 */
export function getGallerySlides(id: string): string[] {
    const gallery = getGalleryById(id);
    return gallery?.slides.map((s) => s.src) ?? [];
}