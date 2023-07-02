import React from "react";
import { Grid } from "@mui/material";
import DisplayCard from "./Card";
import CircleLoading from "./LoadingUI";

function CardLayoutContainer({
	loading,
	error,
	setProfileToEdit,
	openModal,
	openRemoveProfileModal,
	setProfileRemoveId,
	data: { getAllProfiles } = {},
}) {
	if (loading) return <CircleLoading />;
	// TODO: In Real project there ware better ways to handle it.
	if (error) return <p>Something went wrong.</p>;
	if (getAllProfiles.profiles.length === 0) return <p>No Data </p>;
	return (
		<Grid container spacing={3}>
			{getAllProfiles.profiles.map((profile, idx) => (
				<Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
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
