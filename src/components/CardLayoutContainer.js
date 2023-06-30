import React from "react";
import { Grid } from "@mui/material";
import DisplayCard from "./Card";
import CircleLoading from "./LoadingUI";

function CardLayoutContainer({
	loading,
	error,
	data: { getAllProfiles } = {},
	setProfileToEdit,
	openModal,
	openRemoveProfileModal,
	setProfileRemoveId,
}) {
	if (loading) return <CircleLoading />;
	if (error) return <p>Something went wrong.</p>;
	if (getAllProfiles.profiles.length === 0) return <p>No Data </p>;
	return (
		<Grid container spacing={1}>
			{getAllProfiles.profiles.map((profile, idx) => (
				<Grid item xs={12} sm={6} md={3} key={idx}>
					<DisplayCard
						setProfileRemoveId={setProfileRemoveId}
						openRemoveProfileModal={openRemoveProfileModal}
						openModal={openModal}
						setProfileToEdit={setProfileToEdit}
						profile={profile}
					/>
				</Grid>
			))}
		</Grid>
	);
}
export default CardLayoutContainer;
