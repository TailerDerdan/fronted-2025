import { addObjectInSlide, createSlide, Slide, SlideObj } from "./slide/Slide";
import { Id } from "./slide/slideObj/id/Id";
import { createImage } from "./slide/slideObj/image/Image";
import { createText, createTextBox, TextBox } from "./slide/slideObj/textbox/Textbox";
import { addObjOnCurrentSlide, addSelectedObj, addSelectedSlide, addSlide, createSlideMaker, deleteSelectedObjs, deleteSlides, getSelectedObjects, getSelectedSlides, setBackground, setNameSlideMaker, setPositionSlide, setSelectedObj, setSelectedSlide, SlideMaker, updateImage, updateTextBox } from "./SlideMaker"
import { Color } from "./types/color/Color";
import { createFont } from "./types/font/Font";
import { createRect } from "./types/rect/Rect";

describe("SlideMaker.ts", () => {
    test("SlideMaker.ts: createSlideMaker min", () => {
        const slideMaker = createSlideMaker();
        expect(slideMaker).toEqual({
            slideList: new Map<Id, Slide>(),
            slideOrder: [],
            selectedSlides: [],
            currentSlide: null,
            name: "",
        })
    })

    test("SlideMaker.ts: createSlideMaker max", () => {
        const slideMaker = createSlideMaker();
        const rect = createRect(0, 0, 10, 20);
        const image = createImage("cat.png", rect);

        const newSlideMaker = addSlide(slideMaker);
        const newSlideMaker1 = setSelectedSlide(newSlideMaker, 0);
        const newSlideMaker2 = addObjOnCurrentSlide(newSlideMaker1, image);
        const newSlideMaker3 = setNameSlideMaker(newSlideMaker2, "My Presentation");
        
        const slide = createSlide();
        const newSlide = addObjectInSlide(slide, image);
        const idSlide = newSlideMaker3.slideList.keys().next().value;
        
        let idSlideStr: String = "";
        if (idSlide)
        {
            idSlideStr = idSlide;
        }

        expect(newSlideMaker3).toEqual({
            slideList: new Map<Id, Slide>([
                [idSlideStr, {
                    objects: new Map<Id, SlideObj>([
                        [expect.any(String), image],
                    ]),
                    layersOfSlide: [expect.any(String)],
                    background: newSlide.background,
                    selectedObj: [],
                }],
            ]),
            slideOrder: [idSlide],
            selectedSlides: [idSlide],
            currentSlide: idSlide,
            name: "My Presentation",
        })
    })

    test("SlideMaker.ts: setPositionSlide", () => {
        const slideMaker = createSlideMaker();

        const newSlideMaker = addSlide(slideMaker);
        const newSlideMaker1 = addSlide(newSlideMaker);
        const newSlideMaker2 = addSlide(newSlideMaker1);
        
        const idSlide1 = newSlideMaker2.slideOrder[0];
        const idSlide2 = newSlideMaker2.slideOrder[1];
        const idSlide3 = newSlideMaker2.slideOrder[2];

        const newSlideMaker3 = setSelectedSlide(newSlideMaker2, 0);
        const newSlideMaker4 = setPositionSlide(newSlideMaker3, 0, 2);

        expect(newSlideMaker4).toEqual({
            slideList: expect.any(Object),
            slideOrder: [idSlide2, idSlide3, idSlide1],
            selectedSlides: [idSlide1],
            currentSlide: idSlide1,
            name: "",
        })
    })

    test("SlideMaker.ts: deleteSlides max", () => {
        const slideMaker = createSlideMaker();

        const newSlideMaker = addSlide(slideMaker);
        const newSlideMaker1 = addSlide(newSlideMaker);
        const newSlideMaker2 = addSlide(newSlideMaker1);

        const idSlide3 = newSlideMaker2.slideOrder[2];

        const newSlideMaker3 = setSelectedSlide(newSlideMaker2, 0);
        const newSlideMaker4 = addSelectedSlide(newSlideMaker3, 1);
        const newSlideMaker5 = deleteSlides(newSlideMaker4);

        expect(newSlideMaker5.slideList.size).toBe(1);
        expect(newSlideMaker5).toEqual({
            slideList: expect.any(Object),
            slideOrder: [idSlide3],
            selectedSlides: [idSlide3],
            currentSlide: idSlide3,
            name: "",
        })
    })

    test("SlideMaker.ts: deleteSlides min", () => {
        const slideMaker = createSlideMaker();
        const newSlideMaker = deleteSlides(slideMaker);

        expect(newSlideMaker.slideList.size).toBe(0);
        expect(newSlideMaker).toEqual({
            slideList: new Map<Id, Slide>(),
            slideOrder: [],
            selectedSlides: [],
            currentSlide: null,
            name: "",
        })
    })

    test("SlideMaker.ts: getSelectedSlides", () => {
        const slideMaker = createSlideMaker();

        const newSlideMaker = addSlide(slideMaker);
        const newSlideMaker1 = addSlide(newSlideMaker);
        const newSlideMaker2 = addSlide(newSlideMaker1);

        const newSlideMaker3 = setSelectedSlide(newSlideMaker2, 0);
        const newSlideMaker4 = addSelectedSlide(newSlideMaker3, 1);

        const selectedSlideCorrect: Array<Slide> = [];

        const slides = newSlideMaker4.slideList.values();
        const slide1 = slides.next().value;
        const slide2 = slides.next().value;

        if (slide1)
        {
            selectedSlideCorrect.push(slide1);
        }
        if (slide2)
        {
            selectedSlideCorrect.push(slide2);
        }
        const selectedSlides = getSelectedSlides(newSlideMaker4);
        expect(selectedSlides).toEqual(selectedSlideCorrect);
    })

    test("SlideMaker.ts: deleteSelectedObjs max", () => {
        const slideMaker = createSlideMaker();

        const newSlideMaker = addSlide(slideMaker);
        const newSlideMaker1 = setSelectedSlide(newSlideMaker, 0);

        const rect = createRect(100, 100, 100, 100);
        const image = createImage("cat1.png", rect);

        const rect1 = createRect(100, 100, 500, 500);
        const image1 = createImage("cat2.png", rect1);

        const newSlideMaker2 = addObjOnCurrentSlide(newSlideMaker1, image);
        const newSlideMaker3 = addObjOnCurrentSlide(newSlideMaker2, image1);

        const idImage1 = newSlideMaker3.slideList.values().next().value?.layersOfSlide[0];
        const idImage2 = newSlideMaker3.slideList.values().next().value?.layersOfSlide[1];

        let idImage1Str: String = "";
        if (idImage1)
        {
            idImage1Str = idImage1;
        }
        let idImage2Str: String = "";
        if (idImage2)
        {
            idImage2Str = idImage2;
        }

        const newSlideMaker4 = setSelectedObj(newSlideMaker3, idImage1Str);
        const newSlideMaker5 = addSelectedObj(newSlideMaker4, idImage2Str);

        expect(newSlideMaker5).toEqual({
            slideList: new Map<Id, Slide>([
                [expect.any(String), {
                    objects: new Map<Id, SlideObj>([
                        [idImage1Str, image],
                        [idImage2Str, image1],
                    ]),
                    layersOfSlide: [idImage1Str, idImage2Str],
                    background: expect.any(String),
                    selectedObj: [idImage1Str, idImage2Str],
                }],
            ]),
            slideOrder: [expect.any(String)],
            selectedSlides: [expect.any(String)],
            currentSlide: expect.any(String),
            name: "",
        })
        
        const newSlideMaker6 = deleteSelectedObjs(newSlideMaker5);

        expect(newSlideMaker6).toEqual({
            slideList: new Map<Id, Slide>([
                [expect.any(String), {
                    objects: new Map<Id, SlideObj>([]),
                    layersOfSlide: [],
                    background: expect.any(String),
                    selectedObj: [],
                }],
            ]),
            slideOrder: [expect.any(String)],
            selectedSlides: [expect.any(String)],
            currentSlide: expect.any(String),
            name: "",
        })
    })

    test("SlideMaker.ts: updateImage", () => {
        const slideMaker = createSlideMaker();

        const newSlideMaker = addSlide(slideMaker);
        const newSlideMaker1 = setSelectedSlide(newSlideMaker, 0);

        const rect = createRect(100, 100, 100, 100);
        const image = createImage("cat1.png", rect);

        const newRect = createRect(500, 500, 500, 500);
        const newImage = createImage("cat1.png", newRect);

        const newSlideMaker2 = addObjOnCurrentSlide(newSlideMaker1, image);
        const idImage1 = newSlideMaker2.slideList.values().next().value?.layersOfSlide[0];
        let idImage1Str: String = "";
        if (idImage1)
        {
            idImage1Str = idImage1;
        }

        const newSlideMaker3 = setSelectedObj(newSlideMaker2, idImage1Str);
        const newSlideMaker4 = updateImage(newSlideMaker3, idImage1Str, newImage);

        expect(newSlideMaker4).toEqual({
            slideList: new Map<Id, Slide>([
                [expect.any(String), {
                    objects: new Map<Id, SlideObj>([
                        [idImage1Str, newImage],
                    ]),
                    layersOfSlide: [idImage1Str],
                    background: expect.any(String),
                    selectedObj: [idImage1Str],
                }],
            ]),
            slideOrder: [expect.any(String)],
            selectedSlides: [expect.any(String)],
            currentSlide: expect.any(String),
            name: "",
        })
    })

    test("SlideMaker.ts: updateTextBox", () => {
        const slideMaker = createSlideMaker();

        const newSlideMaker = addSlide(slideMaker);
        const newSlideMaker1 = setSelectedSlide(newSlideMaker, 0);

        const rect = createRect(100, 100, 100, 100);
        const textbox = createTextBox(rect);

        const newRect = createRect(100, 100, 200, 200);
        const newTextbox = createTextBox(newRect);
        const newFont = createFont("Roboto", 10, Color.GOLD, false, false, false);
        const nexText = createText("Hello World", newFont)
        newTextbox.texts.push(nexText);

        const newSlideMaker2 = addObjOnCurrentSlide(newSlideMaker1, textbox);
        const idTextBox1 = newSlideMaker2.slideList.values().next().value?.layersOfSlide[0];
        let idTextBox1Str: String = "";
        if (idTextBox1)
        {
            idTextBox1Str = idTextBox1;
        }

        const newSlideMaker3 = setSelectedObj(newSlideMaker2, idTextBox1Str);
        const newSlideMaker4 = updateTextBox(newSlideMaker3, idTextBox1Str, newTextbox);

        expect(newSlideMaker4).toEqual({
            slideList: new Map<Id, Slide>([
                [expect.any(String), {
                    objects: new Map<Id, SlideObj>([
                        [idTextBox1Str, newTextbox],
                    ]),
                    layersOfSlide: [idTextBox1Str],
                    background: expect.any(String),
                    selectedObj: [idTextBox1Str],
                }],
            ]),
            slideOrder: [expect.any(String)],
            selectedSlides: [expect.any(String)],
            currentSlide: expect.any(String),
            name: "",
        })
    })

    test("SlideMaker.ts: setBackground", () => {
        const slideMaker = createSlideMaker();

        const newSlideMaker = addSlide(slideMaker);
        const newSlideMaker1 = setSelectedSlide(newSlideMaker, 0);
        const newSlideMaker2 = setBackground(newSlideMaker1, Color.OLIVE);
        
        expect(newSlideMaker2).toEqual({
            slideList: new Map<Id, Slide>([
                [expect.any(String), {
                    objects: new Map<Id, SlideObj>([]),
                    layersOfSlide: [],
                    background: Color.OLIVE,
                    selectedObj: [],
                }],
            ]),
            slideOrder: [expect.any(String)],
            selectedSlides: [expect.any(String)],
            currentSlide: expect.any(String),
            name: "",
        })
    })
})