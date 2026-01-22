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
  query MasterQuery {
    posts(first: 1000) {
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