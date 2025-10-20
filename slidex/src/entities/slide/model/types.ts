import { Background } from '../../../shared/model/background/Background';
import { Id } from '../../../shared/model/id/Id';
import { Image } from '../../image/model/types';
import { TextBox } from '../../text-box/model/types';

type SlideObj = Image | TextBox;

type Slide = {
	objects: Map<Id, SlideObj>;
	layersOfSlide: Array<Id>;
	background: Background;
	selectedObj: Array<Id>;
};

export type { Slide, SlideObj };
