import { Background } from '../../../shared/types/background/Background';
import { Id } from '../../../shared/types/id/Id';
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
