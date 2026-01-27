
const API_URL = "https://api.ilsa.org.co/graphql";

async function testQuery(fieldName) {
    const query = `
    {
      ${fieldName}(first: 1) {
        nodes {
          id
          title
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
        if (json.errors) {
            console.log(`Query for '${fieldName}' failed:`, json.errors[0].message);
        } else {
            console.log(`SUCCESS! '${fieldName}' is available.`);
            console.log(json.data);
        }
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

async function runTests() {
    await testQuery("eventListings");
    await testQuery("events");
    await testQuery("actividades");
}

runTests();
