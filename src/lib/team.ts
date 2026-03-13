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
        image: "/images/perfiles/Maria-E-Foto.webp",
        bio: "Activista feminista y defensora de los derechos humanos.",
        fullDescription: `Activista Feminista, con una trayectoria de más de 50 años en defensa de los derechos humanos y los derechos de las mujeres. Maestra, licenciada en Ciencias Sociales con énfasis en Historia de la Universidad Pedagógica Nacional, con estudios sobre Derecho Internacional de Derechos Humanos y DIH en el Instituto Rene Cassin, Estrasburgo (Francia), Becaria del Instituto Interamericano de Derechos Humanos, Mujeres y conﬂictos armados, género y políticas públicas, entre otros muchos. Con 30 años vinculada al Instituto Latinoamericano para una Sociedad y un Derecho Alternativos –ILSA, como investigadora en el campo de derecho humanos y derechos de las mujeres y directora ejecutiva (2019- agosto 2025).

Con amplia experiencia de años compartidos con organizaciones de mujeres, redes y plataformas feministas, con el movimiento social de mujeres, defensoras de derechos humanos, sociales y comunitarias, población LGBTI, el Movimiento Mujeres por la Paz, el Tribunal de Mujeres Tejiendo Redes para la exigibilidad de los DESC, el derecho a la tierra y el territorio, la Red DESC y el grupo de Trabajo Mujeres y DESC, el movimiento social de Madres Comunitarias, sus derechos labores y sociales; la Mesa de Trabajo Mujer y Conﬂicto Armado, la Mesa Nacional de seguimiento al Auto 092, el Grupo Pro Reparación Integral, el Fondo para ayudas de emergencia y fortalecimiento organizacional en protección y autoprotección –FFP, En los escenarios de negociación de política entre las FARC –EP y el Gobierno Colombiano, el Acuerdo Final para la terminación del conﬂicto armado y el seguimiento al Acuerdo; Comisionada Nacional de Paz en representación de las Mujeres en el tema de Participación Política, Punto 2.2. Del Acuerdo, integra la Cumbre de Mujeres y Paz en representación del Movimiento de Mujeres por la Paz.

En el relacionamiento con mujeres y sus procesos organizativos, ha contribuido al fortalecimiento de su liderazgo social y político, su participación en cargos de representación política, en los planes y programas de desarrollo y políticas públicas de igualdad y equidad para las mujeres.

Fue reconocida el año 2013 por su trabajo en defensa de los derechos humanos y derechos de las mujeres por la Agencia de cooperación española AECID como una de las mujeres “Colombianas que cambian el Mundo”, por el Colectivo de Abogados José Alvear Restrepo y el Premio Nacional de Derechos por “el valor, la dignidad e indeclinable lucha por la justicia y la defensa de los Derechos Humanos” y por las Agencias Internacionales de Derechos Humanos con la nominación al Premio Nacional a la Defensa de los Derechos Humanos en Colombia, versión 2013, 2021 en la categoría de a “Toda una vida”. Premio Nacional a toda una vida dedicada a la defensa de los derechos humanos de las mujeres en Colombia 2022. Distinción anual 2019 en la categoría de Género y Diversidad Sexual, Universidad Pedagógica Nacional. Premio Derechos Humanos 2023 a toda una vida. Movimiento feminista y de mujeres en Colombia. Y toda la experiencia y conocimientos que no quedan escritos en la memoria, pero que han servido para mantener las utopías de un mundo sin violencias hacia las mujeres.`,
    },
    {
        id: "julio-gaitan-bohorquez",
        name: "Julio Gaitán Bohórquez",
        role: "Vocal",
        image: "/images/perfiles/Julio-Gaitán-1.webp",
        bio: "Director del ISUR y profesor de derecho constitucional.",
        fullDescription: "Julio Gaitán Bohórquez es director del Centro de Internet y Sociedad de la Universidad del Rosario -ISUR- y Profesor Titular del Área de derecho constitucional. Fue director del Programa de Doctorado en Derecho. Abogado de la Universidad del Rosario, Magíster en Derecho Público de la Universidad Autónoma de Barcelona y Doctor por la Universidad de Lecce – Italia. Ha sido investigador visitante en el Instituto Max Planck de Frankfurt, en la Universidad de California en Berkeley y en American University, y profesor en la Universidad Autónoma de Barcelona y en la Universidad Andina Simón Bolívar, de Quito. Fue Magistrado Auxiliar y Conjuez de la Corte Constitucional Colombiana y actualmente es Conjuez en la Jurisdicción Especial para la Paz. Coordinó el Área de Memoria Histórica del Centro Internacional para la Justicia Transicional en Colombia.",
    },
];
