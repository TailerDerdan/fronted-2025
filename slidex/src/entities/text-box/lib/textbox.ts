import { Alignment } from '../../../shared/model/alignment/Alignment';
import { Color } from '../../../shared/model/color/Color';
import { createFont, Font } from '../../../shared/model/font/Font';
import {
	Rect,
	setHeightRect,
	setWidthRect,
	setXRect,
	setYRect,
} from '../../../shared/model/geometry/rect/model/types';
import { Id } from '../../../shared/model/id/Id';
import { Text, TextBox } from '../model/types';
import { createText } from './text';

function createTextBox(rect: Rect): TextBox {
	return {
		type: 'textbox',
		rect: rect,
		texts: [createText('Text', createFont('Inter', 14, Color.DARKKHAKI, false, false, false))],
		alignment: Alignment.LEFT,
	};
}

function setAlignment(textBox: TextBox, alignment: Alignment): TextBox {
	return {
		...textBox,
		alignment: alignment,
	};
}

function addTextInTextBox(content: string, font: Font, textBox: TextBox): TextBox {
	const text = createText(content, font);
	textBox.texts.push(text);
	return {
		...textBox,
	};
}

function deleteTextInTextBox(id: Id, textBox: TextBox): TextBox {
	textBox.texts = textBox.texts.filter((text: Text) => text.id != id);
	return {
		...textBox,
	};
}

function setXTextBox(x: number, textBox: TextBox): TextBox {
	const rect = setXRect(textBox.rect, x);
	return {
		...textBox,
		rect: rect,
	};
}

function setYTextBox(y: number, textBox: TextBox): TextBox {
	const rect = setYRect(textBox.rect, y);
	return {
		...textBox,
		rect: rect,
	};
}

function setWidthTextBox(width: number, textBox: TextBox): TextBox {
	const rect = setWidthRect(textBox.rect, width);
	return {
		...textBox,
		rect: rect,
	};
}

function setHeightTextBox(height: number, textBox: TextBox): TextBox {
	const rect = setHeightRect(textBox.rect, height);
	return {
		...textBox,
		rect: rect,
	};
}

export {
	createTextBox,
	setHeightTextBox,
	setWidthTextBox,
	setXTextBox,
	setYTextBox,
	deleteTextInTextBox,
	setAlignment,
	addTextInTextBox,
};
