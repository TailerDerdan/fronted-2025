import {
	Rect,
	setHeightRect,
	setWidthRect,
	setXRect,
	setYRect,
} from '../../../shared/model/geometry/rect/model/types';
import { Image } from '../../../shared/model/image/types';

function createImage(src: string, id: string, rect: Rect): Image {
	return {
		type: 'image',
		src: src,
		id: id,
		rect: rect,
		borderColor: '',
	};
}

function setSrcImage(src: string, image: Image): Image {
	return {
		...image,
		src: src,
	};
}

function setIdImage(id: string, image: Image): Image {
	return {
		...image,
		id: id,
	};
}

function setFileImage(file: File, image: Image): Image {
	return {
		...image,
		src: window.URL.createObjectURL(file),
	};
}

function setRectImage(rect: Rect, image: Image): Image {
	return {
		...image,
		rect: rect,
	};
}

function setXImage(x: number, image: Image): Image {
	const rect = setXRect(image.rect, x);

	return {
		...image,
		rect: rect,
	};
}

function setYImage(y: number, image: Image): Image {
	const rect = setYRect(image.rect, y);

	return {
		...image,
		rect: rect,
	};
}

function setWidthImage(width: number, image: Image): Image {
	const rect = setWidthRect(image.rect, width);

	return {
		...image,
		rect: rect,
	};
}

function setHeightImage(height: number, image: Image): Image {
	const rect = setHeightRect(image.rect, height);

	return {
		...image,
		rect: rect,
	};
}

export {
	createImage,
	setHeightImage,
	setRectImage,
	setSrcImage,
	setWidthImage,
	setXImage,
	setYImage,
	setFileImage,
	setIdImage,
};
