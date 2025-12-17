import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './rootState';

export type PresentationState = {
	name: string;
	id: string;
};

const initialState: PresentationState = {
	name: 'Новая презентация',
	id: '',
};

const presentationSlices = createSlice({
	name: 'presentation',
	initialState,
	reducers: {
		setNamePresentation: (state, action: PayloadAction<string>) => {
			state.name = action.payload;
		},
		setIdPres: (state, action: PayloadAction<string>) => {
			state.id = action.payload;
		},
		setPres: (state, action: PayloadAction<RootState>) => {
			state.name = action.payload.presentation.name;
		},
	},
});

export const { setNamePresentation, setIdPres, setPres } = presentationSlices.actions;

export default presentationSlices.reducer;
