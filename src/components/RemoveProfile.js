import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Typography,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { DELETE_PROFILE } from "../.graphql/mutations";

function RemoveProfileDialog({
	profileRemoveId,
	isRemoveProfileOpen,
	closeRemoveProfileModal,
	refetch,
	setSearchString,
}) {
	const [deleteProfile] = useMutation(DELETE_PROFILE);
	const handleRemoveProfile = async () => {
		try {
			await deleteProfile({
				variables: { deleteProfileId: profileRemoveId },
			});
			console.log("Profile removed successfully");
			setSearchString("");
			refetch();
		} catch (error) {
			console.error("Error removing profile:", error);
		}
		closeRemoveProfileModal();
	};

	return (
		<Dialog open={isRemoveProfileOpen} onClose={closeRemoveProfileModal}>
			<DialogTitle>Remove Profile</DialogTitle>
			<DialogContent>
				<Typography>
					Removed profile will be deleted permenantly and won't be available
					anymore.
				</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeRemoveProfileModal} color="secondary">
					Cancel
				</Button>
				<Button onClick={handleRemoveProfile} color="secondary">
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default RemoveProfileDialog;
