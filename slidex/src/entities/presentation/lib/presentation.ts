import { deepClone } from '../../../shared/lib/deepClone';
import { deepFreeze } from '../../../shared/lib/deepFreeze';
import { Background } from '../../../shared/types/background/Background';
import { generateId, Id } from '../../../shared/types/id/Id';
import { Image } from '../../image/model/types';
import { addObjectInSlide, createSlide, deleteObjectInSlide } from '../../slide/lib/slide';
import { Slide, SlideObj } from '../../slide/model/types';
import { TextBox } from '../../text-box/model/types';
import { Presentation } from '../model/types';

function createSlideMaker(): Presentation {
	return {
		slideList: new Map<Id, Slide>(),
		slideOrder: [],
		selectedSlides: [],
		currentSlide: null,
		name: '',
	};
}

function addSlide(presentation: Presentation): Presentation {
	deepFreeze(presentation);
	const slide = createSlide();
	const idNewSlide = generateId();
	const slideOrder: Array<string> = deepClone(presentation.slideOrder);
	slideOrder.push(idNewSlide);
	return {
		...presentation,
		slideList: presentation.slideList.set(idNewSlide, slide),
		slideOrder: slideOrder,
	};
}

function deleteSlide(presentation: Presentation, idSlide: Id): Presentation {
	deepFreeze(presentation);
	const slideList: Map<Id, Slide> = deepClone(presentation.slideList);
	const slideOrder: Array<Id> = deepClone(presentation.slideOrder);
	const selectedSlides: Array<Id> = deepClone(presentation.selectedSlides);

	if (idSlide) {
		slideList.delete(idSlide);
	}

	let newCurrentSlide: Id | null = null;

	if (presentation.currentSlide && slideList.size > 0) {
		let indexNewCurrentSlide = slideOrder.indexOf(idSlide);
		if (indexNewCurrentSlide >= slideList.size) {
			indexNewCurrentSlide--;
		}
		slideOrder.splice(indexNewCurrentSlide, 1);
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
		...presentation,
		slideList: slideList,
		slideOrder: slideOrder,
		currentSlide: newCurrentSlide,
		selectedSlides: selectedSlides,
	};
}

function deleteSlides(presentation: Presentation): Presentation {
	deepFreeze(presentation);
	let newSlideMaker: Presentation = deepClone(presentation);
	const selectedSlides: Array<Id> = deepClone(newSlideMaker.selectedSlides);
	selectedSlides.forEach((slideId: Id) => {
		newSlideMaker = deleteSlide(newSlideMaker, slideId);
	});
	return newSlideMaker;
}

function setNameSlideMaker(presentation: Presentation, name: string): Presentation {
	deepFreeze(presentation);
	return {
		...presentation,
		name: name,
	};
}

function setPositionSlide(presentation: Presentation, fromIndex: number, toIndex: number): Presentation {
	deepFreeze(presentation);
	const slideOrder: Array<Id> = deepClone(presentation.slideOrder);
	const element = slideOrder[fromIndex];
	slideOrder.splice(fromIndex, 1);
	slideOrder.splice(toIndex, 0, element);
	return {
		...presentation,
		slideOrder: slideOrder,
	};
}

