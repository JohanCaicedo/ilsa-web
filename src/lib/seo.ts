export interface SeoData {
    title?: string;
    metaDesc?: string;
    canonical?: string;
    opengraphTitle?: string;
    opengraphDescription?: string;
    opengraphImage?: {
        sourceUrl: string;
    };
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: {
        sourceUrl: string;
    };
    readingTime?: number;
}

export const defaultSeo: SeoData = {
    title: "ILSA - Instituto Latinoamericano para una Sociedad y un Derecho Alternativos",
    metaDesc: "Promovemos una visión crítica del derecho y la transformación social en América Latina.",
    opengraphTitle: "ILSA",
    opengraphDescription: "Promovemos una visión crítica del derecho y la transformación social en América Latina.",
};
