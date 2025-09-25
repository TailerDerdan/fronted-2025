import { createRect } from "../../../types/rect/Rect"
import { createImage, Image, setRectPicture, setSrcPicture } from "./Image";

describe("Image.ts", () => {
    test("Image.ts: createPicture min", () => {
        const rect = createRect(0, 0, 10, 20);
        const image = createImage("", rect);
        const correctImage: Image = {
            src: "",
            rect: rect,
        }
        expect(image).toStrictEqual(correctImage);
    })

    test("Image.ts: createPicture max", () => {
        const rect = createRect(0, 0, 10, 20);
        const image = createImage("image.png", rect);
        const correctImage: Image = {
            src: "image.png",
            rect: rect,
        }
        expect(image).toStrictEqual(correctImage);
    })

    test("Image.ts: setSrcPicture", () => {
        const rect = createRect(0, 0, 10, 20);
        const image = createImage("image.png", rect);
        const newImage = setSrcPicture("cat.png", image);
        const correctImage: Image = {
            src: "cat.png",
            rect: rect,
        }
        expect(newImage).toStrictEqual(correctImage);
    })
    test("Image.ts: setRectPicture", () => {
        const rect = createRect(0, 0, 10, 20);
        const newRect = createRect(0, 0, 100, 200);
        const image = createImage("image.png", rect);
        const newImage = setRectPicture(newRect, image);
        const correctImage: Image = {
            src: "image.png",
            rect: newRect,
        }
        expect(newImage).toStrictEqual(correctImage);
    })
})