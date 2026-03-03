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

/**
 * The Central Registry of Local Special Pages.
 * Developers / Users should add an entry here whenever a custom layout like
 * /noticias/especiales/evento.astro is created.
 */
export const registeredLocalPages: LocalSpecialPage[] = [
    {
        title: "Evento Especial en Cartagena: Reflexiones de Justicia",
        author: "Equipo ILSA",
        date: "2026-03-01T12:00:00.000Z", // Example past date
        image: "https://api.ilsa.org.co/wp-content/uploads/2023/10/DJI_0447-1024x683.jpg", // Example nice placeholder
        uri: "/noticias/especiales/cartagena",
        categorySlug: "noticias",
    },
];

/**
 * Merges WordPress Posts and Registered Local Pages matching a specific category,
 * sorting the unified array from newest to oldest.
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

    // 2. Fetch and Normalize Local Pages matching the category
    const localUnified: UnifiedCardData[] = registeredLocalPages
        .filter((page) => page.categorySlug === category)
        .map((page) => ({
            id: `local-${page.uri}`,
            title: page.title,
            author: page.author,
            date: page.date,
            image: page.image,
            uri: page.uri,
            isLocal: true,
        }));

    // 3. Merge and Sort chronologically (newest first)
    const combined = [...wpUnified, ...localUnified];
    combined.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return combined;
}
