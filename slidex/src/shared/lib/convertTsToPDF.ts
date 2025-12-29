import { jsPDF } from 'jspdf';
import { Slide } from '../../entities/slide/model/types';
import { SlideObj } from '../model/objOnSlide';
import { SlidesState } from '../../entities/presentation/model/slideSlice';
import { TextBox } from '../model/textbox/types';
import { Image as ImageType } from '../model/image/types';
import { getFileBlob } from '../appwrite/storage';
import { Background } from '../model/background/Background';

export const slidesConvertor = async (
	doc: jsPDF,
	slideList: SlidesState,
	scaleConst: number,
	slideSize: { width: number; height: number },
) => {
	const slideArray = getSlidesArray(slideList);
	for (const slide of slideArray) {
		if (slide.background.src[0] === '#') {
			doc.setFillColor(slide.background.src);
			doc.setDrawColor(slide.background.src);
			doc.rect(0, 0, slideSize.width, slideSize.height, 'F');
		} else {
			await imageBackground(slide.background, doc, slideSize);
		}

		const elemArray = getArrayElementsOnLayers(slide);
		for (const obj of elemArray) {
			await slideElemConvertor(obj, doc, scaleConst);
		}
		doc.addPage();
	}
	doc.deletePage(slideArray.length + 1);
};

const slideElemConvertor = async (obj: SlideObj, doc: jsPDF, scaleConst: number) => {
	switch (obj.type) {
		case 'image':
			await imageCovertor(obj, doc);
			break;
		case 'textbox':
			await textCovertor(obj, doc, scaleConst);
			break;
	}
};

const imageBackground = async (
	background: Background,
	doc: jsPDF,
	slideSize: { width: number; height: number },
) => {
	try {
		const file = await getFileBlob(background.id);
		const blobUrl = URL.createObjectURL(file);
		const img = new Image();
		img.src = blobUrl;
		await new Promise<void>((resolve, reject) => {
			img.onload = () => {
				doc.addImage(img, 'PNG', 0, 0, toPt(slideSize.width), toPt(slideSize.height));
				URL.revokeObjectURL(blobUrl);
				resolve();
			};

			img.onerror = () => {
				reject(new Error('Ошибка загрузки изображения'));
			};
		});
	} catch (error) {
		console.error('Ошибка при загрузке изображения:', error);
	}
};

const imageCovertor = async (image: ImageType, doc: jsPDF) => {
	try {
		const file = await getFileBlob(image.id);
		console.log(file);

		const blobUrl = URL.createObjectURL(file);
		const img = new Image();
		img.src = blobUrl;
		await new Promise<void>((resolve, reject) => {
			img.onload = () => {
				doc.addImage(
					img,
					'PNG',
					toPt(image.rect.x),
					toPt(image.rect.y),
					toPt(image.rect.width),
					toPt(image.rect.height),
				);
				URL.revokeObjectURL(blobUrl);
				resolve();
			};

			img.onerror = () => {
				reject(new Error('Ошибка загрузки изображения'));
			};
		});
	} catch (error) {
		console.error('Ошибка при загрузке изображения:', error);
	}
};

const textCovertor = async (textbox: TextBox, doc: jsPDF, scaleConst: number) => {
	const { rect, texts } = textbox;

	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	if (!ctx) {
		console.error('Canvas 2D context не поддерживается');
		return;
	}

	const canvasWidth = rect.width * scaleConst;
	const canvasHeight = rect.height * scaleConst;
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;

	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

	let x = 0;
	const y = 0;

	texts.forEach(textItem => {
		const { content, font } = textItem;

		const fontStyle = [];
		if (font.isBold) fontStyle.push('bold');
		if (font.isItalic) fontStyle.push('italic');

		ctx.font = `${fontStyle.join(' ')} ${font.fontSize * scaleConst}px ${font.fontFamily}`;
		ctx.fillStyle = font.fontColor;

		ctx.fillText(content, x, y + font.fontSize * scaleConst);
		x += ctx.measureText(content).width;
	});

	const imgData = canvas.toDataURL('image/png');

	doc.addImage(
		imgData,
		'PNG',
		toPt(rect.x * scaleConst),
		toPt(rect.y * scaleConst),
		toPt(canvasWidth),
		toPt(canvasHeight),
	);
};

const getSlidesArray = (state: SlidesState): Slide[] => {
	return state.slideOrder.map(id => state.slideList[id]);
};

const getArrayElementsOnLayers = (slide: Slide) => {
	return slide.layersOfSlide.map(id => slide.objects[id]);
};

export const DPI = 96;
const toPt = (px: number) => (px * 72) / DPI;
