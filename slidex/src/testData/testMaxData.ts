import { createImage } from "../model/slide/slideObj/image/Image";
import { addTextInTextBox, createTextBox } from "../model/slide/slideObj/textbox/Textbox";
import { addObjOnCurrentSlide, addSlide, createSlideMaker, setBackground, setNameSlideMaker, setSelectedSlide } from "../model/SlideMaker";
import { Color } from "../model/types/color/Color";
import { createFont } from "../model/types/font/Font";
import { createRect } from "../model/types/rect/Rect";

export let slideMaker = createSlideMaker();
slideMaker = addSlide(slideMaker);

const rect = createRect(100, 100, 500, 200);
let textbox = createTextBox(rect);
const fontForHeader = createFont("montserrat", 10, Color.RED, true, false, false);
textbox = addTextInTextBox("1 заголовок презентации", fontForHeader, textbox)

slideMaker = setSelectedSlide(slideMaker, 0);
slideMaker = addObjOnCurrentSlide(slideMaker, textbox);

slideMaker = addSlide(slideMaker);
slideMaker = setSelectedSlide(slideMaker, 1);

slideMaker = setBackground(slideMaker, Color.GREEN);
const image = createImage("cat.png", rect);
slideMaker = addObjOnCurrentSlide(slideMaker, image);

slideMaker = setNameSlideMaker(slideMaker, "Презентация с max data")