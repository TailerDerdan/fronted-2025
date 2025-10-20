import { Color } from '../../../shared/model/color/Color';
import {
	Rect,
	setHeightRect,
	setWidthRect,
	setXRect,
	setYRect,
} from '../../../shared/model/geometry/rect/model/types';
import { Image } from '../model/types';

function createImage(src: string, rect: Rect): Image {
	return {
		type: 'image',
		src: src,
		rect: rect,
		borderColor: Color.CORAL,
	};
}

function setSrcImage(src: string, image: Image): Image {
	return {
		...image,
		src: src,
	};
}

function setFileImage(file: File, image: Image): Image {
	return {
		...image,
		src: window.URL.createObjectURL(file),
		file: file,
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
};
