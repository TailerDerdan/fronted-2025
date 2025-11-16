import { Picture } from '../../../shared/model/picture/Picture';
import { Slide } from '../model/types';
import { generateId, Id } from '../../../shared/model/id/Id';
import { Color } from '../../../shared/model/color/Color';
import { Image } from '../../../shared/model/image/types';
import { TextBox } from '../../../shared/model/textbox/types';

function createSlide(): Slide {
	return {
		objects: {},
		layersOfSlide: [],
		background: Color.WHITE,
	};
}

function addObjectInSlide(slide: Slide, object: Image | TextBox): Slide {
	const newSlide = { ...slide };
	const id = generateId();
	newSlide.objects[id] = object;
	newSlide.layersOfSlide.push(id);
	return newSlide;
}

function deleteObjectInSlide(slide: Slide, id: Id | undefined): Slide {
	const newSlide = { ...slide };
	if (!id) {
		return newSlide;
	}
	delete newSlide.objects[id];
	newSlide.layersOfSlide.splice(newSlide.layersOfSlide.indexOf(id), 1);
	return newSlide;
}

function moveObjectToForeground(slide: Slide, id: Id | undefined): Slide {
	const newSlide = { ...slide };
	if (!id) {
		return newSlide;
	}

	const indexOfObj = newSlide.layersOfSlide.indexOf(id);
	if (indexOfObj != newSlide.layersOfSlide.length - 1) {
		const indexNextObj = indexOfObj + 1;
		[newSlide.layersOfSlide[indexOfObj], newSlide.layersOfSlide[indexNextObj]] = [
			newSlide.layersOfSlide[indexNextObj],
			newSlide.layersOfSlide[indexOfObj],
		];
	}
	return newSlide;
}

function moveObjectToBackground(slide: Slide, id: Id): Slide {
	const newSlide = { ...slide };
	const indexOfObj = newSlide.layersOfSlide.indexOf(id);
	if (indexOfObj != 0) {
		const indexNextObj = indexOfObj - 1;
		[newSlide.layersOfSlide[indexOfObj], newSlide.layersOfSlide[indexNextObj]] = [
			newSlide.layersOfSlide[indexNextObj],
			newSlide.layersOfSlide[indexOfObj],
		];
	}
	return newSlide;
}

function setBackgroundColor(slide: Slide, color: Color): Slide {
	const newSlide = { ...slide };
	newSlide.background = color;
	return newSlide;
}

function setBackgroundPicture(slide: Slide, picture: Picture): Slide {
	const newSlide = { ...slide };
	newSlide.background = picture;
	return newSlide;
}

export {
	createSlide,
	addObjectInSlide,
	deleteObjectInSlide,
	moveObjectToForeground,
	moveObjectToBackground,
	setBackgroundColor,
	setBackgroundPicture,
};
