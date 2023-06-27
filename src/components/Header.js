import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Switch from "@mui/material/Switch";
import Logo from "../assets/logo.svg";

import "./Header.scss";

function Header() {
	return (
		<AppBar position="relative">
			<Container maxWidth="xl">
				<div>
					<div className="Viral-naiton-logo">
						<Toolbar disableGutters>
							<img alt="Viral-naiton-logo" src={Logo}></img>
							<Typography noWrap>iral Nation</Typography>
						</Toolbar>
					</div>
					<div className="Theme-Switch">
						<LightModeIcon className="icon"></LightModeIcon>
						<Switch color="warning" defaultChecked />
						<DarkModeIcon></DarkModeIcon>
					</div>
				</div>
			</Container>
		</AppBar>
	);
}
export default Header;
