import { Middleware } from 'redux';
import { RootState } from '../model/rootState';
import { push } from '../../history/history';
import { navigateToList, setIdPres, setPres } from '../model/presentationSlice';
import { setSlidesState } from '../model/slideSlice';
import { setSelectionState } from '../model/selectionSlice';
import { autoSave, saveTimeout, setupSaveTimeout } from '../../../shared/appwrite/autoSave';

export const historyMiddleware: Middleware<{}, RootState> = store => next => action => {
	if (
		setPres.match(action) ||
		setSlidesState.match(action) ||
		setSelectionState.match(action) ||
		setIdPres.match(action)
	) {
		return next(action);
	}

	if (navigateToList.match(action)) {
		console.log(navigateToList);
		if (saveTimeout) {
			clearTimeout(saveTimeout);
			setupSaveTimeout();
		}
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
		autoSave(stateAfter);
		push(stateAfter);
	}

	return result;
};
