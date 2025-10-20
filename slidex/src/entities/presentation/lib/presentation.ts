import { deepClone } from '../../../shared/lib/deepClone';
import { deepFreeze } from '../../../shared/lib/deepFreeze';
import { Background } from '../../../shared/model/background/Background';
import { Rect } from '../../../shared/model/geometry/rect/model/types';
import { generateId, Id } from '../../../shared/model/id/Id';
import { Image } from '../../image/model/types';
import { addObjectInSlide, createSlide, deleteObjectInSlide } from '../../slide/lib/slide';
import { Slide, SlideObj } from '../../slide/model/types';
import { TextBox } from '../../text-box/model/types';
import { Presentation } from '../model/types';

function createPresentation(): Presentation {
	return {
		slideList: new Map<Id, Slide>(),
		slideOrder: [],
		selectedSlides: [],
		currentSlide: null,
		name: '',
	};
}

function addSlide(slideMaker: Presentation): Presentation {
	deepFreeze(slideMaker);

	if (slideMaker.currentSlide && slideMaker.slideList.get(slideMaker.currentSlide)) {
		const currentSLide = slideMaker.slideList.get(slideMaker.currentSlide);
		if (currentSLide) {
			currentSLide.selectedObj = [];
		}
	}

	const slide = createSlide();
	const idNewSlide = generateId();
	const slideOrder: Array<string> = deepClone(slideMaker.slideOrder);
	slideOrder.push(idNewSlide);
	return {
		...slideMaker,
		slideList: slideMaker.slideList.set(idNewSlide, slide),
		slideOrder: slideOrder,
	};
}

function deleteSlide(slideMaker: Presentation, idSlide: Id): Presentation {
	deepFreeze(slideMaker);
	const slideList: Map<Id, Slide> = deepClone(slideMaker.slideList);
	const slideOrder: Array<Id> = deepClone(slideMaker.slideOrder);
	const selectedSlides: Array<Id> = deepClone(slideMaker.selectedSlides);

	if (idSlide) {
		slideList.delete(idSlide);
	}

	let newCurrentSlide: Id | null = null;

	if (slideMaker.currentSlide && slideList.size >= 0) {
		let indexNewCurrentSlide = slideOrder.indexOf(idSlide);
		slideOrder.splice(indexNewCurrentSlide, 1);
		if (indexNewCurrentSlide >= slideList.size) {
			indexNewCurrentSlide--;
		}
		newCurrentSlide = slideOrder[indexNewCurrentSlide];
	}

	const indexIdSlideInSelected = selectedSlides.indexOf(idSlide);
	if (indexIdSlideInSelected >= 0) {
		selectedSlides.splice(indexIdSlideInSelected, 1);
		if (newCurrentSlide && selectedSlides.indexOf(newCurrentSlide) < 0) {
			selectedSlides.push(newCurrentSlide);
		}
	}

	return {
		...slideMaker,
		slideList: slideList,
		slideOrder: slideOrder,
		currentSlide: newCurrentSlide,
		selectedSlides: selectedSlides,
	};
}

function deleteSlides(slideMaker: Presentation): Presentation {
	deepFreeze(slideMaker);
	let newPresentation: Presentation = deepClone(slideMaker);
	const selectedSlides: Array<Id> = deepClone(newPresentation.selectedSlides);
	selectedSlides.forEach((slideId: Id) => {
		newPresentation = deleteSlide(newPresentation, slideId);
	});
	return newPresentation;
}

function setNamePresentation(slideMaker: Presentation, name: string): Presentation {
	deepFreeze(slideMaker);
	return {
		...slideMaker,
		name: name,
	};
}

export type PropsSetPositionSlide = {
	fromIndex: number;
	toIndex: number;
};

function setPositionSlide(slideMaker: Presentation, props: PropsSetPositionSlide): Presentation {
	const { fromIndex, toIndex } = props;
	deepFreeze(slideMaker);
	const slideOrder: Array<Id> = deepClone(slideMaker.slideOrder);
	const element = slideOrder[fromIndex];
	slideOrder.splice(fromIndex, 1);
	slideOrder.splice(toIndex, 0, element);
	return {
		...slideMaker,
		slideOrder: slideOrder,
	};
}

function getSelectedObjects(slideMaker: Presentation): Array<SlideObj> {
	deepFreeze(slideMaker);
	if (slideMaker.currentSlide === null) {
		return [];
	}

	const currentSlide = slideMaker.slideList.get(slideMaker.currentSlide);
	if (!currentSlide) {
		return [];
	}

	const selectedIdsSlideObj = currentSlide?.selectedObj;
	if (!selectedIdsSlideObj) {
		return [];
	}

	const selectedSlideObjs: Array<SlideObj> = [];
	selectedIdsSlideObj.forEach((id: Id) => {
		const obj = currentSlide.objects.get(id);
		if (obj) {
			selectedSlideObjs.push(obj);
		}
	});

	return selectedSlideObjs;
}

