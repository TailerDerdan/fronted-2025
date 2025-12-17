import { createContext } from 'react';
import { Id } from '../model/id/Id';
import { SlideObj } from '../model/objOnSlide';
import { TextBox } from '../model/textbox/types';
import { Image } from '../model/image/types';
import { Rect } from '../model/geometry/rect/model/types';
import { Background } from '../model/background/Background';
import { RootState } from '../../entities/presentation/model/rootState';
import { SlidesState } from '../../entities/presentation/model/slideSlice';

export type PresAction = {
	setPresState: (state: RootState) => void;
	setSlideState: (state: SlidesState) => void;

	addSlide: () => void;
	deleteSlides: () => void;

	setNamePresentation: (newName: string) => void;
	setIdPresentation: (id: string) => void;
	setPositionSlide: (newPos: Array<{ fromIndex: number; toIndex: number }>) => void;

	setSelectedSlide: (idSLide: Id) => void;
	addSelectedSlide: (idSLide: Id) => void;

	setSelectedObj: (newSelectedObjId: Id) => void;
	addSelectedObj: (newSelectedObjId: Id) => void;

	addObjOnCurrentSlide: (obj: SlideObj, idObj: Id) => void;

	deleteSelectedObjs: () => void;

	updateTextBox: (idTextBox: Id, newTextBox: TextBox) => void;
	updateImage: (idImage: Id, newImage: Image) => void;
	updateRectObj: (idObj: Id, newRect: Rect) => void;

	setBackground: (newBackground: Background) => void;

	clearSelectionObjs: () => void;
	clearSelectionSlides: () => void;
};

export const PresActionContext = createContext<PresAction | null>(null);
