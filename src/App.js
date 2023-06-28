import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Home from "./components/Home";
import { darkTheme, lightTheme } from "./theme";

function App() {
	const [isDarkMode, setIsDarkMode] = useState(false);

	const handleThemeToggle = () => {
		setIsDarkMode(!isDarkMode);
	};

	return (
		<ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
			<CssBaseline />
			<div className="App">
				<header className="App-header">
					<Home
						isDarkMode={isDarkMode}
						handleThemeToggle={handleThemeToggle}
					></Home>
				</header>
			</div>
		</ThemeProvider>
	);
}

export default App;
