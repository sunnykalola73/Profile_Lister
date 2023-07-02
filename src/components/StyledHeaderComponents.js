import { AppBar } from "@mui/material";
import Typography from "@mui/material/Typography";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { styled } from "@mui/material/styles";

export const MyHeader = styled(AppBar)(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
}));

export const Logo = styled("img")({
	// width: 40,
	// height: 40,
	width: "33px",
	height: "32px",
	top: "9px",
	left: "9px",
});

export const HeaderContent = styled("div")({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	width: "100%",
});

export const LogoTypographyContainer = styled("div")({
	display: "flex",
	alignItems: "center",
});

export const TypographyText = styled(Typography)({
	marginRight: "wpx",
	textAlign: "left",
});

export const ThemeSwitcher = styled("div")({
	display: "flex",
	alignItems: "center",
	marginLeft: "16px",
});

export const IconLightMode = styled(LightModeIcon)({
	width: "22px",
	height: "22px",
	top: "1px",
	left: "1px",
});

export const IconDarkMode = styled(DarkModeIcon)`IconLightMode`;
