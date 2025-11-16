import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
	},
});

export const { setNamePresentation } = presentationSlices.actions;

export default presentationSlices.reducer;
