import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#FCFCFD",
		},
	},
});

export const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#181818",
		},
	},
});
