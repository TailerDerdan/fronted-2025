import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Id } from '../../../shared/model/id/Id';
import { Slide } from '../../slide/model/types';
import { SlideObj } from '../../../shared/model/objOnSlide';
import { Background } from '../../../shared/model/background/Background';
import {
	addObjOnCurrentSlideImp,
	addSlideImp,
	deleteObjsImp,
	deleteSlidesImp,
	setBackgroundImp,
	setPositionSlideImp,
	updateImageImp,
	updateRectObjImp,
	updateTextBoxImp,
} from '../lib/impSlide';
import { TextBox } from '../../../shared/model/textbox/types';
import { Image } from '../../../shared/model/image/types';
import { Rect } from '../../../shared/model/geometry/rect/model/types';

export type SlidesState = {
	slideList: Record<Id, Slide>;
	slideOrder: Array<Id>;
};

const initialState: SlidesState = {
	slideList: {},
	slideOrder: [],
};

const slidesSlices = createSlice({
	name: 'slides',
	initialState,
	reducers: {
		setSlidesState: (state, action: PayloadAction<SlidesState>) => {
			state.slideList = action.payload.slideList;
			state.slideOrder = action.payload.slideOrder;
		},
		addSlide: (state, action: PayloadAction<Id>) => {
			addSlideImp(state, action);
		},
		deleteSlides: (state, action: PayloadAction<Array<Id>>) => {
			deleteSlidesImp(state, action);
		},
		deleteObjs: (state, action: PayloadAction<{ ids: Array<Id>; idSlide: Id }>) => {
			deleteObjsImp(state, action);
		},
		setPositionSlide: (
			state,
			action: PayloadAction<{ newPos: Array<{ fromIndex: number; toIndex: number }> }>,
		) => {
			setPositionSlideImp(state, action);
		},
		addObjOnCurrentSlide: (
			state,
			action: PayloadAction<{ idSlide: Id; idObj: Id; slideObj: SlideObj }>,
		) => {
			addObjOnCurrentSlideImp(state, action);
		},
		updateTextBox: (
			state,
			action: PayloadAction<{ idSlide: Id; idTextBox: Id; newTextBox: TextBox }>,
		) => {
			updateTextBoxImp(state, action);
		},
		updateImage: (state, action: PayloadAction<{ idSlide: Id; idImage: Id; newImage: Image }>) => {
			updateImageImp(state, action);
		},
		updateRectObj: (state, action: PayloadAction<{ idSlide: Id; idObj: Id; newRect: Rect }>) => {
			updateRectObjImp(state, action);
		},
		setBackground: (state, action: PayloadAction<{ idSlide: Id; newBack: Background }>) => {
			setBackgroundImp(state, action);
		},
	},
});

export const {
	addSlide,
	deleteSlides,
	deleteObjs,
	setPositionSlide,
	addObjOnCurrentSlide,
	updateTextBox,
	updateImage,
	updateRectObj,
	setBackground,
	setSlidesState,
} = slidesSlices.actions;

export default slidesSlices.reducer;
