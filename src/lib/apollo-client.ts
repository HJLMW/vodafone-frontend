import { ApolloClient, InMemoryCache } from "@apollo/client";
import { APOLLO_GRAPHQL_URL } from "./config";

// Create a new instance of ApolloClient to handle GraphQL requests
const client = new ApolloClient({
	// Specify the GraphQL API endpoint URI
	uri: APOLLO_GRAPHQL_URL,
	// Set up an in-memory cache to store data fetched from the server
	cache: new InMemoryCache({
		// Disable the automatic addition of __typename to the results (useful for certain scenarios)
		addTypename: false
	}),
});

export default client;