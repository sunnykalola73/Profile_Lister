import React from "react";
import { client } from "./GraphqlConnection";
import { ApolloProvider } from "@apollo/client";

import Header from "./Header";
import CardView from "./CardView";

function Home({ isDarkMode, handleThemeToggle }) {
	return (
		<ApolloProvider client={client}>
			<div>
				<Header
					isDarkMode={isDarkMode}
					handleThemeToggle={handleThemeToggle}
				></Header>
				<CardView></CardView>
			</div>
		</ApolloProvider>
	);
}

export default Home;
