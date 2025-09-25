type Font = {
    fontFamily: string;
    fontSize: number;
    fontColor: string;
    isBold: boolean;
    isItalic: boolean;
    isUnderlined: boolean;
}

function createFont(fontFamily: string, fontSize: number, fontColor: string, isBold: boolean, isItalic: boolean, isUnderlined: boolean): Font
{
    return {
        fontFamily: fontFamily,
        fontSize: fontSize,
        fontColor: fontColor,
        isBold: isBold,
        isItalic: isItalic,
        isUnderlined: isUnderlined,
    }
}

function setFontFamilyFont(font: Font, fontFamily: string): Font
{
    return {
        ...font,
        fontFamily: fontFamily,
    }
}

function setFontSizeFont(font: Font, fontSize: number): Font
{
    return {
        ...font,
        fontSize: fontSize,
    }
}

function setFontColorFont(font: Font, fontColor: string): Font
{
    return {
        ...font,
        fontColor: fontColor,
    }
}

function setBoldFont(font: Font, isBold: boolean): Font
{
    return {
        ...font,
        isBold: isBold,
    }
}

function setItalicFont(font: Font, isItalic: boolean): Font
{
    return {
        ...font,
        isItalic: isItalic,
    }
}

function setUnderlinedFont(font: Font, isUnderlined: boolean): Font
{
    return {
        ...font,
        isUnderlined: isUnderlined,
    }
}

export type { Font };
export { 
    createFont, 
    setFontFamilyFont, 
    setFontSizeFont, 
    setFontColorFont, 
    setBoldFont, 
    setItalicFont, 
    setUnderlinedFont 
};