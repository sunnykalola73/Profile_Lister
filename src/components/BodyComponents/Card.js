import React, { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PortraitOutlinedIcon from "@mui/icons-material/PortraitOutlined";

import {
	StyledCard,
	StyledCardContent,
	StyledCardHeader,
	StyledEmail,
	StyledName,
	ProfileImage,
	LogoVerified,
	NameWrapper,
	InlineContainer,
	MoreOption,
} from "./CardStyledComponents";
import VerifiedLogo from "../../assets/verified-logo.svg";

function DisplayCard({
	profile,
	setProfileToEdit,
	openModal,
	openRemoveProfileModal,
	setProfileRemoveId,
}) {
	const [anchorEl, setAnchorEl] = useState(null);

	const handleMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const editProfile = () => {
		setProfileToEdit(profile);
		openModal();
		handleMenuClose();
	};

	const removeProfile = () => {
		setProfileRemoveId(profile.id);
		openRemoveProfileModal();
		handleMenuClose();
	};

	return (
		<StyledCard>
			<StyledCardHeader
				avatar={
					<ProfileImage src={profile.image_url} aria-label="avatarIcon">
						<PortraitOutlinedIcon />
					</ProfileImage>
				}
				action={
					<>
						<MoreOption aria-label="settings" onClick={handleMenuOpen}>
							<MoreVertIcon />
						</MoreOption>
						<Menu
							anchorEl={anchorEl}
							open={Boolean(anchorEl)}
							onClose={handleMenuClose}
							keepMounted
						>
							<MenuItem onClick={() => editProfile()}>Edit profile</MenuItem>
							<MenuItem onClick={() => removeProfile()}>
								Remove profile
							</MenuItem>
						</Menu>
					</>
				}
				title={
					<div style={{ maxWidth: "190px" }}>
						<NameWrapper>
							<StyledName>
								{profile.first_name + " " + profile.last_name}
							</StyledName>
							{profile.is_verified ? (
								<LogoVerified
									alt={profile.id + "_verified_logo"}
									src={VerifiedLogo}
								/>
							) : (
								<></>
							)}
						</NameWrapper>
					</div>
				}
				subheader={
					<InlineContainer>
						<StyledEmail>{profile.email}</StyledEmail>
					</InlineContainer>
				}
			/>
			<StyledCardContent variant="body2" color="text.secondary">
				{profile.description}
			</StyledCardContent>
		</StyledCard>
	);
}

export default DisplayCard;
