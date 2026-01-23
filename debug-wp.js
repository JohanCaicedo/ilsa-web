
const fetch = require('node-fetch'); // or native fetch in newer node

const API_URL = "https://api.ilsa.org.co/graphql";
const TARGET_URI = "/2022/07/derecho-y-liberacion-segundo-capitulo/";

const MASTER_QUERY = `
  query MasterQuery {
    posts(first: 1000) {
      nodes {
        title
        uri
        slug
      }
    }
  }
`;

async function run() {
    console.log(`Fetching from ${API_URL}...`);
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: MASTER_QUERY }),
        });

        if (!res.ok) throw new Error(res.statusText);
        const { data } = await res.json();
        const posts = data.posts.nodes;

        console.log(`Total posts: ${posts.length}`);

        const found = posts.find(p => p.uri === TARGET_URI || p.slug === "derecho-y-liberacion-segundo-capitulo" || p.uri.includes("derecho-y-liberacion"));

        if (found) {
            console.log("✅ FOUND IT!");
            console.log(found);
        } else {
            console.log("❌ NOT FOUND in the first 1000 posts.");
            console.log("First post:", posts[0]);
            console.log("Last post:", posts[posts.length - 1]);
        }

    } catch (e) {
        console.error("Error:", e);
    }
}

run();
