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
        title: "9 de abril",
        excerpt: "Memoria, justicia y compromiso con las víctimas",
        image: "/images/hero-home/Home-9A.jpg",
        link: "https://ilsa.org.co/2026/04/dia-nacional-victimas-colombia/",
        badge: "Especial",
        ctaText: "Leer más"
    },
    {
        title: "<span class='text-[0.7em] leading-tight'>Dificultades y Desafíos<br/>de la Reforma Rural Integral</span>",
        excerpt: "Revive el diálogo histórico entre el Gobierno Nacional, el movimiento social y la academia en el marco de la ICARRD+20 en Cartagena.",
        image: "/images/hero-home/Dificultades y Desafíos.webp",
        link: "/noticias/especiales/cartagena",
        badge: "Evento",
        ctaText: "Ver resumen y galería"
    },
    {
        title: "Dossiê",
        excerpt: "Pesquisas em advocacia popular na America Latina",
        image: "/images/hero-home/cover_issue_3245_pt_BR.webp",
        link: "https://api.ilsa.org.co/2025/11/investigacion-abogacia-popular-latinoamerica/",
        badge: "Publicación",
        ctaText: "Leer Publicación"
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
    }
];
