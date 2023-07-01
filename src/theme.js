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
			main: "#F2F2F3",
		},
		secondary: {
			main: "#EEEEEE",
		},
		popup: {
			main: "#FCFCFD",
		},
		removeProfile: {
			main: "#E0E0E0",
		},
	},
	breakpoints,
});

export const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#121212",
		},
		secondary: {
			main: "#181818",
		},
		popup: {
			main: "#18181C",
		},
		removeProfile: {
			main: "#232425",
		},
	},
	breakpoints,
});
