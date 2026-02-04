import { jsPDF } from 'jspdf';
import { Slide } from '../../entities/slide/model/types';
import { SlideObj } from '../model/objOnSlide';
import { SlidesState } from '../../entities/presentation/model/slideSlice';
import { TextBox } from '../model/textbox/types';
import { Image as ImageType } from '../model/image/types';
import { getFileBlob } from '../appwrite/storage';
import { Background } from '../model/background/Background';
import html2canvas from 'html2canvas';

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
			await textConverter(obj, doc, scaleConst);
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

const textConverter = async (textbox: TextBox, doc: jsPDF, scaleConst: number) => {
	const { rect, text } = textbox;

	const tempDiv = document.createElement('div');
	tempDiv.style.position = 'absolute';
	tempDiv.style.width = `${rect.width * 10}px`;
	tempDiv.style.height = `${rect.height * 10}px`;
	tempDiv.style.overflow = 'hidden';
	tempDiv.style.fontSize = '24px';
	tempDiv.innerHTML = text;

	document.body.appendChild(tempDiv);

	try {
		const canvas = await html2canvas(tempDiv, {
			scale: scaleConst,
			useCORS: true,
			allowTaint: true,
			backgroundColor: null,
		});

		const imgData = canvas.toDataURL('image/png');

		doc.addImage(
			imgData,
			'PNG',
			toPt(rect.x * scaleConst),
			toPt(rect.y * scaleConst),
			toPt(canvas.width),
			toPt(canvas.height),
		);
	} finally {
		document.body.removeChild(tempDiv);
	}
};

const getSlidesArray = (state: SlidesState): Slide[] => {
	return state.slideOrder.map(id => state.slideList[id]);
};

const getArrayElementsOnLayers = (slide: Slide) => {
	return slide.layersOfSlide.map(id => slide.objects[id]);
};

export const DPI = 96;
const toPt = (px: number) => (px * 72) / DPI;