function getSelectedSlides(slideMaker: Presentation): Array<Slide> {
	deepFreeze(slideMaker);
	if (slideMaker.selectedSlides.length === 0) {
		return [];
	}

	const selectedSlides: Array<Slide> = [];
	slideMaker.selectedSlides.forEach((id: Id) => {
		const obj = slideMaker.slideList.get(id);
		if (obj) {
			selectedSlides.push(obj);
		}
	});

	return selectedSlides;
}

function setSelectedSlide(slideMaker: Presentation, newSelectedSlide: number): Presentation {
	deepFreeze(slideMaker);

	const newCurrentSlide = slideMaker.slideOrder[newSelectedSlide]
		? slideMaker.slideOrder[newSelectedSlide]
		: slideMaker.currentSlide;

	const selectedSlides = [];
	if (newCurrentSlide) {
		selectedSlides.push(newCurrentSlide);
	}

	return {
		...slideMaker,
		currentSlide: newCurrentSlide,
		selectedSlides: selectedSlides,
	};
}

function addSelectedSlide(slideMaker: Presentation, newSelectedSlide: number): Presentation {
	deepFreeze(slideMaker);
	const newSelectedSlides: Array<Id> = deepClone(slideMaker.selectedSlides);
	if (slideMaker.slideOrder[newSelectedSlide]) {
		newSelectedSlides.push(slideMaker.slideOrder[newSelectedSlide]);
	}
	return {
		...slideMaker,
		selectedSlides: newSelectedSlides,
	};
}

function setSelectedObj(slideMaker: Presentation, newSelectedObjId: Id): Presentation {
	deepFreeze(slideMaker);
	if (slideMaker.currentSlide === null) {
		return slideMaker;
	}

	const currentSlide = slideMaker.slideList.get(slideMaker.currentSlide);
	if (!currentSlide) {
		return slideMaker;
	}

	if (currentSlide?.objects.get(newSelectedObjId)) {
		currentSlide.selectedObj.splice(0, currentSlide.selectedObj.length);
		currentSlide.selectedObj.push(newSelectedObjId);
	}
	const newSlideList: Map<Id, Slide> = deepClone(slideMaker.slideList);
	if (currentSlide) {
		newSlideList.set(slideMaker.currentSlide, currentSlide);
	}
	return {
		...slideMaker,
		slideList: newSlideList,
	};
}

function addSelectedObj(slideMaker: Presentation, newSelectedObjId: Id): Presentation {
	deepFreeze(slideMaker);
	if (slideMaker.currentSlide === null) {
		return slideMaker;
	}

	const currentSlide = slideMaker.slideList.get(slideMaker.currentSlide);
	if (!createSlide) {
		return slideMaker;
	}

	if (currentSlide?.objects.get(newSelectedObjId)) {
		currentSlide.selectedObj.push(newSelectedObjId);
	}
	const newSlideList: Map<Id, Slide> = deepClone(slideMaker.slideList);
	if (currentSlide) {
		newSlideList.set(slideMaker.currentSlide, currentSlide);
	}
	return {
		...slideMaker,
		slideList: newSlideList,
	};
}

function clearSelectionObjs(slideMaker: Presentation): Presentation {
	deepFreeze(slideMaker);
	if (slideMaker.currentSlide === null) {
		return slideMaker;
	}

	const currentSlide = slideMaker.slideList.get(slideMaker.currentSlide);
	if (!createSlide) {
		return slideMaker;
	}

	currentSlide?.selectedObj.splice(0, currentSlide?.selectedObj?.length);

	const newSlideList: Map<Id, Slide> = deepClone(slideMaker.slideList);
	if (currentSlide) {
		newSlideList.set(slideMaker.currentSlide, currentSlide);
	}
	return {
		...slideMaker,
		slideList: newSlideList,
	};
}

function clearSelectionSlides(slideMaker: Presentation): Presentation {
	deepFreeze(slideMaker);

	return {
		...slideMaker,
		selectedSlides: [],
	};
}

function addObjOnCurrentSlide(slideMaker: Presentation, obj: SlideObj): Presentation {
	deepFreeze(slideMaker);
	const slideList: Map<Id, Slide> = deepClone(slideMaker.slideList);

	if (slideMaker.currentSlide === null) {
		return slideMaker;
	}

	let currentSlide: Slide | undefined = deepClone(slideList.get(slideMaker.currentSlide));

	if (!currentSlide) {
		return slideMaker;
	}
	currentSlide = addObjectInSlide(currentSlide, obj);
	currentSlide.selectedObj.splice(0);
	currentSlide.selectedObj.push(currentSlide.layersOfSlide[currentSlide.layersOfSlide.length - 1]);
	slideList.set(slideMaker.currentSlide, currentSlide);
	return {
		...slideMaker,
		slideList: slideList,
	};
}

