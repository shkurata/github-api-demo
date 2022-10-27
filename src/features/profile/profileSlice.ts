import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from './interfaces';

export const profileSlice = createSlice({
	name: 'profile',
	initialState: {} as UserProfile,
	reducers: {
		setProfile: (state, action: PayloadAction<UserProfile>) => {
			state = action.payload;
		},
	},
});

export const { setProfile } = profileSlice.actions;
export const selectLogin = (state: UserProfile) => state.login;
export const profileReducer = profileSlice.reducer;
