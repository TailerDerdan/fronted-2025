import { Alignment } from "../../../types/alignment/Alignment"
import { Color } from "../../../types/color/Color"
import { createFont, Font } from "../../../types/font/Font"
import { createRect } from "../../../types/rect/Rect"
import { generateId } from "../id/Id"
import { addTextInTextBox, createText, createTextBox, deleteTextInTextBox, setAlignment, setBoldText, setContent, setFontColorText, setFontFamilyText, setFontSizeText, setHeightTextBox, setItalicText, setUnderlinedText, setWidthTextBox, setXTextBox, setYTextBox, Text, TextBox } from "./Textbox"

describe("TextBox.ts", () => {
    test("TextBox.ts: createText min", () => {
        const font: Font = createFont("", 0, "", false, false, false);
        const testText: Text = {
            id: generateId(),
            content: "",
            font: font,
        }
        const correctText = createText("", font);
        expect(testText).toEqual({
            id: expect.any(String),
            content: correctText.content,
            font: correctText.font,
        });
    })

    test("TextBox.ts: createText max", () => {
        const font: Font = createFont(
            "Roboto",
            10,
            Color.LIME,
            false,
            false,
            false
        );
        const testText: Text = {
            id: generateId(),
            content: "sometext",
            font: font,
        }
        const correctText = createText("sometext", font);
        expect(testText).toEqual({
            id: expect.any(String),
            content: correctText.content,
            font: correctText.font,
        });
    })

    test("TextBox.ts: setContent", () => {
        const testFont: Font = createFont(
            "Roboto",
            10,
            Color.LIME,
            false,
            false,
            false
        );
        const testText: Text = {
            id: generateId(),
            content: "",
            font: testFont,
        }
        const newText = setContent(testText, "new text");
        expect(newText).toEqual({
            id: expect.any(String),
            font: expect.any(Object),
            content: "new text",
        });
    })

    test("TextBox.ts: setFontFamilyText", () => {
        const font: Font = createFont(
            "Roboto",
            10,
            Color.LIME,
            false,
            false,
            false
        );
        const testText: Text = {
            id: generateId(),
            content: "",
            font: font,
        }
        const newText = setFontFamilyText(testText, "Inter");
        
        expect(newText).toEqual({
            id: expect.any(String),
            content: "",
            font: {
                fontFamily: "Inter",
                fontSize: 10,
                fontColor: Color.LIME,
                isBold: false,
                isItalic: false,
                isUnderlined: false,
            },
        });
    })

    test("TextBox.ts: setFontSizeText", () => {
        const font: Font = createFont(
            "Roboto",
            10,
            Color.LIME,
            false,
            false,
            false
        );
        const testText: Text = {
            id: generateId(),
            content: "",
            font: font,
        }
        const newText = setFontSizeText(testText, 15);
        
        expect(newText).toEqual({
            id: expect.any(String),
            content: "",
            font: {
                fontFamily: "Roboto",
                fontSize: 15,
                fontColor: Color.LIME,
                isBold: false,
                isItalic: false,
                isUnderlined: false,
            },
        });
    })

    test("TextBox.ts: setFontColorText", () => {
        const font: Font = createFont(
            "Roboto",
            10,
            Color.LIME,
            false,
            false,
            false
        );
        const testText: Text = {
            id: generateId(),
            content: "",
            font: font,
        }
        const newText = setFontColorText(testText, Color.CORAL);
        
        expect(newText).toEqual({
            id: expect.any(String),
            content: "",
            font: {
                fontFamily: "Roboto",
                fontSize: 10,
                fontColor: Color.CORAL,
                isBold: false,
                isItalic: false,
                isUnderlined: false,
            },
        });
    })

    test("TextBox.ts: setBoldText", () => {
        const font: Font = createFont(
            "Roboto",
            10,
            Color.LIME,
            false,
            false,
            false
        );
        const testText: Text = {
            id: generateId(),
            content: "",
            font: font,
        }
        const newText = setBoldText(testText, true);
        
        expect(newText).toEqual({
            id: expect.any(String),
            content: "",
            font: {
                fontFamily: "Roboto",
                fontSize: 10,
                fontColor: Color.LIME,
                isBold: true,
                isItalic: false,
                isUnderlined: false,
            },
        });
    })

    test("TextBox.ts: setItalicText", () => {
        const font: Font = createFont(
            "Roboto",
            10,
            Color.LIME,
            false,
            false,
            false
        );
        const testText: Text = {
            id: generateId(),
            content: "",
            font: font,
        }
        const newText = setItalicText(testText, true);
        
        expect(newText).toEqual({
            id: expect.any(String),
            content: "",
            font: {
                fontFamily: "Roboto",
                fontSize: 10,
                fontColor: Color.LIME,
                isBold: false,
                isItalic: true,
                isUnderlined: false,
            },
        });
    })

    test("TextBox.ts: setUnderlinedText", () => {
        const font: Font = createFont(
            "Roboto",
            10,
            Color.LIME,
            false,
            false,
            false
        );
        const testText: Text = {
            id: generateId(),
            content: "",
            font: font,
        }
        const newText = setUnderlinedText(testText, true);
        
        expect(newText).toEqual({
            id: expect.any(String),
            content: "",
            font: {
                fontFamily: "Roboto",
                fontSize: 10,
                fontColor: Color.LIME,
                isBold: false,
                isItalic: false,
                isUnderlined: true,
            },
        });
    })

    test("TextBox.ts: createTextBox, min", () => {
        const rect = createRect(0, 0, 10, 20);
        const testTextBox: TextBox = {
            texts: [],
            rect: rect,
            alignment: Alignment.LEFT,
        }
        expect(testTextBox).toStrictEqual(createTextBox(rect));
    })

    test("TextBox.ts: createTextBox max", () => {
        const rect = createRect(0, 0, 10, 20);
        const font: Font = createFont(
            "Times New Roman", 
            10, 
            Color.CORAL,
            false,
            false,
            false
        );
        const text = createText("sometext", font);
        const testTextBox: TextBox = {
            texts: [text],
            rect: rect,
            alignment: Alignment.LEFT,
        }
        const correctTextBox = createTextBox(rect);
        correctTextBox.texts.push(text);
        expect(testTextBox).toStrictEqual(correctTextBox);
    })

    test("TextBox.ts: setAlignment", () => {
        const rect = createRect(0, 0, 10, 20);
        const testTextBox: TextBox = {
            texts: [],
            rect: rect,
            alignment: Alignment.LEFT,
        }
        const changeTestTextBox = setAlignment(testTextBox, Alignment.CENTER);
        expect(changeTestTextBox).toEqual({
            texts: [],
            rect: expect.any(Object),
            alignment: Alignment.CENTER,
        });
    })

    test("TextBox.ts: addTextInTextBox", () => {
        const rect = createRect(0, 0, 10, 20);
        const font: Font = createFont(
            "Inter", 
            10, 
            Color.CORAL,
            false,
            false,
            false
        );
        const testTextBox: TextBox = {
            texts: [],
            rect: rect,
            alignment: Alignment.LEFT,
        }
        const changeTestTextBox = addTextInTextBox("sometext", font, testTextBox);
        expect(changeTestTextBox).toEqual({
            texts: [
                {
                    id: expect.any(String),
                    content: "sometext",
                    font: {
                        fontFamily: "Inter",
                        fontSize: 10,
                        fontColor: Color.CORAL,
                        isBold: false,
                        isItalic: false,
                        isUnderlined: false,
                    }
                }
            ],
            rect: expect.any(Object),
            alignment: Alignment.LEFT,
        });
    })

    test("TextBox.ts: deleteTextInTextBox", () => {
        const rect = createRect(0, 0, 10, 20);
        const font: Font = createFont(
            "Inter", 
            10, 
            Color.CORAL,
            false,
            false,
            false
        );
        const text = createText("sometext", font);
        const testTextBox: TextBox = {
            texts: [text],
            rect: rect,
            alignment: Alignment.LEFT,
        }
        const changeTestTextBox = deleteTextInTextBox(text.id, testTextBox);
        expect(changeTestTextBox).toEqual({
            texts: [],
            rect: expect.any(Object),
            alignment: Alignment.LEFT,
        });
    })
    test("TextBox.ts: setXTextBox", () => {
        const rect = createRect(0, 0, 10, 20);
        const testTextBox: TextBox = {
            texts: [],
            rect: rect,
            alignment: Alignment.LEFT,
        }
        const changeTestTextBox = setXTextBox(10, testTextBox);
        expect(changeTestTextBox).toEqual({
            texts: [],
            rect: {
                x: 10,
                y: 0,
                width: 10,
                height: 20,
            },
            alignment: Alignment.LEFT,
        });
    })

    test("TextBox.ts: setYTextBox", () => {
        const rect = createRect(0, 0, 10, 20);
        const testTextBox: TextBox = {
            texts: [],
            rect: rect,
            alignment: Alignment.LEFT,
        }
        const changeTestTextBox = setYTextBox(10, testTextBox);
        expect(changeTestTextBox).toEqual({
            texts: [],
            rect: {
                x: 0,
                y: 10,
                width: 10,
                height: 20,
            },
            alignment: Alignment.LEFT,
        });
    })

    test("TextBox.ts: setWidthTextBox", () => {
        const rect = createRect(0, 0, 10, 20);
        const testTextBox: TextBox = {
            texts: [],
            rect: rect,
            alignment: Alignment.LEFT,
        }
        const changeTestTextBox = setWidthTextBox(100, testTextBox);
        expect(changeTestTextBox).toEqual({
            texts: [],
            rect: {
                x: 0,
                y: 0,
                width: 100,
                height: 20,
            },
            alignment: Alignment.LEFT,
        });
    })

    test("TextBox.ts: setHeightTextBox", () => {
        const rect = createRect(0, 0, 10, 20);
        const testTextBox: TextBox = {
            texts: [],
            rect: rect,
            alignment: Alignment.LEFT,
        }
        const changeTestTextBox = setHeightTextBox(200, testTextBox);
        expect(changeTestTextBox).toEqual({
            texts: [],
            rect: {
                x: 0,
                y: 0,
                width: 10,
                height: 200,
            },
            alignment: Alignment.LEFT,
        });
    })
})