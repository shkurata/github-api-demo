import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'

const baseQuery = graphqlRequestBaseQuery({
    url: `${process.env.REACT_APP_GITHUB_URL}`,
    requestHeaders: {
        authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
    },
})

export const api = createApi({
    reducerPath: 'githubApi',
    baseQuery,
    endpoints: () => ({}),
})

export const helperApi = createApi({
    baseQuery,
    endpoints: () => ({}),
})
