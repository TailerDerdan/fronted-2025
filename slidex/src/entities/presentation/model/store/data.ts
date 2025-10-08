import { Color } from '../../../../shared/types/color/Color';
import { createFont } from '../../../../shared/types/font/Font';
import { createRect } from '../../../../shared/types/geometry/rect/model/types';
import { createPicture } from '../../../../shared/types/picture/Picture';
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

const rect = createRect(600, 400, 500, 200);
const rectForImage = createRect(100, 400, 500, 500);
let textbox = createTextBox(rect);
const fontForHeader = createFont('montserrat', 10, Color.RED, true, false, false);
textbox = addTextInTextBox('1 заголовок презентации', fontForHeader, textbox);

slideMaker = setSelectedSlide(slideMaker, 0);
slideMaker = addObjOnCurrentSlide(slideMaker, textbox);

const backPicture = createPicture(
	'https://plus.unsplash.com/premium_photo-1701892428860-ca4913e92274?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG93ZXJwb2ludCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D',
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

slideMaker = setNameSlideMaker(slideMaker, 'Презентация с max data');
slideMaker = setSelectedSlide(slideMaker, 0);
