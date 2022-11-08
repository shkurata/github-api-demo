import { api } from './baseApi';
import {
	GetUserReposDocument,
	GetUserReposQuery,
	GetUserReposQueryVariables,
	PageInfo,
} from './types.generated';
export interface Repo {
	id: string;
	name: string;
	description?: string;
	primaryLanguage?: string;
	updatedAt: string;
}

type UserRepositories = {
	repos: Repo[] | undefined;
	pageInfo: Partial<PageInfo> | undefined;
};

const injectedApi = api.injectEndpoints({
	endpoints: (build) => ({
		getRepos: build.query<UserRepositories, GetUserReposQueryVariables>({
			query: (variables) => ({
				document: GetUserReposDocument,
				variables,
			}),
			transformResponse: (
				response: GetUserReposQuery,
			): UserRepositories => {
				return {
					repos: response?.user?.repositories?.nodes?.map((repo) => ({
						...repo,
						primaryLanguage: repo.primaryLanguage?.name,
					})),
					pageInfo: response?.user?.repositories.pageInfo,
				};
			},
		}),
	}),
});

export default injectedApi;
export const { useGetReposQuery, useLazyGetReposQuery } = injectedApi;
