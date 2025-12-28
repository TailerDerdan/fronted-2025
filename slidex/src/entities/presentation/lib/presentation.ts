import { Id } from '../../../shared/model/id/Id';
import { SlideObj } from '../../../shared/model/objOnSlide';
import { Slide } from '../../slide/model/types';
import { Presentation } from '../model/types';

function createPresentation(): Presentation {
	return {
		slideList: {},
		slideOrder: [],
		selectedSlides: [],
		selectedObjs: [],
		name: '',
	};
}

function getSelectedObjects(
	selectedIdObjs: Array<Id>,
	slideList: Record<Id, Slide>,
	idCurrentSlide: Id,
): Array<SlideObj> {
	if (!slideList[idCurrentSlide]) return [];

	const selectedObjs: SlideObj[] = [];
	let obj = null;
	selectedIdObjs.forEach((idObj: Id) => {
		obj = slideList[idCurrentSlide].objects[idObj];
		if (obj) {
			selectedObjs.push(obj);
		}
	});

	return selectedObjs;
}

function getSelectedSlides(selectediIdSlides: Array<Id>, slideList: Record<Id, Slide>): Array<Slide> {
	if (selectediIdSlides.length == 0) return [];

	const selectedSlides: Slide[] = [];
	let slide = null;
	selectediIdSlides.forEach((idSlide: Id) => {
		slide = slideList[idSlide];
		if (slide) {
			selectedSlides.push(slide);
		}
	});
	return selectedSlides;
}

function getCurrentSlide(selectediIdSlides: Array<Id>, slideList: Record<Id, Slide>): Slide | undefined {
	// console.log(selectediIdSlides, slideList, 'getCurrentSlide');
	if (selectediIdSlides[0]) {
		return slideList[selectediIdSlides[0]];
	}
	if (slideList[Object.keys(slideList)[0]]) {
		return slideList[Object.keys(slideList)[0]];
	}
	return undefined;
}

export { createPresentation, getSelectedObjects, getSelectedSlides, getCurrentSlide };
