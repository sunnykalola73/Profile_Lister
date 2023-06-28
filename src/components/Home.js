import React from "react";
import Header from "./Header";
import Body from "./Body";

function Home({ isDarkMode, handleThemeToggle }) {
	return (
		<div>
			<Header
				isDarkMode={isDarkMode}
				handleThemeToggle={handleThemeToggle}
			></Header>
			<Body></Body>
		</div>
	);
}

export default Home;
