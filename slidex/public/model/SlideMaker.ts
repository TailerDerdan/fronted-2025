import { addObjectInSlide, createSlide, deleteObjectInSlide, Slide, SlideObj } from "./slide/Slide"
import { generateId, Id } from "./slide/slideObj/id/Id";
import { Image } from "./slide/slideObj/image/Image";
import { TextBox } from "./slide/slideObj/textbox/Textbox";
import { Background } from "./types/background/Background";

type SlideMaker = {
    slideList: Map<Id, Slide>;
    slideListInTheDirectOrder: Array<Id>;
    selectedSlides: Array<Id>;
    currentSlide: Id | null;
    name: string;
}

function deepFreeze(o: Record<string, any>) 
{
    Object.freeze(o);

    Object.getOwnPropertyNames(o).forEach(function (prop) {
        if (o.hasOwnProperty(prop)
            && o[prop] !== null
            && (typeof o[prop] === "object" || typeof o[prop] === "function")
            && !Object.isFrozen(o[prop]))
        {
            deepFreeze(o[prop]);
        }
    });

    return o;
}

function deepClone<T>(source: T): T
{
    if (source === null || typeof source !== 'object')
    {
        return source;
    }

    if (source instanceof Map)
    {
        const result = new Map();
        for (const [key, value] of source)
        {
            result.set(deepClone(key), deepClone(value));
        }
        return result as T;
    }

    if (Array.isArray(source)) 
    {
        return source.map(item => deepClone(item)) as T;
    }

    if (typeof source === 'object') 
    {
        const result: any = {};
        for (const key in source) 
        {
            if (source.hasOwnProperty(key)) 
            {
                result[key] = deepClone(source[key]);
            }
        }
        return result;
    }

    return source;
}

function createSlideMaker(): SlideMaker
{
    const idNewSlide = generateId();
    return {
        slideList: new Map<Id, Slide>().set(idNewSlide, createSlide()),
        slideListInTheDirectOrder: [idNewSlide],
        selectedSlides: [idNewSlide],
        currentSlide: idNewSlide,
        name: "",
    }
}

function addSlide(slideMaker: SlideMaker): SlideMaker
{
    deepFreeze(slideMaker);
    const slide = createSlide();
    const idNewSlide = generateId();
    return {
        ...slideMaker,
        slideList: slideMaker.slideList.set(idNewSlide, slide),
    }
}

function deleteSlide(slideMaker: SlideMaker, idSlide: Id): SlideMaker
{
    deepFreeze(slideMaker);
    const slideList: Map<Id, Slide> = deepClone(slideMaker.slideList);
    const slideListInTheDirectOrder: Array<Id> = deepClone(slideMaker.slideListInTheDirectOrder);

    if (idSlide !== null)
    {
        slideList.delete(idSlide);
    }

    let newCurrentSlide: Id | null = null;

    if (slideMaker.currentSlide !== null && slideMaker.slideList.size > 0)
    {
        let indexNewCurrentSlide = slideListInTheDirectOrder.indexOf(idSlide);
        if (indexNewCurrentSlide >= slideMaker.slideList.size)
        {
            indexNewCurrentSlide--;
        }
        newCurrentSlide = slideListInTheDirectOrder[indexNewCurrentSlide];
        slideListInTheDirectOrder.splice(indexNewCurrentSlide, 1);
        
    }

    return {
        ...slideMaker,
        slideList: slideList,
        slideListInTheDirectOrder: slideListInTheDirectOrder
    }
}

function deleteSlides(slideMaker: SlideMaker): SlideMaker
{
    deepFreeze(slideMaker);
    let newSlideMaker: SlideMaker = deepClone(slideMaker);
    const selectedSlides: Array<Id> = deepClone(newSlideMaker.selectedSlides);
    selectedSlides.forEach((slideId: Id) => {

        newSlideMaker = deleteSlide(newSlideMaker, slideId);
    })
    return newSlideMaker;
}

function setNameSlideMaker(slideMaker: SlideMaker, name: string): SlideMaker
{
    deepFreeze(slideMaker);
    return {
        ...slideMaker,
        name: name
    }
}

