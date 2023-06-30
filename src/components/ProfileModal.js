import React, { useEffect, useState } from "react";
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Grid,
	TextField,
	FormControlLabel,
	Switch,
} from "@mui/material";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_PROFILE_MUTATION, UPDATE_PROFILE } from "../.graphql/mutations";
import { styled } from "@mui/material/styles";

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

	const SidePanel = styled(Dialog)(({ open }) => ({
		"& .MuiDialog-paper": {
			width: "50%", // Adjust the width as per your requirements
			position: "fixed",
			height: "100%",
			top: 0,
			marginRight: 0,
			right: 0, // Position it on the right side
			transform: `translateX(${open ? "0" : "100%"})`, // Slide in from the right
			transition: "transform 0.3s ease-in-out",
			backgroundColor: "#fff",
			zIndex: 9999,
			boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
			overflowY: "auto",
			padding: "20px",
		},
	}));

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
		<SidePanel open={isOpen} onClose={closeModal}>
			<DialogTitle>Create Profile</DialogTitle>
			<DialogContent>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							label="Image Link"
							value={imageUrl}
							onChange={(e) => setImageUrl(e.target.value)}
							fullWidth
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="First Name"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							fullWidth
						/>
					</Grid>
					<Grid item xs={6}>
						<TextField
							label="Last Name"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Email Address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							fullWidth
							multiline
							rows={4}
						/>
					</Grid>
					<Grid item xs={12}>
						<FormControlLabel
							labelPlacement="start"
							control={
								<Switch
									color="info"
									edge="end"
									required="true"
									size="medium"
									checked={isVerified}
									onChange={handleToggleChange}
								/>
							}
							label="Telent is Verified"
						/>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleSubmit} variant="contained" color="primary">
					{profileToEdit ? `Update` : `Create`}
				</Button>
			</DialogActions>
		</SidePanel>
	);
};

export default ProfileModal;
