import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircleLoading() {
	return (
		<Box
			sx={{
				display: "flex",
				marginTop: 2,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<CircularProgress color="info" />
		</Box>
	);
}
