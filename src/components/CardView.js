import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import _debounce from "loadsh/debounce";

import { Container, Button, Grid, TextField, Typography } from "@mui/material";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import styled from "@emotion/styled";
import CardLayoutContainer from "./CardLayoutContainer";
import ProfileModal from "./ProfileModal";
import RemoveProfileDialog from "./RemoveProfile";
import { GET_ALL_PROFILES } from "../.graphql/mutations";

const CreateProfileText = styled(Typography)({
	textTransform: "initial",
	marginLeft: 4,
});

function CardView() {
	const [searchString, setSearchString] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [profileToEdit, setProfileToEdit] = useState(null);

	const [isRemoveProfileOpen, setIsRemoveProfileOpen] = useState(false);
	const [profileRemoveId, setProfileRemoveId] = useState("");

	const handleSearch = useCallback((event) => {
		const { value } = event.target;
		setSearchString(value);
	}, []);

	// For opening and closing a edit profile and create profile modal
	const openModal = useCallback(() => {
		setIsOpen(true);
	}, []);

	const closeModal = useCallback(() => {
		setIsOpen(false);
	}, []);

	// For opening and closing a remove profile modal
	const openRemoveProfileModal = useCallback(() => {
		setIsRemoveProfileOpen(true);
	}, []);
	const closeRemoveProfileModal = useCallback(() => {
		setIsRemoveProfileOpen(false);
	}, []);

	const { loading, error, data, refetch } = useQuery(GET_ALL_PROFILES, {
		variables: {
			orderBy: { key: "is_verified", sort: "desc" },
			rows: 16,
			page: 0,
			searchString: searchString,
		},
	});

	useEffect(
		_debounce(() => {
			refetch();
		}, 500),
		[searchString, refetch]
	);

	return (
		<Container maxWidth="xl">
			{/* Searchbar and Create Profile Icon */}
			<Grid
				container
				spacing={2}
				alignItems="center"
				style={{ padding: "16px" }}
			>
				<Grid item xs={12} sm={6} md={4} lg={10}>
					<TextField
						label="Search"
						onChange={handleSearch}
						variant="outlined"
						value={searchString}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={2}>
					<Button
						variant="outlined"
						size="large"
						color="info"
						onClick={openModal}
					>
						<PersonAddAltRoundedIcon />
						<CreateProfileText>Create Profile</CreateProfileText>
					</Button>
				</Grid>
			</Grid>

			{/* To Display data in a Frid format */}
			<CardLayoutContainer
				setProfileRemoveId={setProfileRemoveId}
				setProfileToEdit={setProfileToEdit}
				openModal={openModal}
				loading={loading}
				error={error}
				data={data}
				openRemoveProfileModal={openRemoveProfileModal}
			/>
			<ProfileModal
				profileToEdit={profileToEdit}
				isOpen={isOpen}
				closeModal={closeModal}
			/>
			<RemoveProfileDialog
				setSearchString={setSearchString}
				refetch={refetch}
				profileRemoveId={profileRemoveId}
				isRemoveProfileOpen={isRemoveProfileOpen}
				closeRemoveProfileModal={closeRemoveProfileModal}
			/>
		</Container>
	);
}

export default CardView;
