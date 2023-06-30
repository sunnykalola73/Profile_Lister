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
} from "@mui/material";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_PROFILE_MUTATION, UPDATE_PROFILE } from "../.graphql/mutations";

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="left" ref={ref} {...props} />;
});
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
				width: "50%"
				display: "flex",
				alignItems: "center",
				justifyContent: "flex-end !important",
			}}
			fullScreen
			TransitionComponent={Transition}
		>
			<DialogTitle>Create Profile</DialogTitle>
			<DialogContent>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<InputLabel shrink htmlFor="bootstrap-input">
							Image link
						</InputLabel>
						<TextField
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
						<div
							style={{ display: "flex", width: "100%", alignItems: "center" }}
						>
							<Typography variant="body1" style={{ marginRight: "10px" }}>
								{isVerified ? "Talent is Verified" : "Talent is not Verified"}
							</Typography>
							<Switch
								color="info"
								edge="end"
								required="true"
								size="medium"
								checked={isVerified}
								onChange={handleToggleChange}
							/>
						</div>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleSubmit} variant="contained" color="info">
					{profileToEdit ? `Update` : `Create`}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ProfileModal;
