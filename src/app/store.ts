import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { api as userDataApi } from './api/baseApi'

export const store = configureStore({
    reducer: {
        [userDataApi.reducerPath]: userDataApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userDataApi.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
