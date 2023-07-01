import React, { useState } from "react";
import {
	CardHeader,
	Avatar,
	IconButton,
	CardContent,
	Typography,
	Card,
	styled,
	Menu,
	MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VerifiedLogo from "../assets/verified-logo.svg";

const StyledCard = styled(Card)(({ theme }) => ({
	borderRadius: "8px",
	width: "100%",
	height: 200,
	padding: "24px",
	backgroundColor: theme.palette.secondary.main,
	"& .MuiCardHeader-content": {
		textOverflow: "ellipsis",
		overflow: "hidden",
		whiteSpace: "nowrap",
		maxWidth: "70%",
	},
}));

const ProfileImage = styled(Avatar)({
	width: "64px",
	height: "64px",
});

const NameWrapper = styled("div")({
	display: "flex",
	alignItems: "center",
});

const InlineContainer = styled("div")({
	display: "flex",
	alignItems: "center",
	maxWidth: "190px",
	overflowX: "auto",
});

const StyledName = styled(Typography)({
	fontSize: "16px",
	fontWeight: 500,
	letterSpacing: "0.5px",
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
});

const LogoVerified = styled("img")({
	padding: 2,
});

const StyledEmail = styled(Typography)({
	fontSize: "14px",
	fontWeight: "400",
	lineHeight: "20px",
	letterSpacing: "0.25px",
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
});

const StyledCardContent = styled(CardContent)({
	padding: "0px !important",
	fontSize: "12px",
	fontWeight: "400",
	lineHeight: "16px",
	letterSpacing: "0.4px",
	maxHeight: "112px", // Adjust the height based on line height and desired maximum lines
	overflow: "hidden",
	display: "-webkit-box",
	WebkitLineClamp: 5,
	WebkitBoxOrient: "vertical",
	marginTop: "10px",
});

const StyledCardHeader = styled(CardHeader)({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: 0,
	"& .MuiCardHeader-action": {
		alignSelf: "center",
	},
});

const MoreOption = styled(IconButton)({
	padding: 0,
});

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
						R
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
							<LogoVerified
								alt={profile.id + "_verified_logo"}
								src={VerifiedLogo}
							/>
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
