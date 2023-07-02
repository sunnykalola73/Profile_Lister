import React from "react";
import { client } from "./GraphqlConnection";
import { ApolloProvider } from "@apollo/client";

import Header from "./Header";
import Body from "./Body";

function Home({ isDarkMode, handleThemeToggle }) {
	return (
		<ApolloProvider client={client}>
			<div>
				<Header
					isDarkMode={isDarkMode}
					handleThemeToggle={handleThemeToggle}
				></Header>
				<Body></Body>
			</div>
		</ApolloProvider>
	);
}

export default Home;
