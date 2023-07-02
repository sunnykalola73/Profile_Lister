import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Typography,
	IconButton,
	Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation } from "@apollo/client";
import { styled } from "@mui/material/styles";

import { DELETE_PROFILE } from "../../.graphql/mutations";

const StyledButton = styled(Button)({
	width: "160px",
	height: "36px",
	padding: "8px 12px 8px 12px",
	borderRadius: "6px",
	border: "1px",
	gap: "8px",
});

const StyledContent = styled(Typography)({
	fontSize: "14px",
	fontWeight: "400",
	lineHeight: "20px",
	letterSpacing: "0.25px",
	textAlign: "left",
});

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
			await refetch();
		} catch (error) {
			console.error("Error removing profile:", error);
		}
		closeRemoveProfileModal();
	};

	const handleClose = () => {
		closeRemoveProfileModal();
	};

	return (
		<Dialog
			open={isRemoveProfileOpen}
			onClose={closeRemoveProfileModal}
			fullWidth
			PaperProps={{
				sx: {
					maxWidth: "400px",
				},
			}}
		>
			<DialogTitle sx={{ padding: 0 }}>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						padding: "24px",
					}}
				>
					<Typography
						variant="h7"
						component="div"
						style={{ display: "flex", alignItems: "center" }}
					>
						Remove Profile
					</Typography>
					<IconButton edge="end" color="inherit" onClick={handleClose}>
						<CloseIcon />
					</IconButton>
				</div>
			</DialogTitle>
			<Divider />
			<DialogContent>
				<StyledContent>
					Removed profile will be deleted permanently and won't be available
					anymore.
				</StyledContent>
			</DialogContent>
			<Divider />
			<DialogActions
				sx={{
					alignSelf: "center",
					maxWidth: "96%",
				}}
			>
				<StyledButton onClick={closeRemoveProfileModal} variant="contained">
					Cancel
				</StyledButton>
				<StyledButton
					onClick={handleRemoveProfile}
					variant="contained"
					color="error"
				>
					Delete
				</StyledButton>
			</DialogActions>
		</Dialog>
	);
}

export default RemoveProfileDialog;
