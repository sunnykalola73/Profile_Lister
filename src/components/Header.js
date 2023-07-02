import React from "react";
import { Toolbar } from "@mui/material";
import Switch from "@mui/material/Switch";
import {
	MyHeader,
	HeaderContent,
	LogoTypographyContainer,
	ThemeSwitcher,
	TypographyText,
	IconDarkMode,
	IconLightMode,
	Logo,
} from "./StyledHeaderComponents";

import LogoDark from "../assets/logo-dark.svg";
import LogoLight from "../assets/logo-light.svg";

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