function getSelectedObjects(presentation: Presentation): Array<SlideObj> {
	deepFreeze(presentation);
	if (presentation.currentSlide === null) {
		return [];
	}

	const currentSlide = presentation.slideList.get(presentation.currentSlide);
	if (!createSlide) {
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

function getSelectedSlides(presentation: Presentation): Array<Slide> {
	deepFreeze(presentation);
	if (presentation.selectedSlides.length === 0) {
		return [];
	}

	const selectedSlides: Array<Slide> = [];
	presentation.selectedSlides.forEach((id: Id) => {
		const obj = presentation.slideList.get(id);
		if (obj) {
			selectedSlides.push(obj);
		}
	});

	return selectedSlides;
}

function setSelectedSlide(presentation: Presentation, newSelectedSlide: number): Presentation {
	deepFreeze(presentation);
	const currentSlide = presentation.slideOrder[newSelectedSlide]
		? presentation.slideOrder[newSelectedSlide]
		: presentation.currentSlide;
	const selectedSlides = [];
	if (currentSlide) {
		selectedSlides.push(currentSlide);
	}
	return {
		...presentation,
		currentSlide: currentSlide,
		selectedSlides: selectedSlides,
	};
}

function addSelectedSlide(presentation: Presentation, newSelectedSlide: number): Presentation {
	deepFreeze(presentation);
	const newSelectedSlides: Array<Id> = deepClone(presentation.selectedSlides);
	if (presentation.slideOrder[newSelectedSlide]) {
		newSelectedSlides.push(presentation.slideOrder[newSelectedSlide]);
	}
	return {
		...presentation,
		selectedSlides: newSelectedSlides,
	};
}

function setSelectedObj(presentation: Presentation, newSelectedObjId: Id): Presentation {
	deepFreeze(presentation);
	if (presentation.currentSlide === null) {
		return presentation;
	}

	const currentSlide = presentation.slideList.get(presentation.currentSlide);
	if (!createSlide) {
		return presentation;
	}

	if (currentSlide?.objects.get(newSelectedObjId)) {
		currentSlide.selectedObj.splice(0, currentSlide.selectedObj.length);
		currentSlide.selectedObj.push(newSelectedObjId);
	}
	const newSlideList: Map<Id, Slide> = deepClone(presentation.slideList);
	if (currentSlide) {
		newSlideList.set(presentation.currentSlide, currentSlide);
	}
	return {
		...presentation,
		slideList: newSlideList,
	};
}

function addSelectedObj(presentation: Presentation, newSelectedObjId: Id): Presentation {
	deepFreeze(presentation);
	if (presentation.currentSlide === null) {
		return presentation;
	}

	const currentSlide = presentation.slideList.get(presentation.currentSlide);
	if (!createSlide) {
		return presentation;
	}

	if (currentSlide?.objects.get(newSelectedObjId)) {
		currentSlide.selectedObj.push(newSelectedObjId);
	}
	const newSlideList: Map<Id, Slide> = deepClone(presentation.slideList);
	if (currentSlide) {
		newSlideList.set(presentation.currentSlide, currentSlide);
	}
	return {
		...presentation,
		slideList: newSlideList,
	};
}

function addObjOnCurrentSlide(presentation: Presentation, obj: SlideObj): Presentation {
	deepFreeze(presentation);
	const slideList: Map<Id, Slide> = deepClone(presentation.slideList);

	if (presentation.currentSlide === null) {
		return presentation;
	}

	let currentSlide: Slide | undefined = deepClone(slideList.get(presentation.currentSlide));

	if (!currentSlide) {
		return presentation;
	}
	currentSlide = addObjectInSlide(currentSlide, obj);
	slideList.set(presentation.currentSlide, currentSlide);
	return {
		...presentation,
		slideList: slideList,
	};
}

function deleteSelectedObj(presentation: Presentation, idObj: Id): Presentation {
	deepFreeze(presentation);
	const slideList: Map<Id, Slide> = deepClone(presentation.slideList);

	if (presentation.currentSlide === null) {
		return presentation;
	}

	let currentSlide: Slide | undefined = deepClone(slideList.get(presentation.currentSlide));

	if (!currentSlide) {
		return presentation;
	}
	currentSlide = deleteObjectInSlide(currentSlide, idObj);
	slideList.set(presentation.currentSlide, currentSlide);
	return {
		...presentation,
		slideList: slideList,
	};
}

function deleteSelectedObjs(presentation: Presentation): Presentation {
	deepFreeze(presentation);

	if (presentation.currentSlide === null) {
		return presentation;
	}

	const currentSlide: Slide | undefined = presentation.slideList.get(presentation.currentSlide);
	if (!currentSlide) {
		return presentation;
	}

	let newSlideMaker: Presentation = deepClone(presentation);
	currentSlide.selectedObj.forEach((idObj: Id) => {
		newSlideMaker = deleteSelectedObj(newSlideMaker, idObj);
	});

	return newSlideMaker;
}

function getCurrentSlide(presentation: Presentation): Slide | undefined {
	if (!presentation.currentSlide) {
		return undefined;
	}
	const currentSLide = presentation.slideList.get(presentation.currentSlide);
	return currentSLide;
}

function updateTextBox(presentation: Presentation, idTextBox: Id, newTextBox: TextBox): Presentation {
	deepFreeze(presentation);

	const slideList: Map<Id, Slide> = deepClone(presentation.slideList);

	if (presentation.currentSlide === null) {
		return presentation;
	}

	const currentSlide: Slide | undefined = slideList.get(presentation.currentSlide);
	if (!currentSlide) {
		return presentation;
	}

	if (currentSlide.objects.get(idTextBox)) {
		currentSlide.objects.set(idTextBox, newTextBox);
	}

	slideList.set(presentation.currentSlide, currentSlide);
	return {
		...presentation,
		slideList: slideList,
	};
}

function updateImage(presentation: Presentation, idImage: Id, newImage: Image): Presentation {
	deepFreeze(presentation);

	const slideList: Map<Id, Slide> = deepClone(presentation.slideList);

	if (presentation.currentSlide === null) {
		return presentation;
	}

	const currentSlide: Slide | undefined = slideList.get(presentation.currentSlide);
	if (!currentSlide) {
		return presentation;
	}

	if (currentSlide.objects.get(idImage)) {
		currentSlide.objects.set(idImage, newImage);
	}

	slideList.set(presentation.currentSlide, currentSlide);
	return {
		...presentation,
		slideList: slideList,
	};
}

function setBackground(presentation: Presentation, newBackground: Background): Presentation {
	const slideList: Map<Id, Slide> = deepClone(presentation.slideList);

	if (presentation.currentSlide === null) {
		return presentation;
	}

	const currentSlide: Slide | undefined = slideList.get(presentation.currentSlide);
	if (!currentSlide) {
		return presentation;
	}

	currentSlide.background = newBackground;

	slideList.set(presentation.currentSlide, currentSlide);
	return {
		...presentation,
		slideList: slideList,
	};
}

export {
	createSlideMaker,
	addSlide,
	deleteSlide,
	deleteSlides,
	setNameSlideMaker,
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
	setBackground,
	getCurrentSlide,
};
