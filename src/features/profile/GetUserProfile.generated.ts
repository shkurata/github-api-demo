// @ts-nocheck /* eslint-disable */ /** * * THIS FILE IS AUTOGENERATED, DO NOT EDIT IT! * * instead, edit one of the `.graphql` files in this project and run * * npm run graphql-codegen * * for this file to be re-created */

import * as Types from '../../app/services/types.generated'

import { api } from 'src/app/services/baseApi'
module.hot?.accept()
export type GetUserProfileQueryVariables = Types.Exact<{
    login: Types.Scalars['String']
}>

export type GetUserProfileQuery = {
    __typename?: 'Query'
    user?: {
        __typename?: 'User'
        id: string
        avatarUrl: any
        email: string
        url: any
        websiteUrl?: any
        repositories: { __typename?: 'RepositoryConnection'; totalCount: number }
    }
}

export const GetUserProfileDocument = `
    query GetUserProfile($login: String!) {
  user(login: $login) {
    id
    avatarUrl(size: 100)
    email
    url
    websiteUrl
    repositories {
      totalCount
    }
  }
}
    `

const injectedRtkApi = api.injectEndpoints({
    overrideExisting: module.hot?.status() === 'apply',
    endpoints: (build) => ({
        GetUserProfile: build.query<GetUserProfileQuery, GetUserProfileQueryVariables>({
            query: (variables) => ({ document: GetUserProfileDocument, variables }),
        }),
    }),
})

export { injectedRtkApi as api }
export const { useGetUserProfileQuery, useLazyGetUserProfileQuery } = injectedRtkApi