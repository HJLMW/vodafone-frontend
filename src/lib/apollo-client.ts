import { ApolloClient, InMemoryCache } from "@apollo/client";
import { APOLLO_GRAPHQL_URL } from "./config";

const client = new ApolloClient({
	uri: APOLLO_GRAPHQL_URL,
	cache: new InMemoryCache({
		addTypename: false
	}),
});

export default client;