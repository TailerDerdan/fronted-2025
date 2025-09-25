import { Color } from "../types/color/Color";
import { createPicture } from "../types/picture/Picture";
import { createRect } from "../types/rect/Rect";
import { addObjectInSlide, createSlide, deleteObjectInSlide, moveObjectToBackground, moveObjectToForeground, setBackgroundColor, setBackgroundPicture, Slide, SlideObj } from "./Slide"
import { Id } from "./slideObj/id/Id";
import { createImage } from "./slideObj/image/Image";
import { createTextBox } from "./slideObj/textbox/Textbox";

describe("Slide.ts", () => {
    test("Slide.ts: createSlide min", () => {
        const slide = createSlide();
        const corresctSlide: Slide = {
            objects: new Map<Id, SlideObj>(),
            layersOfSlide: [],
            background: Color.WHITE,
            selectedObj: [],
        }
        expect(slide).toStrictEqual(corresctSlide);
    })

    test("Slide.ts: createSlide max", () => {
        const slide = createSlide();

        const rect = createRect(0, 0, 10, 20);
        const textbox = createTextBox(rect);
        const image = createImage("image.png", rect);

        const newSlide = addObjectInSlide(slide, textbox);
        const newSlide2 = addObjectInSlide(newSlide, image);

        expect(newSlide2).toEqual({
            objects: new Map<Id, SlideObj>([
                [expect.any(String), textbox],
                [expect.any(String), image]
            ]),
            layersOfSlide: [expect.any(String), expect.any(String)],
            background: Color.WHITE,
            selectedObj: [],
        });
    })

    test("Slide.ts: deleteObjectInSlide", () => {
        const slide = createSlide();

        const rect = createRect(0, 0, 10, 20);
        const image = createImage("image.png", rect);

        const newSlide = addObjectInSlide(slide, image);

        const newSlide2 = deleteObjectInSlide(newSlide, newSlide.objects.keys().next().value);

        expect(newSlide2).toEqual({
            objects: new Map<Id, SlideObj>([]),
            layersOfSlide: [],
            background: Color.WHITE,
            selectedObj: [],
        });
    })

    test("Slide.ts: moveObjectToForeground", () => {
        const slide = createSlide();

        const rect = createRect(0, 0, 10, 20);
        const textbox = createTextBox(rect);
        const image = createImage("image.png", rect);

        const newSlide = addObjectInSlide(slide, textbox);
        const newSlide2 = addObjectInSlide(newSlide, image);

        const keys = newSlide2.objects.keys();

        const idTextBox = keys.next().value;
        const idImage = keys.next().value;

        const correctLayersOfSlide = [
            idImage, idTextBox
        ]

        let idTextBoxStr: String = "";
        if (idTextBox)
        {
            idTextBoxStr = idTextBox;
        }

        let idImageStr: String = "";
        if (idImage)
        {
            idImageStr = idImage;
        }

        const newSlide3 = moveObjectToForeground(newSlide2, idTextBox);

        expect(newSlide3).toEqual({
            objects: new Map<Id, SlideObj>([
                [idTextBoxStr, textbox],
                [idImageStr, image],
            ]),
            layersOfSlide: correctLayersOfSlide,
            background: Color.WHITE,
            selectedObj: [],
        });
    })

    test("Slide.ts: moveObjectToBackground", () => {
        const slide = createSlide();

        const rect = createRect(0, 0, 10, 20);
        const textbox = createTextBox(rect);
        const image = createImage("image.png", rect);

        const newSlide = addObjectInSlide(slide, textbox);
        const newSlide2 = addObjectInSlide(newSlide, image);

        const keys = newSlide2.objects.keys();

        const idTextBox = keys.next().value;
        const idImage = keys.next().value;

        const correctLayersOfSlide = [
            idImage, idTextBox
        ]

        let idTextBoxStr: String = "";
        if (idTextBox)
        {
            idTextBoxStr = idTextBox;
        }

        let idImageStr: String = "";
        if (idImage)
        {
            idImageStr = idImage;
        }

        const newSlide3 = moveObjectToBackground(newSlide2, idImageStr);

        expect(newSlide3).toEqual({
            objects: new Map<Id, SlideObj>([
                [idTextBoxStr, textbox],
                [idImageStr, image],
            ]),
            layersOfSlide: correctLayersOfSlide,
            background: Color.WHITE,
            selectedObj: [],
        });
    })

    test("Slide.ts: setBackgroundColor", () => {
        const slide = createSlide();

        const newSlide = setBackgroundColor(slide, Color.CORAL);

        expect(newSlide).toEqual({
            objects: new Map<Id, SlideObj>([]),
            layersOfSlide: [],
            background: Color.CORAL,
            selectedObj: [],
        });
    })

    test("Slide.ts: setBackgroundPicture", () => {
        const slide = createSlide();
        const picture = createPicture("back.png");

        const newSlide = setBackgroundPicture(slide, picture);

        expect(newSlide).toEqual({
            objects: new Map<Id, SlideObj>([]),
            layersOfSlide: [],
            background: {
                src: "back.png",
            },
            selectedObj: [],
        });
    })
})