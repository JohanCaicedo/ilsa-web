// src/lib/wp.ts

/**
 * Interfaces para tipar la respuesta de WordPress y dar contexto al Agente
 */
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

/**
 * Consulta Maestra para Entradas y Páginas
 */
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

/**
 * Envoltorio centralizado para peticiones GraphQL con Cache Busting
 */
export async function wpQuery<T = any>(options: string | WpQueryOptions): Promise<T> {
  const { query, variables } = typeof options === 'string'
    ? { query: options, variables: {} }
    : options;

  if (!API_URL) {
    throw new Error("WORDPRESS_API_URL no definida en las variables de entorno.");
  }

  // Implementa parámetro de tiempo para evitar caché en desarrollo/build
  const urlNoCache = `${API_URL}?t=${Date.now()}`;

  try {
    const res = await fetch(urlNoCache, {
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

    return data;

  } catch (error) {
    console.error('Fallo en wpQuery:', error);
    throw error;
  }
}

/**
 * Recupera TODAS las entradas paginando automáticamente
 */
export async function fetchAllPosts(): Promise<MasterQueryResponse> {
  let allNodes: PostNode[] = [];
  let hasNextPage = true;
  let endCursor = "";

  while (hasNextPage) {
    console.log(`Fetching posts... (cursor: ${endCursor})`);

    // Using explicit loop with cursor
    const data = await wpQuery<MasterQueryResponse>({
      query: MASTER_QUERY,
      variables: {
        first: 100, // Safe batch size
        after: endCursor
      }
    });

    const postsData = data?.posts;
    if (!postsData) break;

    allNodes = [...allNodes, ...postsData.nodes];

    hasNextPage = postsData.pageInfo?.hasNextPage || false;
    endCursor = postsData.pageInfo?.endCursor || "";
  }

  // Return a synthetic response resembling the original structure but with ALL nodes
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