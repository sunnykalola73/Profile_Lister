import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import LogoDark from "../assets/logo-dark.svg";
import LogoLight from "../assets/logo-light.svg";

const MyHeader = styled(AppBar)(({ theme }) => ({
	backgroundColor: theme.palette.primary.main,
}));

const Logo = styled("img")({
	// width: 40,
	// height: 40,
	width: "33px",
	height: "32px",
	top: "9px",
	left: "9px",
});

const HeaderContent = styled("div")({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	width: "100%",
});

const LogoTypographyContainer = styled("div")({
	display: "flex",
	alignItems: "center",
});

const TypographyText = styled(Typography)({
	marginRight: "wpx",
	textAlign: "left",
});

const ThemeSwitcher = styled("div")({
	display: "flex",
	alignItems: "center",
	marginLeft: "16px",
});

const IconLightMode = styled(LightModeIcon)({
	width: "22px",
	height: "22px",
	top: "1px",
	left: "1px",
});

const IconDarkMode = styled(DarkModeIcon)`IconLightMode`;

function Header({ isDarkMode, handleThemeToggle }) {
	return (
		<MyHeader position="static">
			<Toolbar>
				<HeaderContent>
					<LogoTypographyContainer>
						<Logo
							alt="Viral-nation-logo"
							src={!isDarkMode ? LogoDark : LogoLight}
						/>
						<TypographyText variant="h6" noWrap>
							iral Nation
						</TypographyText>
					</LogoTypographyContainer>
					<ThemeSwitcher>
						<IconLightMode />
						<Switch
							checked={isDarkMode}
							onChange={handleThemeToggle}
							color="warning"
						/>
						<IconDarkMode />
					</ThemeSwitcher>
				</HeaderContent>
			</Toolbar>
		</MyHeader>
	);
}

export default Header;
