import { Middleware } from 'redux';
import { addSlide, deleteSlides, setSlidesState } from '../model/slideSlice';
import { RootState } from '../model/rootState';
import {
	clearSelectionObjs,
	clearSelectionSlides,
	setSelectedSlide,
	setSelectionState,
} from '../model/selectionSlice';
import { setPres } from '../model/presentationSlice';

export const compositeMiddleware: Middleware<{}, RootState> = store => next => action => {
	const state = store.getState();

	if (addSlide.match(action)) {
		const { slideList } = state.slides;

		const isEmpty = Object.keys(slideList).length === 0;
		const result = next(action);
		if (isEmpty) {
			store.dispatch(setSelectedSlide(action.payload));
		}

		return result;
	}

	if (deleteSlides.match(action)) {
		const { selectedSlides } = state.selection;
		const { slideOrder } = state.slides;

		if (selectedSlides.length === 0) {
			return next(action);
		}

		const idPrevCurrentSlide = selectedSlides[0];
		const indexOfPrevSlide = slideOrder.indexOf(idPrevCurrentSlide);
		if (indexOfPrevSlide == -1) {
			return next(action);
		}

		const result = next(action);

		store.dispatch(clearSelectionSlides());
		store.dispatch(clearSelectionObjs());

		const newState = store.getState();
		const newSlideOrder = newState.slides.slideOrder;

		const idNewCurrentSlide = newSlideOrder[indexOfPrevSlide]
			? newSlideOrder[indexOfPrevSlide]
			: newSlideOrder[newSlideOrder.length - 1];
		store.dispatch(setSelectedSlide(idNewCurrentSlide));
		return result;
	}

	if (setPres.match(action)) {
		const newData = action.payload;

		store.dispatch(setSlidesState(newData.slides));
		store.dispatch(setSelectionState(newData.selection));
	}

	return next(action);
};
