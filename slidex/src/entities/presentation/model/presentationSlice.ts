import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './rootState';

export type PresentationState = {
	name: string;
};

const initialState: PresentationState = {
	name: 'Новая презентация',
};

const presentationSlices = createSlice({
	name: 'presentation',
	initialState,
	reducers: {
		setNamePresentation: (state, action: PayloadAction<string>) => {
			state.name = action.payload;
		},
		setPres: (state, action: PayloadAction<RootState>) => {
			state.name = action.payload.presentation.name;
		},
	},
});

export const { setNamePresentation, setPres } = presentationSlices.actions;

export default presentationSlices.reducer;
