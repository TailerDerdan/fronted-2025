import { Middleware } from 'redux';
import { addSlide, deleteSlides } from '../model/slideSlice';
import { RootState } from '../model/rootState';
import { clearSelectionObjs, clearSelectionSlides, setSelectedSlide } from '../model/selectionSlice';

export const compositeMiddleware: Middleware<{}, RootState> = store => next => action => {
	const state = store.getState();

	if (addSlide.match(action)) {
		const { slideList } = state.slides;

		const wasEmpty = Object.keys(slideList).length === 0;
		const result = next(action);
		if (wasEmpty) {
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

	return next(action);
};
