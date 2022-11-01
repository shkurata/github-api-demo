import { GraphQLClient, gql } from 'graphql-request';
import { UserProfile } from './interfaces';

const searchUsersQuery = gql`
	query SearchUsers($query: String!) {
		search(query: $query, type: USER, first: 10) {
			__typename
			nodes {
				... on User {
					__typename
					id
					login
					name
					avatarUrl(size: 100)
					email
					url
					websiteUrl
					repositories {
						totalCount
					}
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

let abortController: AbortController | null = null;

export const searchUsers = async (query: string): Promise<UserProfile[]> => {
	if (abortController) {
		abortController.abort();
	}

	abortController = new AbortController();

	const graphQLClient = new GraphQLClient(endpoint, {
		headers: { authorization },
		signal: abortController.signal as any,
	});

	const data = await graphQLClient.request(searchUsersQuery, { query });
	abortController = null;
	return data.search.nodes;
};
