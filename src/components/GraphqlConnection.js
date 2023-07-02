import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
	uri: "https://api.poc.graphql.dev.vnplatform.com/graphql",
	headers: {
		// TODO: This can be moved to the env file and fetched from there.
		//We need to add personalized token below in "Authorization" field to make a Graphql call.
		Authorization:"",
		"Content-Type": "application/json",
	},
	cache: new InMemoryCache(),
});