function deleteSelectedObj(slideMaker: Presentation, idObj: Id): Presentation {
	deepFreeze(slideMaker);
	const slideList: Map<Id, Slide> = deepClone(slideMaker.slideList);

	if (slideMaker.currentSlide === null) {
		return slideMaker;
	}

	let currentSlide: Slide | undefined = deepClone(slideList.get(slideMaker.currentSlide));

	if (!currentSlide) {
		return slideMaker;
	}
	currentSlide = deleteObjectInSlide(currentSlide, idObj);
	slideList.set(slideMaker.currentSlide, currentSlide);
	return {
		...slideMaker,
		slideList: slideList,
	};
}

function deleteSelectedObjs(slideMaker: Presentation): Presentation {
	deepFreeze(slideMaker);

	if (slideMaker.currentSlide === null) {
		return slideMaker;
	}

	const currentSlide: Slide | undefined = slideMaker.slideList.get(slideMaker.currentSlide);
	if (!currentSlide) {
		return slideMaker;
	}

	let newPresentation: Presentation = deepClone(slideMaker);
	currentSlide.selectedObj.forEach((idObj: Id) => {
		newPresentation = deleteSelectedObj(newPresentation, idObj);
	});

	return newPresentation;
}

function getCurrentSlide(presentation: Presentation): Slide | undefined {
	if (!presentation.currentSlide) {
		return undefined;
	}
	const currentSLide = presentation.slideList.get(presentation.currentSlide);
	return currentSLide;
}

export type UpdateTextBoxProps = {
	idTextBox: Id;
	newTextBox: TextBox;
};

function updateTextBox(slideMaker: Presentation, props: UpdateTextBoxProps): Presentation {
	const { idTextBox, newTextBox } = props;
	deepFreeze(slideMaker);

	const slideList: Map<Id, Slide> = deepClone(slideMaker.slideList);

	if (slideMaker.currentSlide === null) {
		return slideMaker;
	}

	const currentSlide: Slide | undefined = slideList.get(slideMaker.currentSlide);
	if (!currentSlide) {
		return slideMaker;
	}

	if (currentSlide.objects.get(idTextBox)) {
		currentSlide.objects.set(idTextBox, newTextBox);
	}

	slideList.set(slideMaker.currentSlide, currentSlide);
	return {
		...slideMaker,
		slideList: slideList,
	};
}

export type UpdateImageProps = {
	idImage: Id;
	newImage: Image;
};

function updateImage(slideMaker: Presentation, props: UpdateImageProps): Presentation {
	const { idImage, newImage } = props;
	deepFreeze(slideMaker);

	const slideList: Map<Id, Slide> = deepClone(slideMaker.slideList);

	if (slideMaker.currentSlide === null) {
		return slideMaker;
	}

	const currentSlide: Slide | undefined = slideList.get(slideMaker.currentSlide);
	if (!currentSlide) {
		return slideMaker;
	}

	if (currentSlide.objects.get(idImage)) {
		currentSlide.objects.set(idImage, newImage);
	}

	slideList.set(slideMaker.currentSlide, currentSlide);
	return {
		...slideMaker,
		slideList: slideList,
	};
}

export type UpdateRectObjProps = {
	idObj: Id;
	newRect: Rect;
};

function updateRectObj(slideMaker: Presentation, props: UpdateRectObjProps): Presentation {
	const { idObj, newRect } = props;
	deepFreeze(slideMaker);

	const slideList: Map<Id, Slide> = deepClone(slideMaker.slideList);

	if (slideMaker.currentSlide === null) {
		return slideMaker;
	}

	const currentSlide: Slide | undefined = slideList.get(slideMaker.currentSlide);
	if (!currentSlide) {
		return slideMaker;
	}

	if (currentSlide.objects.get(idObj)) {
		currentSlide.objects.get(idObj)!.rect = newRect;
	}

	slideList.set(slideMaker.currentSlide, currentSlide);
	return {
		...slideMaker,
		slideList: slideList,
	};
}

function setBackground(slideMaker: Presentation, newBackground: Background): Presentation {
	const slideList: Map<Id, Slide> = deepClone(slideMaker.slideList);

	if (slideMaker.currentSlide === null) {
		return slideMaker;
	}

	const currentSlide: Slide | undefined = slideList.get(slideMaker.currentSlide);
	if (!currentSlide) {
		return slideMaker;
	}

	currentSlide.background = newBackground;

	slideList.set(slideMaker.currentSlide, currentSlide);
	return {
		...slideMaker,
		slideList: slideList,
	};
}

export {
	createPresentation,
	addSlide,
	deleteSlide,
	deleteSlides,
	setNamePresentation,
	setPositionSlide,
	getSelectedObjects,
	getSelectedSlides,
	setSelectedSlide,
	addSelectedSlide,
	setSelectedObj,
	addSelectedObj,
	addObjOnCurrentSlide,
	deleteSelectedObj,
	deleteSelectedObjs,
	updateTextBox,
	updateImage,
	updateRectObj,
	setBackground,
	getCurrentSlide,
	clearSelectionObjs,
	clearSelectionSlides,
};
