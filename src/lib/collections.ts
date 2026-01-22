export interface CollectionConfig {
    title: string;
    wpCategorySlug: string;
    description?: string;
}

export const collectionsConfig: Record<string, CollectionConfig> = {
    "archivo-historico": {
        title: "Archivo Histórico",
        wpCategorySlug: "archivo-historico", // Verify if -publicaciones suffix is needed
    },
    "coediciones": {
        title: "Coediciones",
        wpCategorySlug: "coediciones",
    },
    "derecho-y-liberacion": {
        title: "Derecho y Liberación",
        wpCategorySlug: "derecho-y-liberacion",
    },
    "en-clave-de-sur": {
        title: "En Clave de Sur",
        wpCategorySlug: "en-clave-de-sur",
    },
    "revista-el-otro-derecho": {
        title: "Revista El Otro Derecho",
        wpCategorySlug: "revista-el-otro-derecho-publicaciones", // Explicit per user request
    },
    "otras-publicaciones": {
        title: "Otras Publicaciones",
        wpCategorySlug: "otras-publicaciones",
    },
    "textos-de-aqui-y-ahora": {
        title: "Textos de Aquí y Ahora",
        wpCategorySlug: "textos-de-aqui-y-ahora",
    },
    "utiles-para-conocer-y-actuar": {
        title: "Útiles para Conocer y Actuar",
        wpCategorySlug: "utiles-para-conocer-y-actuar",
    },
};
