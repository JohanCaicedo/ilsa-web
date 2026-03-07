export interface TeamMember {
    id: string;
    name: string;
    role: string;
    image: string;
    bio: string; // Short bio for card
    fullDescription: string; // Long bio for modal
    xUrl?: string;
}

export const teamData: TeamMember[] = [
    {
        id: "freddy-ordonez-gomez",
        name: "Freddy Ordóñez Gómez",
        role: "Director Ejecutivo",
        image: "https://api.ilsa.org.co/wp-content/uploads/2022/08/Freddy-Recorte-scaled.jpg.webp",
        bio: "Investigador y presidente de ILSA. Integrante del Centro de Pensamiento Amazonias (CEPAM).",
        fullDescription: `Investigador y actual presidente del Instituto Latinoamericano para una Sociedad y un Derecho Alternativos (ILSA). Es antropólogo de la Universidad del Cauca y Magíster en Ciencia Política de la Universidad de los Andes.
        
        Su trabajo se ha centrado en el estudio de los conflictos socioambientales, los derechos de los pueblos indígenas y las políticas extractivas en la región amazónica. Integrante activo del Centro de Pensamiento Amazonias (CEPAM), desde donde promueve la defensa territorial y la autonomía de las comunidades locales.`,
        xUrl: "https://x.com/freddy_ordonez",
    },
    {
        id: "annette-pearson",
        name: "Annette Pearson",
        role: "Asesora de Dirección",
        image: "/person_place_holder.webp",
        bio: "Experta en cooperación internacional y gestión de proyectos sociales.",
        fullDescription: "Especialista en cooperación internacional, con más de 15 años de experiencia liderando proyectos de desarrollo social en América Latina. Ha trabajado en la articulación de redes de apoyo para organizaciones de base y en la formulación de estrategias para la sostenibilidad institucional.",
    },
    {
        id: "francisco-javier-toloza",
        name: "Francisco Javier Toloza",
        role: "Asesor de Dirección",
        image: "/person_place_holder.webp",
        bio: "Politólogo y Magister en Sociología, con énfasis en movimientos sociales.",
        fullDescription: "Politólogo de la Universidad Nacional y Magíster en Sociología. Su trayectoria académica y profesional ha estado vinculada al análisis de los movimientos sociales y la participación política en Colombia. Asesor en temas de paz y resolución de conflictos.",
    },
    {
        id: "german-alfonso-palacio",
        name: "Germán Alfonso Palacio",
        role: "Asesor de Dirección",
        image: "/person_place_holder.webp",
        bio: "Abogado e historiador (PhD). Profesor universitario y autor.",
        fullDescription: "Abogado e historiador con doctorado en Historia Latinoamericana. Es profesor titular en varias universidades de la región y autor de múltiples libros sobre historia del derecho y ecología política en la Amazonía.",
    },
    {
        id: "ricardo-prestes-pazello",
        name: "Ricardo Prestes Pazello",
        role: "Asesor de Dirección",
        image: "/person_place_holder.webp",
        bio: "Docente de sociología jurídica y derechos humanos.",
        fullDescription: "Docente e investigador brasileño especializado en sociología jurídica y teoría crítica del derecho. Ha colaborado con movimientos sociales en Brasil y Colombia, aportando desde la academia a la construcción de herramientas jurídicas para la defensa popular.",
    },
    {
        id: "yina-villamil-velasquez",
        name: "Yina Villamil Velásquez",
        role: "Asesora de Dirección",
        image: "/person_place_holder.webp",
        bio: "Defensora de derechos humanos y líder feminista.",
        fullDescription: "Defensora de derechos humanos con amplia experiencia en el acompañamiento a víctimas y comunidades vulnerables. Líder feminista comprometida con la transversalización del enfoque de género en las políticas públicas y en la agenda de paz.",
    },
];

export const boardData: TeamMember[] = [
    {
        id: "cristina-luna-calpa",
        name: "Cristina Luna Calpa",
        role: "Presidenta",
        image: "/person_place_holder.webp",
        bio: "Liderazgo estratégico y representación institucional.",
        fullDescription: "Abogada y activista con una destacada trayectoria en la defensa de los derechos territoriales.",
    },
    {
        id: "ismael-diaz-barbosa",
        name: "Ismael Díaz Barbosa",
        role: "Vicepresidente",
        image: "/person_place_holder.webp",
        bio: "Apoyo a la dirección y coordinación política.",
        fullDescription: "Líder social con experiencia en procesos organizativos campesinos.",
    },
    {
        id: "edwin-de-los-rios",
        name: "Edwin de los Ríos Jaramillo",
        role: "Secretario",
        image: "/person_place_holder.webp",
        bio: "Gestión administrativa y actas institucionales.",
        fullDescription: "Administrador con enfoque en gestión de entidades sin ánimo de lucro.",
    },
    {
        id: "maria-eugenia-ramirez",
        name: "Maria Eugenia Ramírez Brisneda",
        role: "Vocal",
        image: "/person_place_holder.webp",
        bio: "Vigilancia y control de procesos estratégicos.",
        fullDescription: "Investigadora social y asesora en temas de género.",
    },
    {
        id: "julio-gaitan-bohorquez",
        name: "Julio Gaitán Bohórquez",
        role: "Vocal",
        image: "/person_place_holder.webp",
        bio: "Asesoría experta y visión académica.",
        fullDescription: "Académico reconocido en el campo del derecho constitucional.",
    },
];
