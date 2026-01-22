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
        title: "Derecho y Sociedad Alternativa",
        excerpt: "Construyendo un sistema jurídico emancipador desde el Sur Global para la defensa de los derechos humanos y la justicia social.",
        image: "/assets/hero_justice.png",
        link: "/nosotros",
        badge: "Nuestra Misión",
        ctaText: "Conoce ILSA"
    },
    {
        title: "Investigación y Acción Jurídica",
        excerpt: "Promovemos el pensamiento crítico y el acompañamiento a movimientos sociales en América Latina.",
        image: "/assets/hero_research.png",
        link: "/publicaciones",
        badge: "Enfoque",
        ctaText: "Ver Publicaciones"
    },
    {
        title: "Redes de Colaboración",
        excerpt: "Tejiendo alianzas estratégicas para el fortalecimiento de la sociedad civil y la democracia.",
        image: "/assets/hero_community.png",
        link: "/contacto",
        badge: "Comunidad",
        ctaText: "Únete a la Red"
    }
];
