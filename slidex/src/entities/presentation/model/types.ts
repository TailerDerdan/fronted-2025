import { Id } from '../../../shared/model/id/Id';
import { Slide } from '../../slide/model/types';

type Presentation = {
	slideList: Map<Id, Slide>;
	slideOrder: Array<Id>;
	selectedSlides: Array<Id>; //TODO: currentSlide = selectedSlide[0]
	currentSlide: Id | null;
	name: string;
};

export type { Presentation };
