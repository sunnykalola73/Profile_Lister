import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import _debounce from "loadsh/debounce";
import InfiniteScroll from "react-infinite-scroll-component";
import CircleLoading from "./LoadingUI";
import { css } from "@emotion/react";

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
	textWrap: "nowrap",
	fontSize: "14px",
	letterSpacing: "0.25px",
});

const StyledContainer = styled(Container)(
	({ theme }) => css`
		@media (min-width: ${theme.breakpoints.values.md}px) {
			width: 80%;
		}
	`,
	{
		minHeight: "101vh",
		overflow: "auto",
		scrollbarWidth: "thin",
	}
);

function CardView() {
	const [searchString, setSearchString] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [profileToEdit, setProfileToEdit] = useState(null);

	const [isRemoveProfileOpen, setIsRemoveProfileOpen] = useState(false);
	const [profileRemoveId, setProfileRemoveId] = useState("");

	const rowsPerFetchCall = 16;
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

	const { loading, error, data, refetch, fetchMore } = useQuery(
		GET_ALL_PROFILES,
		{
			variables: {
				orderBy: { key: "is_verified", sort: "desc" },
				rows: rowsPerFetchCall,
				page: 0,
				searchString: `.*${searchString}.*`,
			},
		}
	);

	useEffect(
		_debounce(() => {
			fetchMore({
				variables: {
					page: 0, // Reset the page to 0 when searching
					searchString: searchString,
				},
				updateQuery: (prevResult, { fetchMoreResult }) => fetchMoreResult,
			});
		}, 500),
		[searchString, fetchMore]
	);

	const loadMore = () => {
		fetchMore({
			variables: {
				page: data.getAllProfiles.profiles.length / rowsPerFetchCall,
				searchString: searchString,
			},
			updateQuery: (prevResult, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prevResult;
				return {
					getAllProfiles: {
						...fetchMoreResult.getAllProfiles,
						profiles: [
							...prevResult.getAllProfiles.profiles,
							...fetchMoreResult.getAllProfiles.profiles,
						],
					},
				};
			},
		});
	};

	return (
		<StyledContainer>
			{/* Searchbar and Create Profile Icon */}
			<Grid
				container
				spacing={2}
				alignItems="center"
				style={{ padding: "16px" }}
			>
				<Grid item xs={12} sm={8} md={9} lg={10}>
					<TextField
						label="Search"
						onChange={handleSearch}
						variant="outlined"
						value={searchString}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12} sm={4} md={3} lg={2}>
					<Button
						style={{ height: "40px" }}
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
			<InfiniteScroll
				dataLength={data?.getAllProfiles?.profiles?.length || 0}
				next={loadMore}
				hasMore={
					!loading &&
					data?.getAllProfiles?.size > data?.getAllProfiles?.profiles?.length
				}
				loader={<CircleLoading />}
				endMessage={<p>No more profiles to load.</p>}
			>
				<CardLayoutContainer
					setProfileRemoveId={setProfileRemoveId}
					setProfileToEdit={setProfileToEdit}
					openModal={openModal}
					loading={loading}
					error={error}
					data={data}
					openRemoveProfileModal={openRemoveProfileModal}
				/>
			</InfiniteScroll>
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
		</StyledContainer>
	);
}

export default CardView;
