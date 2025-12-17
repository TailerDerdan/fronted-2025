import { Middleware } from 'redux';
import { RootState } from '../model/rootState';
import { push } from '../../history/history';
import { setPres } from '../model/presentationSlice';
import { setSlidesState } from '../model/slideSlice';
import { setSelectionState } from '../model/selectionSlice';
import { autoSave, DEBOUNCE_DELAY } from '../../../shared/appwrite/autoSave';

export let saveTimeout: NodeJS.Timeout | null = null;
//вынести autoSave
export const historyMiddleware: Middleware<{}, RootState> = store => next => action => {
	if (setPres.match(action) || setSlidesState.match(action) || setSelectionState.match(action)) {
		return next(action);
	}

	const stateBefore = store.getState();
	const result = next(action);
	const stateAfter = store.getState();

	if (
		stateBefore.slides.slideList != stateAfter.slides.slideList ||
		stateBefore.presentation.name != stateAfter.presentation.name ||
		stateBefore.slides.slideOrder != stateAfter.slides.slideOrder
	) {
		if (saveTimeout) {
			clearTimeout(saveTimeout);
		}

		saveTimeout = setTimeout(() => {
			autoSave(stateAfter);
		}, DEBOUNCE_DELAY);

		push(stateAfter);
	}

	return result;
};
