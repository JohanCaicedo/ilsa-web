// Server-side PDF download proxy
// Fetches the PDF from any origin and serves it with Content-Disposition: attachment
// Bypasses browser CORS restrictions since the fetch is server-to-server

export const prerender = false;

export async function GET({ request }: { request: Request }) {
    const urlParam = new URL(request.url).searchParams.get("url");

    if (!urlParam) {
        return new Response("Missing 'url' parameter", { status: 400 });
    }

    // Security: only allow downloads from the ILSA WordPress API
    let targetUrl: URL;
    try {
        targetUrl = new URL(urlParam);
    } catch {
        return new Response("Invalid URL", { status: 400 });
    }

    const allowedHosts = ["api.ilsa.org.co", "ilsa.org.co"];
    if (!allowedHosts.includes(targetUrl.hostname)) {
        return new Response("URL not allowed", { status: 403 });
    }

    try {
        const res = await fetch(targetUrl.toString());

        if (!res.ok) {
            return new Response("Failed to fetch file", { status: res.status });
        }

        // Derive filename from URL path
        const filename = targetUrl.pathname.split("/").pop() || "documento.pdf";

        return new Response(res.body, {
            status: 200,
            headers: {
                "Content-Type": res.headers.get("Content-Type") || "application/pdf",
                "Content-Disposition": `attachment; filename="${filename}"`,
                "Cache-Control": "public, max-age=3600",
            },
        });
    } catch (err) {
        return new Response("Proxy error", { status: 502 });
    }
}
