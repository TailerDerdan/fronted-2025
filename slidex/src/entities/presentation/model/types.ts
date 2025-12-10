import { Id } from '../../../shared/model/id/Id';
import { Slide } from '../../slide/model/types';

type Presentation = {
	slideList: Record<Id, Slide>;
	slideOrder: Array<Id>;
	selectedSlides: Array<Id>;
	selectedObjs: Array<Id>;
	name: string;
};

export type { Presentation };
