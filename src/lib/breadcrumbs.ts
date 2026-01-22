import { collectionsConfig } from "./collections";

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

export function generateBreadcrumbs(url: URL): BreadcrumbItem[] {
    const path = url.pathname.replace(/\/$/, ""); // Remove trailing slash
    if (!path) return []; // Home

    const segments = path.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    let currentPath = "";

    segments.forEach((segment, index) => {
        currentPath += `/${segment}`;

        // Skip pagination segments if needed, or handle them
        if (segment === 'page') return;
        if (index > 0 && segments[index - 1] === 'page') return; // Skip page number

        let label = segment.replace(/-/g, " ");

        // 1. Check Collections Config
        const collectionConfig = Object.values(collectionsConfig).find(c =>
            // We match by the slug key in the map, OR the wpCategorySlug? 
            // The URL segment corresponds to the keys in `collectionsConfig`.
            // Let's check keys.
            // Actually collectionsConfig is keyed by the URL slug.
            // So we can check direct lookup.
            false // Placeholder
        );

        if (collectionsConfig[segment]) {
            label = collectionsConfig[segment].title;
        } else {
            // Capitalize
            label = label.charAt(0).toUpperCase() + label.slice(1);
        }

        // Special override for 'Opinion' or 'Publicaciones' root?
        if (segment === 'opinion') label = 'Opinión';

        breadcrumbs.push({
            label: label,
            href: currentPath,
        });
    });

    // Make the last item text-only (no href) is often handled by the component via `aria-current`, 
    // but here we generate the data. The component seems to handle the last item style, but we pass href.
    // We can pass href for all.

    return breadcrumbs;
}
