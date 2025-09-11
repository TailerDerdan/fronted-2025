import { Picture } from "../../../types/picture/Picture.ts"
import { Rect, setHeightRect, setWidthRect, setXRect, setYRect } from "../../../types/rect/Rect.ts"

type Image = Picture & {
    rect: Rect,
};

function createPicture(src: string, rect: Rect): Image
{
    return {
        src: src,
        rect: rect,
    }
}

function setSrcPicture(src: string, picture: Image) : Image
{
    return {
        ...picture,
        src: src,
    }
}

function setRectPicture(rect: Rect, picture: Image): Image
{
    return {
        ...picture,
        rect: rect,
    }
}

function setXPicture(x: number, picture: Image): Image
{
    const rect = setXRect(picture.rect, x);

    return {
        ...picture,
        rect: rect,
    }
}

function setYPicture(y: number, picture: Image): Image
{
    const rect = setYRect(picture.rect, y);

    return {
        ...picture,
        rect: rect,
    }
}

function setWidthPicture(width: number, picture: Image): Image
{
    const rect = setWidthRect(picture.rect, width);

    return {
        ...picture,
        rect: rect,
    }
}

function setHeightPicture(height: number, picture: Image): Image
{
    const rect = setHeightRect(picture.rect, height);

    return {
        ...picture,
        rect: rect,
    }
}

export type { Image };
export { createPicture, setRectPicture, setSrcPicture, setHeightPicture, setWidthPicture, setXPicture, setYPicture };