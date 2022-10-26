import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'

const baseQuery = graphqlRequestBaseQuery({
    url: 'https://api.github.com/graphql',
    requestHeaders: {
        authorization: 'Bearer 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',
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
