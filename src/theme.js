import { createTheme } from "@mui/material/styles";
const breakpoints = {
	values: {
		xs: 0, // Extra small devices (portrait phones)
		sm: 600, // Small devices (landscape phones)
		md: 960, // Medium devices (tablets)
		lg: 1280, // Large devices (desktops)
		mxl: 1400,
		xl: 1920, // Extra large devices (large desktops)
		xxl: 2713,
	},
};

export const lightTheme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#FCFCFD",
		},
	},
	breakpoints,
});

export const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#181818",
		},
	},
	breakpoints,
});
