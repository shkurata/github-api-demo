/* eslint-disable */ // @ts-nocheck /** * * THIS FILE IS AUTOGENERATED, DO NOT EDIT IT! * * instead, edit one of the `.graphql` files in this project and run * * npm run graphql-codegen * * for this file to be re-created */

import * as Types from '../../app/api/types.generated';

import { api } from '../../app/api/baseApi';
module.hot?.accept();
export type GetUserReposQueryVariables = Types.Exact<{
  login: Types.Scalars['String'];
  first: Types.Scalars['Int'];
  after?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type GetUserReposQuery = { __typename?: 'Query', user?: { __typename?: 'User', repositories: { __typename?: 'RepositoryConnection', edges?: Array<{ __typename?: 'RepositoryEdge', cursor: string, node?: { __typename?: 'Repository', id: string, name: string } }>, pageInfo: { __typename?: 'PageInfo', endCursor?: string, hasNextPage: boolean } } } };


export const GetUserReposDocument = `
    query GetUserRepos($login: String!, $first: Int!, $after: String) {
  user(login: $login) {
    repositories(first: $first, privacy: PUBLIC, after: $after) {
      edges {
        cursor
        node {
          id
          name
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  overrideExisting: module.hot?.status() === "apply",
  endpoints: (build) => ({
    GetUserRepos: build.query<GetUserReposQuery, GetUserReposQueryVariables>({
      query: (variables) => ({ document: GetUserReposDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useGetUserReposQuery, useLazyGetUserReposQuery } = injectedRtkApi;

