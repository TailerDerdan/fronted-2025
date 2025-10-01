import {
	Font,
	setBoldFont,
	setFontColorFont,
	setFontFamilyFont,
	setFontSizeFont,
	setItalicFont,
	setUnderlinedFont,
} from '../../../shared/types/font/Font';
import { generateId } from '../../../shared/types/id/Id';
import { Text } from '../model/types';

function createText(content: string, font: Font): Text {
	const id = generateId();
	return {
		id: id,
		content: content,
		font: font,
	};
}

function setContent(text: Text, content: string): Text {
	return {
		...text,
		content: content,
	};
}

function setFontFamilyText(text: Text, fontFamily: string): Text {
	const font = setFontFamilyFont(text.font, fontFamily);
	return {
		...text,
		font: font,
	};
}

function setFontSizeText(text: Text, fontSize: number): Text {
	const font = setFontSizeFont(text.font, fontSize);
	return {
		...text,
		font: font,
	};
}

function setFontColorText(text: Text, fontColor: string): Text {
	const font = setFontColorFont(text.font, fontColor);
	return {
		...text,
		font: font,
	};
}

function setBoldText(text: Text, isBold: boolean): Text {
	const font = setBoldFont(text.font, isBold);
	return {
		...text,
		font: font,
	};
}

function setItalicText(text: Text, isItalic: boolean): Text {
	const font = setItalicFont(text.font, isItalic);
	return {
		...text,
		font: font,
	};
}

function setUnderlinedText(text: Text, isUnderlined: boolean): Text {
	const font = setUnderlinedFont(text.font, isUnderlined);
	return {
		...text,
		font: font,
	};
}

export {
	createText,
	setBoldText,
	setContent,
	setFontColorText,
	setFontFamilyText,
	setFontSizeText,
	setItalicText,
	setUnderlinedText,
};
