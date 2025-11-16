import { Background } from '../../../shared/model/background/Background';
import { Id } from '../../../shared/model/id/Id';
import { SlideObj } from '../../../shared/model/objOnSlide';

type Slide = {
	objects: Record<Id, SlideObj>;
	layersOfSlide: Array<Id>;
	background: Background;
};

export type { Slide };
