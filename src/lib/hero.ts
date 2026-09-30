// Definimos la interfaz aquí mismo
export interface HeroSlideData {
    title: string;
    excerpt: string;
    image: string;
    link: string;
    badge?: string;
    ctaText?: string;
}

export const heroSlidesConfig: HeroSlideData[] = [
    {
        title: "Comunicado II Encuentro de Territorialidades Campesinas",
        excerpt: "Comunicado a la opinión pública nacional e internacional, a las autoridades gubernamentales, a la Rama Judicial y a los sectores populares de Colombia.",
        image: "https://api.ilsa.org.co/wp-content/uploads/2026/09/Cominicado-II-Encuentro-de-territorialidades-campesinas.webp",
        link: "/noticias/especiales/comunicado-segundo-encuentro-territorialidades-campesinas",
        badge: "Comunicado",
        ctaText: "Leer comunicado"
    },
    {
        title: "La Fête de l’Humanité 2026",
        excerpt: "Tres días de cultura, debate político y encuentro popular de la mano de APDH Colombie e ILSA.",
        image: "/images/Fête de l’Humanité/Fête de l’Humanité (1).jpeg",
        link: "/noticias/especiales/fete-de-lhumanite",
        badge: "Especial",
        ctaText: "Ver artículo y galería"
    },
    {
        title: "El Acuerdo Final de Paz, diez años después",
        excerpt: "Avances, resistencias y proyecciones",
        image: "https://api.ilsa.org.co/wp-content/uploads/2026/09/El-Acuerdo-Final-de-Paz-diez-anos-despues.webp",
        link: "https://ilsa.org.co/actividades/acuerdo-final-de-paz-diez-anos-despues/",
        badge: "Seminario",
        ctaText: "Ver programación"
    },

    {
        title: "Justicia climática feminista",
        excerpt: "La urgencia de una justicia climática feminista ante el avance de las ultraderechas",
        image: "https://api.ilsa.org.co/wp-content/uploads/2026/07/Portada-03.webp",
        link: "https://ilsa.org.co/2026/07/justicia-climatica-feminista-ultraderechas/",
        badge: "Análisis",
        ctaText: "Leer análisis"
    },
    {
        title: "Galería de la memoria del estallido social",
        excerpt: "A cinco años del estallido, la comunicación sigue siendo un acto político.",
        image: "https://api.ilsa.org.co/wp-content/uploads/2026/08/Convocatoria-Galeria-de-la-memoria-Banner.webp",
        link: "/noticias/especiales/convocatoria-28a",
        badge: "Convocatoria",
        ctaText: "Ver convocatoria"
    },
    {
        title: "Voces en movimiento",
        excerpt: "Promovemos el pensamiento crítico y el acompañamiento a movimientos sociales en América Latina.",
        image: "https://api.ilsa.org.co/wp-content/uploads/2026/01/Voces-en-movimiento-Destacada.webp",
        link: "/Voces-en-movimiento",
        badge: "Mujeres",
        ctaText: "Conoce más"
    },
    {
        title: "Jurimprudencias",
        excerpt: "Retomamos el legado crítico de 1990 en formato podcast. Un espacio sonoro para repensar el derecho alternativo y la teoría jurídica.",
        image: "https://api.ilsa.org.co/wp-content/uploads/2026/01/Slider-Podcast.webp",
        link: "https://open.spotify.com/show/1QUNFi8S1z16xZpU4ZIpSa",
        badge: "Podcast",
        ctaText: "Escucha ahora"
    },

];
