import { createApi } from '@reduxjs/toolkit/query/react'
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query'

export const api = createApi({
    baseQuery: graphqlRequestBaseQuery({
        url: 'https://api.github.com/graphql',
        requestHeaders: {
            authorization: 'Bearer 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',
        },
    }),
    endpoints: () => ({}),
})
