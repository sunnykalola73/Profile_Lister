import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
	uri: "https://api.poc.graphql.dev.vnplatform.com/graphql",
	headers: {
		// TODO: This can be moved to the env file and fetch it.
		Authorization:
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjYW5kaWRhdGVfbmFtZSI6IlN1bm55IiwiaXNfY2FuZGlkYXRlIjp0cnVlLCJpYXQiOjE2ODc3OTg2NzQsImV4cCI6MTY4ODMxNzA3NH0.Cp5yGasGoCD_ZKmaxFcF7eRfZ4kAUN3uzxIaQSfGFmc",
		"Content-Type": "application/json",
	},
	cache: new InMemoryCache(),
});
