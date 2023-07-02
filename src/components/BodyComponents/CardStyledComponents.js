import {
	CardHeader,
	Avatar,
	IconButton,
	CardContent,
	Typography,
	Card,
	styled,
} from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
	borderRadius: "8px",
	width: "100%",
	height: 200,
	padding: "24px",
	backgroundColor: theme.palette.secondary.main,
	"& .MuiCardHeader-content": {
		textOverflow: "ellipsis",
		overflow: "hidden",
		whiteSpace: "nowrap",
		maxWidth: "70%",
	},
}));

export const ProfileImage = styled(Avatar)({
	width: "64px",
	height: "64px",
});

export const NameWrapper = styled("div")({
	display: "flex",
	alignItems: "center",
});

export const InlineContainer = styled("div")({
	display: "flex",
	alignItems: "center",
	maxWidth: "190px",
	overflowX: "auto",
});

export const StyledName = styled(Typography)({
	fontSize: "16px",
	fontWeight: 500,
	letterSpacing: "0.5px",
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
});

export const LogoVerified = styled("img")({
	padding: 2,
});

export const StyledEmail = styled(Typography)({
	fontSize: "14px",
	fontWeight: "400",
	lineHeight: "20px",
	letterSpacing: "0.25px",
	overflow: "hidden",
	textOverflow: "ellipsis",
	whiteSpace: "nowrap",
});

export const StyledCardContent = styled(CardContent)({
	padding: "0px !important",
	fontSize: "12px",
	fontWeight: "400",
	lineHeight: "16px",
	letterSpacing: "0.4px",
	maxHeight: "112px", // Adjust the height based on line height and desired maximum lines
	overflow: "hidden",
	display: "-webkit-box",
	WebkitLineClamp: 5,
	WebkitBoxOrient: "vertical",
	marginTop: "10px",
});

export const StyledCardHeader = styled(CardHeader)({
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	padding: 0,
	"& .MuiCardHeader-action": {
		alignSelf: "center",
	},
});

export const MoreOption = styled(IconButton)({
	padding: 0,
});
