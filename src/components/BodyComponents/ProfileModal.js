import React, { useEffect, useState } from "react";
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Grid,
	TextField,
	Switch,
	InputLabel,
	Typography,
	Slide,
	IconButton,
	Divider,
} from "@mui/material";
import { useMutation } from "@apollo/react-hooks";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";

import {
	CREATE_PROFILE_MUTATION,
	UPDATE_PROFILE,
} from "../../.graphql/mutations";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="left" ref={ref} {...props} />;
});

// TODO: We can move all styled components to a new file and import these from there.
const StyledSubmitButton = styled(Button)({
	textTransform: "none",
});

const StyledDiv = styled("div")(({ theme }) => ({
	display: "flex",
	width: "100%",
	alignItems: "center",
	backgroundColor: theme.palette.secondary.main,
	borderRadius: "4px",
	border: "1px",
	padding: "16px",
	justifyContent: "space-between",
}));

const ProfileModal = ({ isOpen, closeModal, profileToEdit = {} }) => {
	const [imageUrl, setImageUrl] = useState(profileToEdit?.image_url || "");
	const [email, setEmail] = useState(profileToEdit?.email || "");
	const [firstName, setFirstName] = useState(profileToEdit?.first_name || "");
	const [lastName, setLastName] = useState(profileToEdit?.last_name || "");
	const [description, setDescription] = useState(
		profileToEdit?.description || ""
	);
	const [isVerified, setIsVerified] = useState(
		profileToEdit?.is_verified || false
	);
	useEffect(() => {
		setImageUrl(profileToEdit?.image_url || "");
		setEmail(profileToEdit?.email || "");
		setFirstName(profileToEdit?.first_name || "");
		setLastName(profileToEdit?.last_name || "");
		setDescription(profileToEdit?.description || "");
		setIsVerified(profileToEdit?.is_verified || false);
	}, [profileToEdit]);

	const handleToggleChange = () => {
		setIsVerified(!isVerified);
	};

	const handleClose = () => {
		closeModal();
	};

	const [createProfile] = useMutation(CREATE_PROFILE_MUTATION);
	const [updateProfile] = useMutation(UPDATE_PROFILE);

	const handleSubmit = async (event) => {
		event.preventDefault();

		const variables = {
			firstName,
			lastName,
			email,
			isVerified,
			imageUrl,
			description,
		};

		if (profileToEdit) variables.id = profileToEdit.id;

		try {
			if (profileToEdit) {
				const { data } = await updateProfile({ variables });
				console.log("Profile updated:", data.updateProfile);
			} else {
				const { data } = await createProfile({ variables });
				console.log("Profile created:", data.createProfile);
			}
			setImageUrl("");
			setEmail("");
			setFirstName("");
			setLastName("");
			setDescription("");
			setIsVerified(false);
			closeModal();
		} catch (error) {
			console.error("Error in mutating profile:", error);
		}
	};

	return (
		// <SidePanel open={isOpen} onClose={closeModal}>
		<Dialog
			open={isOpen}
			onClose={closeModal}
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "flex-end",
			}}
			PaperProps={{
				sx: {
					backgroundColor: "popup.main",
					// width: "50%",
					height: "100%",
					maxHeight: "100%",
					display: "flex",
					flexDirection: "column",
					position: "absolute",
					right: 0,
					"@media (min-width: 600px)": {
						width: "50%",
					},
				},
			}}
			fullScreen
			TransitionComponent={Transition}
		>
			<DialogTitle>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Typography style={{ display: "flex", alignItems: "center" }}>
						Create Profile
					</Typography>
					<IconButton edge="end" color="inherit" onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</div>
			</DialogTitle>
			<DialogContent>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<InputLabel shrink htmlFor="bootstrap-input" size="small">
							Image link
						</InputLabel>
						<TextField
							size="small"
							value={imageUrl}
							onChange={(e) => setImageUrl(e.target.value)}
							fullWidth
						/>
					</Grid>
					<Grid item xs={6}>
						<InputLabel shrink htmlFor="bootstrap-input">
							First Name
						</InputLabel>
						<TextField
							size="small"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							fullWidth
						/>
					</Grid>
					<Grid item xs={6}>
						<InputLabel shrink htmlFor="bootstrap-input">
							Last Name
						</InputLabel>
						<TextField
							size="small"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<InputLabel shrink htmlFor="bootstrap-input">
							Email
						</InputLabel>
						<TextField
							size="small"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<InputLabel shrink htmlFor="bootstrap-input">
							Description
						</InputLabel>
						<TextField
							placeholder="Write a description for the talent"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							fullWidth
							multiline
							rows={4}
						/>
					</Grid>
					<Grid item xs={12}>
						<InputLabel shrink htmlFor="bootstrap-input">
							Verification
						</InputLabel>
						<StyledDiv>
							<Typography variant="body2" style={{ marginRight: "10px" }}>
								{isVerified ? "Talent is Verified" : "Talent is not Verified"}
							</Typography>
							<Switch
								color="info"
								required
								size="small"
								checked={isVerified}
								onChange={handleToggleChange}
							/>
						</StyledDiv>
					</Grid>
				</Grid>
			</DialogContent>
			<Divider />
			<DialogActions>
				<StyledSubmitButton
					onClick={handleSubmit}
					variant="contained"
					color="info"
				>
					{profileToEdit ? `Update` : `Create`}
					{` Profile`}
				</StyledSubmitButton>
			</DialogActions>
		</Dialog>
	);
};

export default ProfileModal;
