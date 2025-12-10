import { Middleware } from 'redux';
import { addSlide, deleteObjs, deleteSlides, setBackground } from '../model/slideSlice';
import { RootState } from '../model/rootState';
import { push } from '../../history/history';

export const historyMiddleware: Middleware<{}, RootState> = store => next => action => {
	const result = next(action);
	const stateAfter = store.getState();

	if (
		addSlide.match(action) ||
		deleteSlides.match(action) ||
		setBackground.match(action) ||
		deleteObjs.match(action)
	) {
		push(stateAfter);
	}

	return result;
};
