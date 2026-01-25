// src/lib/wp.ts

// Interfaces
export interface WpQueryOptions {
  query: string;
  variables?: Record<string, any>;
}

export interface MasterQueryResponse {
  posts: {
    nodes: PostNode[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
}

export interface PostNode {
  id: string;
  databaseId: number;
  slug: string;
  uri: string;
  title: string;
  date: string;
  modified: string;
  excerpt: string;
  content: string;
  categories: {
    nodes: Array<{ name: string; slug: string; termTaxonomyId: number }>;
  };
  tags: {
    nodes: Array<{ name: string; slug: string }>;
  };
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
      caption?: string;
      mediaDetails: {
        width: number;
        height: number;
      };
    };
  };
  author: {
    node: {
      name: string;
      firstName: string;
      lastName: string;
      avatar: { url: string };
    };
  };
  seo: {
    title: string;
    metaDesc: string;
    canonical: string;
    opengraphTitle: string;
    opengraphDescription: string;
    opengraphImage?: { sourceUrl: string };
    twitterTitle: string;
    twitterDescription: string;
    twitterImage?: { sourceUrl: string };
    readingTime: number;
  };
}

// Global Queries
export const MASTER_QUERY = `
  query MasterQuery($first: Int = 100, $after: String = "") {
    posts(first: $first, after: $after) {
      nodes {
        id
        databaseId
        slug
        uri
        title
        date
        modified
        excerpt
        content
        categories {
          nodes {
            name
            slug
            termTaxonomyId
          }
        }
        tags {
          nodes {
            name
            slug
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
            caption
            mediaDetails {
              width
              height
            }
          }
        }
        author {
          node {
            name
            firstName
            lastName
            avatar {
              url
            }
          }
        }
        seo {
          title
          metaDesc
          canonical
          opengraphTitle
          opengraphDescription
          opengraphImage {
            sourceUrl
          }
          twitterTitle
          twitterDescription
          twitterImage {
            sourceUrl
          }
          readingTime
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const API_URL = import.meta.env.WORDPRESS_API_URL || "https://api.ilsa.org.co/graphql";

// Helper Functions
export async function fetchAllPosts(): Promise<MasterQueryResponse> {
  let allNodes: PostNode[] = [];
  let hasNextPage = true;
  let endCursor = "";

  while (hasNextPage) {
    console.log(`Fetching posts... (cursor: ${endCursor})`);

    const data = await wpQuery<MasterQueryResponse>({
      query: MASTER_QUERY,
      variables: {
        first: 100,
        after: endCursor
      }
    });

    const postsData = data?.posts;
    if (!postsData) break;

    allNodes = [...allNodes, ...postsData.nodes];
    hasNextPage = postsData.pageInfo?.hasNextPage || false;
    endCursor = postsData.pageInfo?.endCursor || "";
  }

  return {
    posts: {
      nodes: allNodes,
      pageInfo: {
        hasNextPage: false,
        endCursor: "",
      }
    }
  };
}

/**
 * Envoltorio centralizado para peticiones GraphQL con Smart Caching
 * Usa Dynamic Imports para evitar errores de compilación en Cloudflare Runtime
 */
export async function wpQuery<T = any>(options: string | WpQueryOptions): Promise<T> {
  const { query, variables } = typeof options === 'string'
    ? { query: options, variables: {} }
    : options;

  if (!API_URL) {
    throw new Error("WORDPRESS_API_URL no definida en las variables de entorno.");
  }

  // Detect Node Environment (Only True during Build Step for Prerender)
  const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
  let cachedData: T | null = null;
  let cachePath = "";
  let fs: any = null; // Dynamic module container

  // Try Cache Logic (Only in Node)
  if (isNode) {
    try {
      // Dynamic Imports prevent bundling 'node:fs' in Cloudflare Worker runtime
      const crypto = await import('node:crypto');
      fs = await import('node:fs');
      const path = await import('node:path');

      const CACHE_DIR = path.join(process.cwd(), '.cache', 'wp');

      if (!fs.existsSync(CACHE_DIR)) {
        fs.mkdirSync(CACHE_DIR, { recursive: true });
      }

      const queryHash = crypto.createHash('md5')
        .update(query + JSON.stringify(variables || {}))
        .digest('hex');

      cachePath = path.join(CACHE_DIR, `${queryHash}.json`);

      if (fs.existsSync(cachePath)) {
        const raw = fs.readFileSync(cachePath, 'utf-8');
        cachedData = JSON.parse(raw);
      }
    } catch (e) {
      // Silent fail on cache logic
    }
  }

  // Return Cache Hit
  if (cachedData) return cachedData;

  // Network Fetch (No Timestamp)
  const url = API_URL;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Error de red (${res.status}):`, errorText);
      throw new Error(`Petición fallida: ${res.statusText}`);
    }

    const { data, errors } = await res.json();

    if (errors) {
      console.error('Error GraphQL:', JSON.stringify(errors, null, 2));
      throw new Error('La API de WordPress devolvió errores.');
    }

    // Write Cache (Only in Node)
    if (isNode && data && fs && cachePath) {
      try {
        fs.writeFileSync(cachePath, JSON.stringify(data), 'utf-8');
      } catch (e) {
        // Ignore write errors
      }
    }

    return data;

  } catch (error) {
    console.error('Fallo en wpQuery:', error);
    throw error;
  }
}