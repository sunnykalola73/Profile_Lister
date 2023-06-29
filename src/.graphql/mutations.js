import { gql } from "@apollo/client";

export const DELETE_PROFILE = gql`
	mutation DeleteProfile($deleteProfileId: String!) {
		deleteProfile(id: $deleteProfileId)
	}
`;

export const CREATE_PROFILE_MUTATION = gql`
	mutation CreateProfile(
		$firstName: String!
		$lastName: String!
		$email: String!
		$isVerified: Boolean!
		$imageUrl: String!
		$description: String!
	) {
		createProfile(
			first_name: $firstName
			last_name: $lastName
			email: $email
			is_verified: $isVerified
			image_url: $imageUrl
			description: $description
		) {
			id
			first_name
			last_name
			email
			is_verified
			image_url
			description
		}
	}
`;

export const UPDATE_PROFILE = gql`
	mutation UpdateProfile(
		$id: String!
		$firstName: String!
		$lastName: String!
		$email: String!
		$isVerified: Boolean!
		$imageUrl: String!
		$description: String!
	) {
		updateProfile(
			id: $id
			first_name: $firstName
			last_name: $lastName
			email: $email
			is_verified: $isVerified
			image_url: $imageUrl
			description: $description
		) {
			id
			first_name
			last_name
			email
			is_verified
			image_url
			description
		}
	}
`;

export const GET_ALL_PROFILES = gql`
	query GetAllProfiles(
		$orderBy: globalOrderBy
		$searchString: String
		$rows: Int
		$page: Int
	) {
		getAllProfiles(
			orderBy: $orderBy
			searchString: $searchString
			rows: $rows
			page: $page
		) {
			size
			profiles {
				id
				first_name
				last_name
				email
				is_verified
				image_url
				description
			}
		}
	}
`;
