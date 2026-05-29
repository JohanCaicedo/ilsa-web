export interface TeamMember {
    id: string;
    name: string;
    role: string;
    image: string;
    bio?: string; // Short bio for card
    fullDescription?: string; // Long bio for modal
    xUrl?: string;
}

export const teamData: TeamMember[] = [
    {
        id: "freddy-ordonez-gomez",
        name: "Freddy Ordóñez",
        role: "Director Ejecutivo",
        image: "https://api.ilsa.org.co/wp-content/uploads/2022/08/Freddy-Recorte-scaled.jpg.webp",
        bio: "Abogado y Magíster en Derecho, docente e investigador. Director ejecutivo de ILSA desde agosto de 2025.",
        fullDescription: "Abogado, Especialista en Epistemologías del Sur, Magister en Derecho con profundización en Derechos Humanos y DIH, y estudiante del doctorado en Derecho de la Universidad Libre. Investigador desde 2007 del Instituto Latinoamericano para una Sociedad y un Derecho Alternativos (ILSA), presidente de su junta directiva entre 2017 y julio de 2025, y su Director ejecutivo desde agosto de 2025. Integrante del grupo de investigación Historia, Ambiente y Política; del grupo de trabajo de Clacso Pensamientos jurídicos críticos y conflictos sociopolíticos; y del Centro de Pensamiento Amazonía, CEPAM. Es profesor de la maestría en Derechos Humanos y Gobernanza de la Universidad Cooperativa de Colombia (Pasto) y docente ocasional del pregrado en Derecho de la Universidad Nacional de Colombia y de posgrado en la Universidad Autónoma de Colombia. Es columnista de Ámbito Jurídico y de la revista Raya.",
        xUrl: "https://x.com/freddy_ordonez",
    },
    {
        id: "santiago-ariza",
        name: "Santiago Ariza",
        role: "Equipo de Dirección",
        image: "/person_place_holder.webp",
    },
    {
        id: "juanita-villamil",
        name: "Juanita Villamil",
        role: "Equipo de Dirección",
        image: "/person_place_holder.webp",
        bio: "Abogada feminista y defensora de DDHH.",
        fullDescription: `Mi nombre es Juanita Villamil, tengo 25 años. Soy abogada feminista de la Universidad Nacional, hija del movimiento estudiantil y luchadora incansable por una Universidad pública, gratuita y de calidad. Llevo más de 7 años caminando en la defensa popular de los Derechos Humanos y ambientales. Desde que entré a la universidad, en el 2018, comencé a caminar en el Comité de Derechos Humanos de la Universidad, perteneciente a la "Campaña Defender la Libertad es Asuntos de Todas", con quienes he puesto el cuerpo en el acompañamiento a escenarios de protesta social, denuncia y acompañamiento a víctimas de violencia policial, y la disputa por la protección a la protesta social. ¿Mi motivación? Nadie debería ser perseguido, criminalizado ni asesinado por luchar por mundos justos donde quepamos todas y todos.

Igualmente, pertenecí al colectivo Blanca Villamil, con quienes, gracias al trabajo colectivo y popular, logramos la histórica primera sentencia de la Corte Constitucional que protege el escrache y a las colectivas que acompañan denuncias de violencias basadas en género. Fui una de las fundadoras de la Mesa de Género de la facultad de Derecho, Ciencias Políticas y Sociales, y fui representante estudiantil al Comité de Asuntos de Género, donde acompañé procesos de denuncia de Violencias Basadas en Género y logramos comenzar la actualización del protocolo de prevención, atención y acompañamiento de VBG de la universidad. Pero el trabajo no está sólo en la institución, la organización colectiva de las mujeres es lo que nos llevará a la construcción de una sociedad antipatriarcal, equitativa y verdaderamente revolucionaria.

Actualmente me encuentro acabando una especialización en Derechos Humanos y Derecho Internacional Humanitario, para continuar con el ejercicio del derecho desde una perspectiva transformadora.`,
    },
    {
        id: "annette-pearson",
        name: "Annette Pearson",
        role: "Asesora de Dirección",
        image: "/person_place_holder.webp",
        bio: "",
        fullDescription: "",
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
        image: "/images/perfiles/Cristina Luna Calpa.webp",
        bio: "",
        fullDescription: "Abogada y activista con una destacada trayectoria en la defensa de los derechos territoriales.",
    },
    {
        id: "ismael-diaz-barbosa",
        name: "Ismael Díaz Barbosa",
        role: "Vicepresidente",
        image: "/images/perfiles/Ismael Díaz Barbosa.webp",
        bio: "",
        fullDescription: "",
    },
    {
        id: "edwin-de-los-rios",
        name: "Edwin de los Ríos Jaramillo",
        role: "Secretario",
        image: "/images/perfiles/Edwin de los Ríos Jaramillo.webp",
        bio: "Investigación, derechos territoriales y ruralidad.",
        fullDescription: "Sociólogo, investigador. Miembro de la junta directiva del Instituto Latinoamericano para una Sociedad y un Derecho Alternativos - ILSA. Especialista en métodos y técnicas de investigación social por el Consejo Latinoamericano de Ciencias Sociales (CLACSO) y la Facultad Latinoamericana de Ciencias Sociales (FLACSO - Brasil). Candidato a Magíster en Investigación en Ciencias sociales por la universidad de Buenos Aires (Argentina) con su trabajo de tesis: ‘Conflictos de ordenamiento y gobernanza de los terrenos comunes en el caribe colombiano: Análisis de la construcción de lo común en el proceso de gobernanza del playón comunal de la ciénaga de \"Caño Palomo\" en el municipio de San Benito Abad (Sucre)’. Con desempeño profesional en trabajos relacionados con la metodología de la investigación social aplicada, técnicas de recolección (construcción) y análisis de información en temas relacionados con la problemática rural en Colombia, la exigibilidad y la garantía de los Derechos Económicos Sociales Culturales y Ambientales (DESCA) y el restablecimiento de los derechos de la población campesina, indígena y afrodescendiente víctima del conflicto armado en Colombia. Con experiencia de trabajo en educación popular para la incidencia y exigibilidad de la garantía de los derechos humanos, y en la elaboración de material pedagógico de apoyo para la apropiación de contenidos temáticos y normativos desde la perspectiva del empoderamiento jurídico comunitario. Actualmente se desempeña como profesional de apoyo de la Secretaría Técnica Indígena de la Comisión Nacional de Territorios Indígenas (STI-CNTI) y su Observatorio de Derechos Territoriales, en las acciones de seguimiento a las políticas y los procesos de formalización, protección y restitución de los derechos territoriales de los pueblos indígenas en Colombia.",
    },
    {
        id: "maria-eugenia-ramirez",
        name: "Maria Eugenia Ramírez Brisneda",
        role: "Vocal",
        image: "/images/perfiles/Maria Eugenia Ramírez Brisneda.webp",
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
        image: "/images/perfiles/Julio Gaitán Bohórquez.webp",
        bio: "Director del ISUR y profesor de derecho constitucional.",
        fullDescription: "Julio Gaitán Bohórquez es director del Centro de Internet y Sociedad de la Universidad del Rosario -ISUR- y Profesor Titular del Área de derecho constitucional. Fue director del Programa de Doctorado en Derecho. Abogado de la Universidad del Rosario, Magíster en Derecho Público de la Universidad Autónoma de Barcelona y Doctor por la Universidad de Lecce – Italia. Ha sido investigador visitante en el Instituto Max Planck de Frankfurt, en la Universidad de California en Berkeley y en American University, y profesor en la Universidad Autónoma de Barcelona y en la Universidad Andina Simón Bolívar, de Quito. Fue Magistrado Auxiliar y Conjuez de la Corte Constitucional Colombiana y actualmente es Conjuez en la Jurisdicción Especial para la Paz. Coordinó el Área de Memoria Histórica del Centro Internacional para la Justicia Transicional en Colombia.",
    },
];

