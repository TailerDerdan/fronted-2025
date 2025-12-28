import { PresAction } from '../../../shared/lib/presentationContext';
import { generateId, Id } from '../../../shared/model/id/Id';
import { TextBox } from '../../../shared/model/textbox/types';
import { Image } from '../../../shared/model/image/types';
import { Rect } from '../../../shared/model/geometry/rect/model/types';
import { Background } from '../../../shared/model/background/Background';
import { SlideObj } from '../../../shared/model/objOnSlide';
import { useAppDispatch, useAppSelector } from '../../../entities/presentation/model/store';
import {
	addObjOnCurrentSlide,
	addSlide,
	deleteObjs,
	deleteSlides,
	setBackground,
	setPositionSlide,
	setSlidesState,
	SlidesState,
	updateImage,
	updateRectObj,
	updateTextBox,
} from '../../../entities/presentation/model/slideSlice';
import {
	setIdPres,
	setNamePresentation,
	setPres,
} from '../../../entities/presentation/model/presentationSlice';
import {
	addSelectedObj,
	addSelectedSlide,
	clearSelectionObjs,
	clearSelectionSlides,
	setSelectedObj,
	setSelectedSlide,
} from '../../../entities/presentation/model/selectionSlice';
import { RootState } from '../../../entities/presentation/model/rootState';

export const usePresentationActions = (): PresAction => {
	const { selection } = useAppSelector(state => state);
	const dispatch = useAppDispatch();
	return {
		addSlide: () => {
			const newSlideId = generateId();
			dispatch(addSlide(newSlideId));
		},
		deleteSlides: () => {
			dispatch(deleteSlides(selection.selectedSlides));
		},

		setPresState: (state: RootState) => {
			dispatch(setPres(state));
		},

		navigateToList: () => {},

		setSlideState: (newState: SlidesState) => {
			dispatch(setSlidesState(newState));
		},

		setNamePresentation: (newName: string) => {
			dispatch(setNamePresentation(newName));
		},
		setIdPresentation: (id: string) => {
			dispatch(setIdPres(id));
		},

		setPositionSlide: (newPos: Array<{ fromIndex: number; toIndex: number }>) => {
			dispatch(setPositionSlide({ newPos: newPos }));
		},

		setSelectedSlide: (idSLide: Id) => {
			dispatch(setSelectedSlide(idSLide));
		},
		addSelectedSlide: (idSLide: Id) => {
			dispatch(addSelectedSlide(idSLide));
		},

		setSelectedObj: (newSelectedObjId: Id) => {
			dispatch(setSelectedObj(newSelectedObjId));
		},
		addSelectedObj: (newSelectedObjId: Id) => {
			dispatch(addSelectedObj(newSelectedObjId));
		},

		addObjOnCurrentSlide: (obj: SlideObj, idObj: Id) => {
			if (selection.selectedSlides.length == 0) return;
			dispatch(
				addObjOnCurrentSlide({ idSlide: selection.selectedSlides[0], idObj: idObj, slideObj: obj }),
			);
		},

		deleteSelectedObjs: () => {
			if (selection.selectedSlides.length == 0) return;
			dispatch(deleteObjs({ idSlide: selection.selectedSlides[0], ids: selection.selectedObj }));
		},

		updateTextBox: (idTextBox: Id, newTextBox: TextBox) => {
			if (selection.selectedSlides.length == 0) return;
			dispatch(updateTextBox({ idTextBox, newTextBox, idSlide: selection.selectedSlides[0] }));
		},
		updateImage: (idImage: Id, newImage: Image) => {
			if (selection.selectedSlides.length == 0) return;
			dispatch(updateImage({ idImage, newImage, idSlide: selection.selectedSlides[0] }));
		},
		updateRectObj: (idObj: Id, newRect: Rect) => {
			if (selection.selectedSlides.length == 0) return;
			dispatch(updateRectObj({ idObj, newRect, idSlide: selection.selectedSlides[0] }));
		},

		setBackground: (newBackground: Background) => {
			if (selection.selectedSlides.length == 0) return;
			dispatch(setBackground({ newBack: newBackground, idSlide: selection.selectedSlides[0] }));
		},

		clearSelectionObjs: () => {
			dispatch(clearSelectionObjs());
		},
		clearSelectionSlides: () => {
			dispatch(clearSelectionSlides());
		},
	};
};
