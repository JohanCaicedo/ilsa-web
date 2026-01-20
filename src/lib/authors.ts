export interface AuthorProfile {
  name: string;
  profileImage: string;
  avatarImage: string;
  shortBio: string;
  fullBio: string;
  xUrl?: string;
  xHandle?: string;
}

export const authorsConfig: Record<string, AuthorProfile> = {
  "freddy-ordonez-gomez": {
    name: "Freddy Ordóñez Gómez",
    profileImage: "https://api.ilsa.org.co/wp-content/uploads/2022/08/Freddy-Recorte-scaled.jpg.webp", // PON TU URL AQUÍ
    avatarImage: "https://api.ilsa.org.co/wp-content/uploads/2022/08/Freddy-Recorte-scaled.jpg.webp",    // PON TU URL AQUÍ
    shortBio: "Investigador y presidente de ILSA. Integrante del Centro de Pensamiento Amazonias (CEPAM)",
    fullBio: "Colombia. Abogado, Especialista en Epistemologías del Sur, Magister en Derecho con profundización en Derechos Humanos y DIH, y estudiante del doctorado en Derecho de la Universidad Libre. Investigador desde 2007 del Instituto Latinoamericano para una Sociedad y un Derecho Alternativos (ILSA) y desde 2017 presidente de su junta directiva. Integrante del grupo de investigación Historia, Ambiente y Política; del grupo de trabajo de Clacso Pensamientos jurídicos críticos y conflictos sociopolíticos; y del Centro de Pensamiento Amazonía, CEPAM. Es profesor de la maestría en Derechos Humanos y Gobernanza de la Universidad Cooperativa de Colombia (Pasto) y docente ocasional del pregrado en Derecho de la Universidad Nacional de Colombia y de posgrado en la Universidad Autónoma de Colombia. Es columnista de Ámbito Jurídico y de la revista Raya.",
    xUrl: "https://x.com/freddy_ordonez",
    xHandle: "@freddy_ordonez"
  },
  "boaventura-de-sousa-santos": {
    name: "Boaventura de Sousa Santos",
    profileImage: "https://api.ilsa.org.co/wp-content/uploads/2021/11/boaventura.jpg", // PON TU URL AQUÍ
    avatarImage: "https://ilsa.org.co/wp-content/uploads/revslider/slider-4/boaventura-300x290.jpg.webp",    // PON TU URL AQUÍ
    shortBio: "Académico portugués. Doctor en sociología, catedrático de la Facultad de Economía y director del Centro de Estudios Sociales de la Universidad de Coímbra. Profesor distinguido de la Universidad de Wisconsin-Madison.",
    fullBio: "Boaventura de Sousa Santos es catedrático emérito de Sociología y director del Centro de Estudios Sociales de la Universidad de Coimbra, así como Distinguished Legal Scholar en la Universidad de Wisconsin-Madison. Bajo el sello editorial ILSA ha publicado: Estado, derecho y luchas Sociales (1991); La globalización del derecho. Los nuevos caminos de la regulación y la emancipación (1998) (coedición con la Facultad de Derecho, Ciencias Políticas y Sociales de la Universidad Nacional de Colombia); La caída del Angelus Novus: ensayos para una nueva teoría social y una nueva práctica política (2003) (coedición con la Facultad de Derecho, Ciencias Políticas y Sociales de la Universidad Nacional de Colombia); Democracia y participación. El ejemplo del presupuesto participativo de Porto Alegre (2005); El milenio huérfano. Ensayos para una nueva cultura política (2005, 2011) (coedición con Trotta); Sociología Jurídica Crítica. Para un nuevo sentido común en el derecho (2009); Sociología Jurídica Crítica. Para un nuevo sentido común en el derecho (2009) (coedición con Trotta); y Las bifurcaciones del orden. Revolución, ciudad, campo e indignación (2018) (coedición ILSA, Siglo del Hombre y Trotta).",
    xUrl: "",
    xHandle: ""
  },
  "carlos-federico-mares": {
    name: "Carlos Federico Mares",
    profileImage: "https://ilsa.org.co/wp-content/uploads/2021/02/placeholder.jpg",
    avatarImage: "https://ilsa.org.co/wp-content/uploads/2021/02/placeholder.jpg",
    shortBio: "Jurista y académico.",
    fullBio: "Biografía pendiente...",
    xUrl: "",
    xHandle: ""
  },
  "consuelo-quattrocchi": {
    name: "Consuelo Quattrocchi",
    profileImage: "https://ilsa.org.co/wp-content/uploads/2021/02/placeholder.jpg",
    avatarImage: "https://ilsa.org.co/wp-content/uploads/2021/02/placeholder.jpg",
    shortBio: "Investigadora.",
    fullBio: "Biografía pendiente...",
    xUrl: "",
    xHandle: ""
  },
  "german-burgos-silva": {
    name: "Germán Burgos Silva",
    profileImage: "https://ilsa.org.co/wp-content/uploads/2021/02/placeholder.jpg",
    avatarImage: "https://ilsa.org.co/wp-content/uploads/2021/02/placeholder.jpg",
    shortBio: "Investigador.",
    fullBio: "Biografía pendiente...",
    xUrl: "",
    xHandle: ""
  },
  "liliana-estupinan-achury": {
    name: "Liliana Estupiñán Achury",
    profileImage: "https://ilsa.org.co/wp-content/uploads/2021/02/placeholder.jpg",
    avatarImage: "https://ilsa.org.co/wp-content/uploads/2021/02/placeholder.jpg",
    shortBio: "Académica.",
    fullBio: "Biografía pendiente...",
    xUrl: "",
    xHandle: ""
  },
  "mauricio-chamorro-rosero": {
    name: "Mauricio Chamorro Rosero",
    profileImage: "https://ilsa.org.co/wp-content/uploads/2021/02/placeholder.jpg",
    avatarImage: "https://ilsa.org.co/wp-content/uploads/2021/02/placeholder.jpg",
    shortBio: "Investigador.",
    fullBio: "Biografía pendiente...",
    xUrl: "",
    xHandle: ""
  }
};

export const defaultAuthor: AuthorProfile = {
  name: "Instituto ILSA",
  profileImage: "https://ilsa.org.co/wp-content/uploads/2021/02/placeholder.jpg",
  avatarImage: "https://ilsa.org.co/wp-content/uploads/2021/02/placeholder.jpg",
  shortBio: "Investigación y acción jurídica popular.",
  fullBio: "El Instituto Latinoamericano para una Sociedad y un Derecho Alternativos (ILSA) trabaja desde 1978..."
};