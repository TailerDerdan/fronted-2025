import { Color } from '../../../../shared/types/color/Color';
import { createFont } from '../../../../shared/types/font/Font';
import { createRect } from '../../../../shared/types/geometry/rect/model/types';
import { createImage } from '../../../image/lib/image';
import { addTextInTextBox, createTextBox } from '../../../text-box/lib/textbox';
import {
	addObjOnCurrentSlide,
	addSlide,
	createSlideMaker,
	setBackground,
	setNameSlideMaker,
	setSelectedSlide,
} from '../../lib/presentation';

export let slideMaker = createSlideMaker();
slideMaker = addSlide(slideMaker);

const rect = createRect(100, 100, 500, 200);
let textbox = createTextBox(rect);
const fontForHeader = createFont('montserrat', 10, Color.RED, true, false, false);
textbox = addTextInTextBox('1 заголовок презентации', fontForHeader, textbox);

slideMaker = setSelectedSlide(slideMaker, 0);
slideMaker = addObjOnCurrentSlide(slideMaker, textbox);

slideMaker = addSlide(slideMaker);
slideMaker = setSelectedSlide(slideMaker, 1);

slideMaker = setBackground(slideMaker, Color.GREEN);
const image = createImage('cat.png', rect);
slideMaker = addObjOnCurrentSlide(slideMaker, image);

slideMaker = setNameSlideMaker(slideMaker, 'Презентация с max data');
