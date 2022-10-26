/* eslint-disable */ // @ts-nocheck /** * * THIS FILE IS AUTOGENERATED, DO NOT EDIT IT! * * instead, edit one of the `.graphql` files in this project and run * * npm run graphql-codegen * * for this file to be re-created */

import * as Types from '../../app/api/types.generated';

import { api } from 'src/app/api/baseApi';
module.hot?.accept();
export type SearchUsersQueryVariables = Types.Exact<{
  query: Types.Scalars['String'];
}>;


export type SearchUsersQuery = { __typename?: 'Query', search: { __typename: 'SearchResultItemConnection', nodes?: Array<{ __typename?: 'App' } | { __typename?: 'Discussion' } | { __typename?: 'Issue' } | { __typename?: 'MarketplaceListing' } | { __typename?: 'Organization' } | { __typename?: 'PullRequest' } | { __typename?: 'Repository' } | { __typename: 'User', login: string, name?: string, avatarUrl: any }>, pageInfo: { __typename?: 'PageInfo', endCursor?: string, hasNextPage: boolean } } };


export const SearchUsersDocument = `
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

const injectedRtkApi = api.injectEndpoints({
  overrideExisting: module.hot?.status() === "apply",
  endpoints: (build) => ({
    SearchUsers: build.query<SearchUsersQuery, SearchUsersQueryVariables>({
      query: (variables) => ({ document: SearchUsersDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useSearchUsersQuery, useLazySearchUsersQuery } = injectedRtkApi;

