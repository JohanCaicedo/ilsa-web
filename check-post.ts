
import { fetchAllPosts, type MasterQueryResponse } from "./src/lib/wp";

// Polyfill import.meta.env for Node environment purely for this script's dependencies
// @ts-ignore
if (typeof import.meta === 'undefined') { (global as any).import.meta = { env: {} }; }
// @ts-ignore
if (!import.meta.env) { (import.meta as any).env = {}; }

// Ensure API URL is set for valid execution if not picked up
process.env.WORDPRESS_API_URL = "https://api.ilsa.org.co/graphql";

const targetUri = "/2022/07/derecho-y-liberacion-segundo-capitulo/";
const targetSlug = "derecho-y-liberacion-segundo-capitulo";

async function checkPost() {
    console.log("Starting Fetch All verification...");
    try {
        const data = await fetchAllPosts() as MasterQueryResponse;
        const posts = data.posts.nodes;
        console.log(`Total posts fetched: ${posts.length}`);

        const found = posts.find(p => p.uri === targetUri || p.slug === targetSlug || p.uri.includes("derecho-y-liberacion"));

        if (found) {
            console.log("✅ SUCCESS: Post found in the complete set!");
            console.log(`Title: ${found.title}`);
            console.log(`URI: ${found.uri}`);
        } else {
            console.log("❌ FAILURE: Post NOT found even after fetching all pages.");
        }

    } catch (e) {
        console.error("Script Error:", e);
    }
}

checkPost();
