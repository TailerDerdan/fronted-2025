import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Id } from '../../../shared/model/id/Id';
import {
	addSelectedObjImp,
	addSelectedSlideImp,
	clearSelectionObjsImp,
	clearSelectionSlidesImp,
	setSelectedObjImp,
	setSelectedSlideImp,
} from '../lib/impSelection';

export type SelectionState = {
	selectedSlides: Array<Id>; //TODO: currentSlide = selectedSlide[0]
	selectedObj: Array<Id>;
};

const initialState: SelectionState = {
	selectedSlides: [],
	selectedObj: [],
};

const selectionSlices = createSlice({
	name: 'selection',
	initialState,
	reducers: {
		setSelectedSlide: (state, action: PayloadAction<Id>) => {
			setSelectedSlideImp(state, action);
		},
		addSelectedSlide: (state, action: PayloadAction<Id>) => {
			addSelectedSlideImp(state, action);
		},
		setSelectedObj: (state, action: PayloadAction<Id>) => {
			setSelectedObjImp(state, action);
		},
		addSelectedObj: (state, action: PayloadAction<Id>) => {
			addSelectedObjImp(state, action);
		},
		clearSelectionObjs: state => {
			clearSelectionObjsImp(state);
		},
		clearSelectionSlides: state => {
			clearSelectionSlidesImp(state);
		},
	},
});

export const {
	setSelectedSlide,
	addSelectedSlide,
	setSelectedObj,
	addSelectedObj,
	clearSelectionObjs,
	clearSelectionSlides,
} = selectionSlices.actions;

export default selectionSlices.reducer;
