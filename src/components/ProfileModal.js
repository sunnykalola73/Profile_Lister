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
		<Dialog open={isOpen} onClose={closeModal}>
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
							control={
								<Switch checked={isVerified} onChange={handleToggleChange} />
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
		</Dialog>
	);
};

export default ProfileModal;
