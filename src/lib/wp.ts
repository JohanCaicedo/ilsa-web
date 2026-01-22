interface WpQueryOptions {
  query: string;
  variables?: Record<string, any>;
}

const API_URL = import.meta.env.WORDPRESS_API_URL || "https://api.ilsa.org.co/graphql";

export async function wpQuery(options: string | WpQueryOptions) {
  const { query, variables } = typeof options === 'string'
    ? { query: options, variables: {} }
    : options;

  if (!API_URL) {
    throw new Error("WORDPRESS_API_URL no definida.");
  }

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
      throw new Error('La API devolvió errores.');
    }

    return data;

  } catch (error) {
    console.error('Fallo en wpQuery:', error);
    throw error;
  }
}