function setPositionSlide(slideMaker: SlideMaker, fromIndex: number, toIndex: number): SlideMaker
{
    deepFreeze(slideMaker);
    const slideListInTheDirectOrder: Array<Id> = deepClone(slideMaker.slideListInTheDirectOrder);
    let element = slideListInTheDirectOrder[fromIndex];
    slideListInTheDirectOrder.splice(fromIndex, 1);
    slideListInTheDirectOrder.splice(toIndex, 0, element);
    return {
        ...slideMaker,
        slideListInTheDirectOrder: slideListInTheDirectOrder,
    }
}

function getSelectedObjects(slideMaker: SlideMaker): Array<SlideObj>
{
    deepFreeze(slideMaker);
    if (slideMaker.currentSlide === null)
    {
        return [];
    }
    
    const currentSlide = slideMaker.slideList.get(slideMaker.currentSlide);
    if (!createSlide)
    {
        return [];
    }

    const selectedIdsSlideObj = currentSlide?.selectedObj;
    if (!selectedIdsSlideObj)
    {
        return [];
    }

    const selectedSlideObjs: Array<SlideObj> = [];
    selectedIdsSlideObj.forEach((id: Id) => {

        const obj = currentSlide.objects.get(id);
        if (obj)
        {
            selectedSlideObjs.push(obj);
        }
    })

    return selectedSlideObjs;
}

function getSelectedSlides(slideMaker: SlideMaker): Array<Slide>
{
    deepFreeze(slideMaker);
    if (slideMaker.selectedSlides.length === 0)
    {
        return [];
    }

    const selectedSlides: Array<Slide> = [];
    slideMaker.selectedSlides.forEach((id: Id) => {

        const obj = slideMaker.slideList.get(id);
        if (obj)
        {
            selectedSlides.push(obj);
        }
    })

    return selectedSlides;
}

function setSelectedSlide(slideMaker: SlideMaker, newSelectedSlide: number): SlideMaker
{
    deepFreeze(slideMaker);
    return {
        ...slideMaker,
        currentSlide: slideMaker.slideListInTheDirectOrder[newSelectedSlide] ? slideMaker.slideListInTheDirectOrder[newSelectedSlide] : slideMaker.currentSlide,
    }
}

function addSelectedSlide(slideMaker: SlideMaker, newSelectedSlide: number): SlideMaker
{
    deepFreeze(slideMaker);
    const newSelectedSlides: Array<Id> = deepClone(slideMaker.selectedSlides);
    if (slideMaker.slideListInTheDirectOrder[newSelectedSlide])
    {
        newSelectedSlides.push(slideMaker.slideListInTheDirectOrder[newSelectedSlide]);
    }
    return {
        ...slideMaker,
        selectedSlides: newSelectedSlides,
    }
}

function setSelectedObj(slideMaker: SlideMaker, newSelectedObjId: Id): SlideMaker
{
    deepFreeze(slideMaker);
    if (slideMaker.currentSlide === null)
    {
        return slideMaker;
    }
    
    const currentSlide = slideMaker.slideList.get(slideMaker.currentSlide);
    if (!createSlide)
    {
        return slideMaker;
    }

    if (currentSlide?.objects.get(newSelectedObjId))
    {
        currentSlide.selectedObj.splice(0, currentSlide.selectedObj.length);
        currentSlide.selectedObj.push(newSelectedObjId);
    }
    const newSlideList: Map<Id, Slide> = deepClone(slideMaker.slideList);
    if (currentSlide)
    {
        newSlideList.set(slideMaker.currentSlide, currentSlide);
    }
    return {
        ...slideMaker,
        slideList: newSlideList,
    }
}

function addSelectedObj(slideMaker: SlideMaker, newSelectedObjId: Id): SlideMaker
{
    deepFreeze(slideMaker);
    if (slideMaker.currentSlide === null)
    {
        return slideMaker;
    }
    
    const currentSlide = slideMaker.slideList.get(slideMaker.currentSlide);
    if (!createSlide)
    {
        return slideMaker;
    }

    if (currentSlide?.objects.get(newSelectedObjId))
    {
        currentSlide.selectedObj.push(newSelectedObjId);
    }
    const newSlideList: Map<Id, Slide> = deepClone(slideMaker.slideList);
    if (currentSlide)
    {
        newSlideList.set(slideMaker.currentSlide, currentSlide);
    }
    return {
        ...slideMaker,
        slideList: newSlideList,
    }
}

