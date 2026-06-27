// src/lib/unifiedContent.ts
import type { CardPostNode } from "./wp";

/**
 * Interface representing a manually created local (.astro) page
 * that should appear in the WordPress grids alongside fetched content.
 */
export interface LocalSpecialPage {
    title: string;
    author: string;
    date: string; // ISO format "YYYY-MM-DD" or Date parseable string
    image: string;
    uri: string; // The local route, e.g., "/noticias/especiales/cartagena"
    categorySlug: "noticias" | "opinion" | "publicaciones" | "multimedia" | "actividades";
}

/**
 * Interface that normalizes both WordPress PostNodes and LocalSpecialPages
 * so they can be fed into the generic Grid Components flawlessly.
 */
export interface UnifiedCardData {
    id: string; // WP ID or generated local ID
    title: string;
    author: string;
    date: string;
    image: string;
    uri: string;
    isLocal: boolean;
}

// ---------------------------------------------------------------------------
// Auto-discovery of pages in /noticias/especiales/
// ---------------------------------------------------------------------------
// Vite glob — discovers all .astro files under the especiales directory.
const especialesModules = import.meta.glob("../pages/noticias/especiales/*.astro");

/**
 * Slug → metadata overrides for pages that need custom title / date / image.
 * Only add entries here when the auto-derived filename title isn't enough.
 */
const especialesMeta: Record<string, Partial<LocalSpecialPage>> = {
    cartagena: {
        title: "Evento Especial en Cartagena: Reflexiones de Justicia",
        author: "Equipo ILSA",
        date: "2026-03-01T12:00:00.000Z",
        image: "https://api.ilsa.org.co/wp-content/uploads/2023/10/DJI_0447-1024x683.jpg",
    },
    sae: {
        title: "La SAE entrega siete inmuebles en Bogotá: ILSA seleccionada para fortalecer proyectos de memoria y derechos humanos",
        date: "2026-06-23T12:00:00.000Z",
        image: "/images/sae/sae (4).webp",
    },
    "foro-multiactor": {
        title: "Participación en el Foro Multi-actor EU-LAC sobre Cuidados",
        date: "2026-05-28T12:00:00.000Z",
        image: "/images/foro-multiactor/Foro-ID.jpg",
    },
    "alerta-temprana-unal": {
        title: "Alerta Temprana: Presencia e intimidación de Águilas Negras en inmediaciones Universidad Nacional",
        date: "2026-06-27T12:00:00.000Z",
        image: "/images/unal.webp",
    },
    "cinco-años-del-estallido-social": {
        title: "Foro: Diálogos de saberes a cinco años del estallido social",
        date: "2026-06-29T12:00:00.000Z",
        image: "/images/sae/sae (4).webp",
    },
};

/** Converts a kebab-case slug to a human-readable title (fallback). */
function slugToTitle(slug: string): string {
    return slug
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Returns all discovered local pages inside the especiales directory,
 * merged with any custom overrides.
 */
function discoverEspecialesPages(category: LocalSpecialPage["categorySlug"]): UnifiedCardData[] {
    const pages: UnifiedCardData[] = [];

    for (const path of Object.keys(especialesModules)) {
        const slug = path.replace(/^.*[\\/]/, "").replace(".astro", "");
        const override = especialesMeta[slug] ?? {};

        pages.push({
            id: `local-${slug}`,
            title: override.title ?? slugToTitle(slug),
            author: override.author ?? "ILSA",
            date: override.date ?? new Date().toISOString(),
            image: override.image ?? "",
            uri: `/noticias/especiales/${slug}`,
            isLocal: true,
        });
    }

    return pages;
}

// ---------------------------------------------------------------------------
// Manual registry for pages OUTSIDE /noticias/especiales/ (e.g. standalone)
// ---------------------------------------------------------------------------
const standaloneLocalPages: LocalSpecialPage[] = [
    {
        title: "Ley 2570 de 2026: Jurisdicción Agraria y Rural en Colombia",
        author: "ILSA",
        date: "2026-05-20T12:00:00.000Z",
        image: "/id/JAR-20M.webp",
        uri: "/noticias/jurisdiccion-agraria-y-rural",
        categorySlug: "noticias",
    },
];

/**
 * Merges WordPress Posts and Local Pages matching a specific category,
 * sorting the unified array from newest to oldest.
 *
 * Local pages are auto-discovered from /noticias/especiales/ and combined
 * with any manually registered standalone pages.
 */
export function getUnifiedTimeline(wpPosts: CardPostNode[], category: LocalSpecialPage["categorySlug"]): UnifiedCardData[] {
    // 1. Normalize WP Posts
    const wpUnified: UnifiedCardData[] = wpPosts.map((post) => ({
        id: post.id || post.uri,
        title: post.title,
        author: post.author?.node?.name || "ILSA",
        date: post.date,
        image: post.featuredImage?.node?.sourceUrl || "",
        uri: post.uri,
        isLocal: false,
    }));

    // 2. Auto-discover especiales/ pages + standalone manual pages
    const localUnified: UnifiedCardData[] = [
        ...discoverEspecialesPages(category),
        ...standaloneLocalPages
            .filter((p) => p.categorySlug === category)
            .map((p) => ({
                id: `local-${p.uri}`,
                title: p.title,
                author: p.author,
                date: p.date,
                image: p.image,
                uri: p.uri,
                isLocal: true,
            })),
    ];

    // 3. Merge and Sort chronologically (newest first)
    const combined = [...wpUnified, ...localUnified];
    combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return combined;
}
