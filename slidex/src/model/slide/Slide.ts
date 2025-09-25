import { generateId, Id } from "./slideObj/id/Id"
import { Image } from "./slideObj/image/Image"
import { TextBox } from "./slideObj/textbox/Textbox"
import { Background } from "../types/background/Background"
import { Color } from "../types/color/Color"
import { Picture } from "../types/picture/Picture"

type SlideObj = Image | TextBox;

type Slide = {
    objects: Map<Id, SlideObj>;
    layersOfSlide: Array<Id>;
    background: Background;
    selectedObj: Array<Id>;
}

function createSlide(): Slide
{
    return {
        objects: new Map<Id, SlideObj>(),
        layersOfSlide: [],
        background: Color.WHITE,
        selectedObj: [],
    }
}

function addObjectInSlide(slide: Slide, object: Image | TextBox): Slide
{
    const newSlide = {...slide};
    const id = generateId();
    newSlide.objects.set(id, object);
    newSlide.layersOfSlide.push(id);
    return newSlide;
}

function deleteObjectInSlide(slide: Slide, id: Id | undefined): Slide
{
    const newSlide = {...slide};
    if (!id)
    {
        return newSlide;
    }
    newSlide.objects.delete(id);
    newSlide.layersOfSlide.splice(newSlide.layersOfSlide.indexOf(id), 1);
    newSlide.selectedObj.splice(newSlide.layersOfSlide.indexOf(id), 1);
    return newSlide;
}

function moveObjectToForeground(slide: Slide, id: Id | undefined): Slide
{
    const newSlide = {...slide};
    if (!id)
    {
        return newSlide;
    }
    
    const indexOfObj = newSlide.layersOfSlide.indexOf(id);
    if (indexOfObj != newSlide.layersOfSlide.length - 1)
    {
        const indexNextObj = indexOfObj + 1;
        [newSlide.layersOfSlide[indexOfObj], newSlide.layersOfSlide[indexNextObj]] = [newSlide.layersOfSlide[indexNextObj], newSlide.layersOfSlide[indexOfObj]];
    }
    return newSlide;
}

function moveObjectToBackground(slide: Slide, id: Id): Slide
{
    const newSlide = {...slide};
    const indexOfObj = newSlide.layersOfSlide.indexOf(id);
    if (indexOfObj != 0)
    {
        const indexNextObj = indexOfObj - 1;
        [newSlide.layersOfSlide[indexOfObj], newSlide.layersOfSlide[indexNextObj]] = [newSlide.layersOfSlide[indexNextObj], newSlide.layersOfSlide[indexOfObj]];
    }
    return newSlide;
}

function setBackgroundColor(slide: Slide, color: Color): Slide
{
    const newSlide = {...slide};
    newSlide.background = color;
    return newSlide;
}

function setBackgroundPicture(slide: Slide, picture: Picture): Slide
{
    const newSlide = {...slide};
    newSlide.background = picture;
    return newSlide;
}

export type {SlideObj, Slide};
export {
    createSlide,
    addObjectInSlide,
    deleteObjectInSlide,
    moveObjectToForeground,
    moveObjectToBackground,
    setBackgroundColor,
    setBackgroundPicture,
}