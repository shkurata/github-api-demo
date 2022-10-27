import { GraphQLClient, gql } from 'graphql-request';
import { UserProfile } from './interfaces';

const searchUsersQuery = gql`
	query SearchUsers($query: String!) {
		search(query: $query, type: USER, first: 10) {
			__typename
			nodes {
				... on User {
					__typename
					login
					name
					avatarUrl
				}
			}
			pageInfo {
				endCursor
				hasNextPage
			}
		}
	}
`;

const endpoint = process.env.REACT_APP_GITHUB_URL as string;
const authorization = `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`;

const graphQLClient = new GraphQLClient(endpoint, {
	headers: { authorization },
});

export const searchUsers = async (query: string): Promise<UserProfile[]> => {
	if (!query) {
		return [];
	}
	const variables = { query };
	const data = await graphQLClient.request(searchUsersQuery, variables);
	return data.search.nodes;
};
