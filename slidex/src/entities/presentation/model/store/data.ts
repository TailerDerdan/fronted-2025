import { Color } from '../../../../shared/model/color/Color';
import { createFont } from '../../../../shared/model/font/Font';
import { createRect } from '../../../../shared/model/geometry/rect/model/types';
import { createPicture } from '../../../../shared/model/picture/Picture';
import { createImage } from '../../../image/lib/image';
import { addTextInTextBox, createTextBox } from '../../../text-box/lib/textbox';
import {
	addObjOnCurrentSlide,
	addSlide,
	createPresentation,
	setBackground,
	setNamePresentation,
	setSelectedSlide,
} from '../../lib/presentation';

export let slideMaker = createPresentation();
slideMaker = addSlide(slideMaker);

const rect = createRect(600, 400, 500, 200);
const rectForImage = createRect(100, 400, 500, 500);
let textbox = createTextBox(rect);
const fontForHeader = createFont('montserrat', 10, Color.RED, true, false, false);
textbox = addTextInTextBox('1 заголовок презентации', fontForHeader, textbox);

slideMaker = setSelectedSlide(slideMaker, 0);
slideMaker = addObjOnCurrentSlide(slideMaker, textbox);

const backPicture = createPicture(
	'https://static.vecteezy.com/system/resources/thumbnails/048/401/283/small_2x/abstract-geometric-background-presentation-vector.jpg',
);
slideMaker = setBackground(slideMaker, backPicture);

slideMaker = addSlide(slideMaker);
slideMaker = setSelectedSlide(slideMaker, 1);

slideMaker = setBackground(slideMaker, Color.GREEN);
const image = createImage(
	'https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg',
	rectForImage,
);
slideMaker = addObjOnCurrentSlide(slideMaker, image);

slideMaker = setNamePresentation(slideMaker, 'Презентация с max data');
slideMaker = setSelectedSlide(slideMaker, 1);
slideMaker = addSlide(slideMaker);
slideMaker = setSelectedSlide(slideMaker, 1);
