import { Variables } from "relay-runtime";

// your-app-name/src/fetchGraphQL.js
async function fetchGraphQL(text?: string | null, variables?: Variables) {
  //   const REACT_APP_GITHUB_AUTH_TOKEN = process.env.REACT_APP_GITHUB_AUTH_TOKEN;

  // Fetch data from GitHub's GraphQL API:
  const response = await fetch("http://localhost:3001/graphql", {
    method: "POST",
    headers: {
      //   Authorization: `bearer ${REACT_APP_GITHUB_AUTH_TOKEN}`,
      "Content-Type": "application/json",
    },
    mode: "cors",
    credentials: "include",
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });

  // Get the response as JSON
  return await response.json();
}

export default fetchGraphQL;