export const assemblyData: TeamMember[] = [
    {
        id: "aiden-jose-salgado",
        name: "Aiden José Salgado Cassiani",
        role: "Asamblea de Socios",
        image: "/person_place_holder.webp",
    },
    {
        id: "alba-nubia-rengifo",
        name: "Alba Nubia Rengifo",
        role: "Asamblea de Socios",
        image: "/person_place_holder.webp",
    },
    {
        id: "angel-libardo-herreno",
        name: "Ángel Libardo Herreño",
        role: "Asamblea de Socios",
        image: "/images/perfiles/Libardo.webp",
    },
    {
        id: "cesar-osorio-sanchez",
        name: "César Osorio Sánchez",
        role: "Asamblea de Socios",
        image: "/images/perfiles/César Osorio Sánchez.webp",
    },
    {
        id: "cristina-luna-calpa",
        name: "Cristina Alejandra Luna Calpa",
        role: "Asamblea de Socios",
        image: "/images/perfiles/Cristina Luna Calpa.webp",
    },
    {
        id: "edwin-de-los-rios",
        name: "Edwin De los Ríos",
        role: "Asamblea de Socios",
        image: "/images/perfiles/Edwin de los Ríos Jaramillo.webp",
    },
    {
        id: "freddy-ordonez-gomez",
        name: "Freddy Ordóñez Gómez",
        role: "Asamblea de Socios",
        image: "https://api.ilsa.org.co/wp-content/uploads/2022/08/Freddy-Recorte-scaled.jpg.webp",
    },
    {
        id: "gloria-patricia-lopera",
        name: "Gloria Patricia Lopera Mesa",
        role: "Asamblea de Socios",
        image: "/person_place_holder.webp",
    },
    {
        id: "ismael-diaz",
        name: "Ismael Díaz",
        role: "Asamblea de Socios",
        image: "/images/perfiles/Ismael Díaz Barbosa.webp",
    },
    {
        id: "julio-gaitan-bohorquez",
        name: "Julio Gaitán Bohórquez",
        role: "Asamblea de Socios",
        image: "/images/perfiles/Julio Gaitán Bohórquez.webp",
    },
    {
        id: "luciana-bercovich",
        name: "Luciana Bercovich",
        role: "Asamblea de Socios",
        image: "/person_place_holder.webp",
    },
    {
        id: "luis-alberto-tumina",
        name: "Luis Alberto Tumiñá Ussa",
        role: "Asamblea de Socios",
        image: "/person_place_holder.webp",
    },
    {
        id: "maria-eugenia-ramirez",
        name: "María Eugenia Ramírez Brisneda",
        role: "Asamblea de Socios",
        image: "/images/perfiles/Maria Eugenia Ramírez Brisneda.webp",
    },
    {
        id: "raymundo-espinoza",
        name: "Raymundo Espinoza Hernández",
        role: "Asamblea de Socios",
        image: "/person_place_holder.webp",
    },
];
