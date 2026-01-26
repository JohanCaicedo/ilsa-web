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

export interface CardPostNode {
  id: string;
  slug: string;
  uri: string;
  title: string;
  date: string;
  excerpt: string;
  categories: {
    nodes: Array<{ name: string; slug: string }>;
  };
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
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

export const CARD_QUERY = `
  query GetPostsByCategory($first: Int!, $categoryName: String) {
    posts(first: $first, where: { categoryName: $categoryName }) {
      nodes {
        id
        slug
        uri
        title
        date
        excerpt
        categories {
          nodes {
            name
            slug
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
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
      }
    }
  }
`;

const API_URL = import.meta.env.WORDPRESS_API_URL || "https://api.ilsa.org.co/graphql";

// Helper Functions
export async function getPostsByCategory(categorySlug: string, count: number): Promise<CardPostNode[]> {
  // Fetch a buffer to resolve "strict category" filtering client-side
  // because WPGraphQL 'categoryName' includes children by default.
  // We ask for more posts to ensure we have enough after filtering.
  const fetchCount = count + 20;

  const data = await wpQuery<{ posts: { nodes: CardPostNode[] } }>({
    query: CARD_QUERY,
    variables: {
      first: fetchCount,
      categoryName: categorySlug
    }
  });

  const allNodes = data?.posts?.nodes || [];

  // Strict Filter: Ensure the post explicitly has the requested category slug
  // This removes posts that are only in subcategories
  const strictNodes = allNodes.filter(node =>
    node.categories.nodes.some(cat => cat.slug === categorySlug)
  );

  return strictNodes.slice(0, count);
}
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
  // We use import.meta.env.SSR as the primary guard for server-side logic
  const isSSR = import.meta.env.SSR;
  let cachedData: T | null = null;

  // Try Cache Logic (Only in SSR/Node)
  if (isSSR) {
    try {
      // Dynamic import of the cache module to prevent bundler from including it in client bundle
      const { readCache } = await import('./wp-cache');
      cachedData = readCache<T>(query, variables);
    } catch (e) {
      // Silent fail on cache logic (module not found or not in Node)
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

    // Write Cache (Only in SSR/Node)
    if (isSSR && data) {
      try {
        const { writeCache } = await import('./wp-cache');
        writeCache(query, variables, data);
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