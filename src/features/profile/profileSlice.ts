import {
	createSlice,
	PayloadAction,
	SliceCaseReducers,
} from '@reduxjs/toolkit';
import { RootState } from 'src/app/store';
import { UserProfile } from './interfaces';

type ProfileState = {
	value: UserProfile | null;
};

const initialState: ProfileState = {
	value: null as UserProfile | null,
};

export const profileSlice = createSlice<
	ProfileState,
	SliceCaseReducers<ProfileState>
>({
	name: 'profile',
	initialState,
	reducers: {
		setProfile(state, action: PayloadAction<UserProfile>) {
			state.value = action.payload;
		},
	},
});

export const { setProfile } = profileSlice.actions;
export const getUserProfile = (state: RootState) => state.profile.value;
export const profileReducer = profileSlice.reducer;
