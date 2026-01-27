
const API_URL = "https://api.ilsa.org.co/graphql";

async function inspectSchema() {
    const query = `
    {
      __schema {
        types {
          name
        }
      }
    }
  `;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query }),
        });

        const json = await response.json();
        console.log("Raw Response:", JSON.stringify(json, null, 2));

        if (json.errors) {
            console.error("GraphQL Errors:", json.errors);
            return;
        }

        const types = json.data.__schema.types.map(t => t.name);

        // Filter for anything looking like an event
        const eventTypes = types.filter(t =>
            t.toLowerCase().includes("event") ||
            t.toLowerCase().includes("actividad") ||
            t.toLowerCase().includes("listing")
        );

        console.log("Possible Event Types found:", eventTypes);
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

inspectSchema();
