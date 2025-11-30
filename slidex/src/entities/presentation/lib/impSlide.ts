import { PayloadAction, WritableDraft } from '@reduxjs/toolkit';
import { Id } from '../../../shared/model/id/Id';
import { SlidesState } from '../model/slideSlice';
import { addObjectInSlide, createSlide } from '../../slide/lib/slide';
import { SlideObj } from '../../../shared/model/objOnSlide';
import { Slide } from '../../slide/model/types';
import { TextBox } from '../../../shared/model/textbox/types';
import { Image } from '../../../shared/model/image/types';
import { Rect } from '../../../shared/model/geometry/rect/model/types';
import { Background } from '../../../shared/model/background/Background';

function addSlideImp(state: WritableDraft<SlidesState>, action: PayloadAction<Id>) {
	const idSlide = action.payload;
	const { slideList, slideOrder } = state;

	const slide = createSlide();
	slideOrder.push(idSlide);
	slideList[idSlide] = slide;
}

function deleteSlidesImp(state: WritableDraft<SlidesState>, action: PayloadAction<Array<Id>>) {
	const { slideList, slideOrder } = state;
	const { payload } = action;

	let indexInSlideOrder = 0;

	payload.forEach((idSlide: Id) => {
		indexInSlideOrder = slideOrder.indexOf(idSlide);
		if (indexInSlideOrder != -1) {
			delete slideList[idSlide];
			slideOrder.splice(indexInSlideOrder, 1);
		}
	});
}

function deleteObjsImp(
	state: WritableDraft<SlidesState>,
	action: PayloadAction<{ ids: Array<Id>; idSlide: Id }>,
) {
	const { slideList } = state;
	const { ids, idSlide } = action.payload;

	if (!slideList[idSlide]) return;

	let indexInLayers = 0;

	ids.forEach((idObj: Id) => {
		indexInLayers = slideList[idSlide].layersOfSlide.indexOf(idSlide);
		if (indexInLayers != -1) {
			delete slideList[idSlide].objects[idObj];
			slideList[idSlide].layersOfSlide.splice(indexInLayers, 1);
		}
	});
}

function setPositionSlideImp(
	state: WritableDraft<SlidesState>,
	action: PayloadAction<{ newPos: Array<{ fromIndex: number; toIndex: number }> }>,
) {
	const { slideOrder } = state;
	const { newPos } = action.payload;

	if (newPos.length === 0) return;

	const fromIndexes = new Set(newPos.map(move => move.fromIndex));
	const filteredOrder = slideOrder.filter((_, index) => !fromIndexes.has(index));

	newPos.forEach(moving => {
		filteredOrder.splice(moving.toIndex, 0, slideOrder[moving.fromIndex]);
	});

	state.slideOrder = filteredOrder;
}

function addObjOnCurrentSlideImp(
	state: WritableDraft<SlidesState>,
	action: PayloadAction<{ idSlide: Id; idObj: Id; slideObj: SlideObj }>,
) {
	const { slideList } = state;
	const { idSlide, slideObj, idObj } = action.payload;
	let currentObjSlide: Slide = slideList[idSlide];

	currentObjSlide = addObjectInSlide(currentObjSlide, slideObj, idObj);
	slideList[idSlide] = currentObjSlide;
}

function updateTextBoxImp(
	state: WritableDraft<SlidesState>,
	action: PayloadAction<{ idSlide: Id; idTextBox: Id; newTextBox: TextBox }>,
) {
	const { idTextBox, newTextBox, idSlide } = action.payload;
	const { slideList } = state;

	const currentObjSlide: Slide = slideList[idSlide];

	if (currentObjSlide.objects[idTextBox]) {
		currentObjSlide.objects[idTextBox] = newTextBox;
	}

	slideList[idSlide] = currentObjSlide;
}

function updateImageImp(
	state: WritableDraft<SlidesState>,
	action: PayloadAction<{ idSlide: Id; idImage: Id; newImage: Image }>,
) {
	const { idImage, newImage, idSlide } = action.payload;
	const { slideList } = state;

	const currentObjSlide: Slide = slideList[idSlide];

	if (currentObjSlide.objects[idImage]) {
		currentObjSlide.objects[idImage] = newImage;
	}

	slideList[idImage] = currentObjSlide;
}

function updateRectObjImp(
	state: WritableDraft<SlidesState>,
	action: PayloadAction<{ idSlide: Id; idObj: Id; newRect: Rect }>,
) {
	const { idObj, newRect, idSlide } = action.payload;
	const { slideList } = state;

	const currentObjSlide: Slide = slideList[idSlide];

	if (currentObjSlide.objects[idObj]) {
		currentObjSlide.objects[idObj]!.rect = newRect;
	}

	slideList[idSlide] = currentObjSlide;
}

function setBackgroundImp(
	state: WritableDraft<SlidesState>,
	action: PayloadAction<{ idSlide: Id; newBack: Background }>,
) {
	const { slideList } = state;
	const { idSlide, newBack } = action.payload;

	const currentObjSlide: Slide = slideList[idSlide];

	currentObjSlide.background = newBack;

	slideList[idSlide] = currentObjSlide;
}

export {
	addSlideImp,
	deleteSlidesImp,
	deleteObjsImp,
	setPositionSlideImp,
	addObjOnCurrentSlideImp,
	updateTextBoxImp,
	updateImageImp,
	updateRectObjImp,
	setBackgroundImp,
};
