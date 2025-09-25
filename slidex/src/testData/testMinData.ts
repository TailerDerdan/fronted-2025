import { createSlide } from "../model/slide/Slide";
import { addSlide, createSlideMaker } from "../model/SlideMaker";

let slideMaker = createSlideMaker();
slideMaker = addSlide(slideMaker);