function addObjOnCurrentSlide(slideMaker: SlideMaker, obj: SlideObj): SlideMaker
{
    deepFreeze(slideMaker);
    const slideList: Map<Id, Slide> = deepClone(slideMaker.slideList);

    if (slideMaker.currentSlide === null)
    {
        return slideMaker;
    }

    let currentSlide: Slide | undefined = deepClone(slideList.get(slideMaker.currentSlide));
    
    if (!currentSlide)
    {
        return slideMaker;
    }
    currentSlide = addObjectInSlide(currentSlide, obj);
    slideList.set(slideMaker.currentSlide, currentSlide);
    return {
        ...slideMaker,
        slideList: slideList,
    }
}

function deleteSelectedObj(slideMaker: SlideMaker, idObj: Id): SlideMaker
{
    deepFreeze(slideMaker);
    const slideList: Map<Id, Slide> = deepClone(slideMaker.slideList);

    if (slideMaker.currentSlide === null)
    {
        return slideMaker;
    }

    let currentSlide: Slide | undefined = deepClone(slideList.get(slideMaker.currentSlide));
    
    if (!currentSlide)
    {
        return slideMaker;
    }
    currentSlide = deleteObjectInSlide(currentSlide, idObj);
    slideList.set(slideMaker.currentSlide, currentSlide);
    return {
        ...slideMaker,
        slideList: slideList,
    }
}

function deleteSelectedObjs(slideMaker: SlideMaker): SlideMaker
{
    deepFreeze(slideMaker);

    if (slideMaker.currentSlide === null)
    {
        return slideMaker;
    }

    let currentSlide: Slide | undefined = slideMaker.slideList.get(slideMaker.currentSlide);
    if (!currentSlide)
    {
        return slideMaker;
    }

    let newSlideMaker: SlideMaker = deepClone(slideMaker);
    currentSlide.selectedObj.forEach((idObj: Id) => {

        newSlideMaker = deleteSelectedObj(newSlideMaker, idObj);
    })

    return newSlideMaker;
}

function updateTextBox(slideMaker: SlideMaker, idTextBox: Id, newTextBox: TextBox): SlideMaker
{
    deepFreeze(slideMaker);

    const slideList: Map<Id, Slide> = deepClone(slideMaker.slideList);

    if (slideMaker.currentSlide === null)
    {
        return slideMaker;
    }

    let currentSlide: Slide | undefined = slideList.get(slideMaker.currentSlide);
    if (!currentSlide)
    {
        return slideMaker;
    }

    if (currentSlide.objects.get(idTextBox))
    {
        currentSlide.objects.set(idTextBox, newTextBox);
    }
    
    slideList.set(slideMaker.currentSlide, currentSlide);
    return {
        ...slideMaker,
        slideList: slideList,
    }
}

function updateImage(slideMaker: SlideMaker, idImage: Id, newImage: Image): SlideMaker
{
    deepFreeze(slideMaker);

    const slideList: Map<Id, Slide> = deepClone(slideMaker.slideList);

    if (slideMaker.currentSlide === null)
    {
        return slideMaker;
    }

    let currentSlide: Slide | undefined = slideList.get(slideMaker.currentSlide);
    if (!currentSlide)
    {
        return slideMaker;
    }

    if (currentSlide.objects.get(idImage))
    {
        currentSlide.objects.set(idImage, newImage);
    }
    
    slideList.set(slideMaker.currentSlide, currentSlide);
    return {
        ...slideMaker,
        slideList: slideList,
    }
}

function setBackground(slideMaker: SlideMaker, newBackground: Background): SlideMaker
{
    const slideList: Map<Id, Slide> = deepClone(slideMaker.slideList);

    if (slideMaker.currentSlide === null)
    {
        return slideMaker;
    }

    let currentSlide: Slide | undefined = slideList.get(slideMaker.currentSlide);
    if (!currentSlide)
    {
        return slideMaker;
    }

    currentSlide.background = newBackground;

    slideList.set(slideMaker.currentSlide, currentSlide);
    return {
        ...slideMaker,
        slideList: slideList,
    }
}

export type {SlideMaker};

export {
    createSlideMaker,
    addSlide,
    deleteSlide,
    deleteSlides,
    setNameSlideMaker,
    setPositionSlide,
    getSelectedObjects,
    getSelectedSlides,
    setSelectedSlide,
    addSelectedSlide,
    setSelectedObj,
    addSelectedObj,
    addObjOnCurrentSlide,
    deleteSelectedObj,
    deleteSelectedObjs,
    updateTextBox,
    updateImage,
    setBackground,
}