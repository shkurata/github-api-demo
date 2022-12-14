import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { profileReducer } from 'src/features/profile';
import { api } from './api/baseApi';

export const store = configureStore({
	reducer: {
		profile: profileReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
