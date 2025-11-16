import { PayloadAction, WritableDraft } from '@reduxjs/toolkit';
import { SelectionState } from '../model/selectionSlice';
import { Id } from '../../../shared/model/id/Id';

function setSelectedSlideImp(state: WritableDraft<SelectionState>, action: PayloadAction<Id>) {
	state.selectedSlides = [action.payload];
}

function addSelectedSlideImp(state: WritableDraft<SelectionState>, action: PayloadAction<Id>) {
	const { selectedSlides } = state;
	if (!selectedSlides.includes(action.payload)) {
		selectedSlides.push(action.payload);
	}
}

function setSelectedObjImp(state: WritableDraft<SelectionState>, action: PayloadAction<Id>) {
	state.selectedObj = [action.payload];
}

function addSelectedObjImp(state: WritableDraft<SelectionState>, action: PayloadAction<Id>) {
	const { selectedObj } = state;
	if (!selectedObj.includes(action.payload)) {
		selectedObj.push(action.payload);
	}
}

function clearSelectionObjsImp(state: WritableDraft<SelectionState>) {
	state.selectedObj = [];
}

function clearSelectionSlidesImp(state: WritableDraft<SelectionState>) {
	state.selectedSlides = [];
}

export {
	setSelectedSlideImp,
	addSelectedSlideImp,
	setSelectedObjImp,
	addSelectedObjImp,
	clearSelectionObjsImp,
	clearSelectionSlidesImp,
};
