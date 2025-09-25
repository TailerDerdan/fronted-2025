import { Alignment } from "../../../types/alignment/Alignment";
import { createFont, Font, setBoldFont, setFontColorFont, setFontFamilyFont, setFontSizeFont, setItalicFont, setUnderlinedFont } from "../../../types/font/Font";
import { Rect, setHeightRect, setWidthRect, setXRect, setYRect } from "../../../types/rect/Rect"
import { generateId, Id } from "../id/Id";

type Text = {
    id: Id;
    content: string;
    font: Font;
}

type TextBox = {
    rect: Rect;
    texts: Array<Text>;
    alignment: Alignment;
}

function createText(content: string, font: Font): Text
{
    const id = generateId();
    return {
        id: id,
        content: content,
        font: font,
    }
}

function setContent(text: Text, content: string): Text
{
    return {
        ...text,
        content :content
    }
}

function setFontFamilyText(text: Text, fontFamily: string): Text
{
    const font = setFontFamilyFont(text.font, fontFamily);
    return {
        ...text,
        font: font,
    }
}

function setFontSizeText(text: Text, fontSize: number): Text
{
    const font = setFontSizeFont(text.font, fontSize);
    return {
        ...text,
        font: font,
    }
}

function setFontColorText(text: Text, fontColor: string): Text
{
    const font = setFontColorFont(text.font, fontColor);
    return {
        ...text,
        font: font,
    }
}

function setBoldText(text: Text, isBold: boolean): Text
{
    const font = setBoldFont(text.font, isBold);
    return {
        ...text,
        font: font,
    }
}

function setItalicText(text: Text, isItalic: boolean): Text
{
    const font = setItalicFont(text.font, isItalic);
    return {
        ...text,
        font: font,
    }
}

function setUnderlinedText(text: Text, isUnderlined: boolean): Text
{
    const font = setUnderlinedFont(text.font, isUnderlined);
    return {
        ...text,
        font: font,
    }
}

function createTextBox(rect: Rect) : TextBox
{
    return {
        rect: rect,
        texts: [],
        alignment: Alignment.LEFT,
    }
}

function setAlignment(textBox: TextBox, alignment: Alignment): TextBox
{
    return {
        ...textBox,
        alignment: alignment,
    }
}

function addTextInTextBox(content: string, font: Font, textBox: TextBox): TextBox
{
    const text = createText(content, font);
    textBox.texts.push(text);
    return {
        ...textBox,
    }
}

function deleteTextInTextBox(id: Id, textBox: TextBox): TextBox
{
    textBox.texts = textBox.texts.filter((text: Text) => text.id != id);
    return {
        ...textBox
    }
}

function setXTextBox(x: number, textBox: TextBox): TextBox
{
    const rect = setXRect(textBox.rect, x);
    return {
        ...textBox,
        rect: rect,
    }
}

function setYTextBox(y: number, textBox: TextBox): TextBox
{
    const rect = setYRect(textBox.rect, y);
    return {
        ...textBox,
        rect: rect,
    }
}

function setWidthTextBox(width: number, textBox: TextBox): TextBox
{
    const rect = setWidthRect(textBox.rect, width);
    return {
        ...textBox,
        rect: rect,
    }
}

function setHeightTextBox(height: number, textBox: TextBox): TextBox
{
    const rect = setHeightRect(textBox.rect, height);
    return {
        ...textBox,
        rect: rect,
    }
}

export type {
    Text,
    TextBox,
}

export {
    createText, 
    setFontSizeText,
    setFontColorText,
    setFontFamilyText,
    setBoldText,
    setItalicText,
    setUnderlinedText,
    setContent,
    createTextBox,
    setAlignment,
    addTextInTextBox,
    deleteTextInTextBox,
    setXTextBox,
    setYTextBox,
    setWidthTextBox,
    setHeightTextBox,
}