import { RootState } from '../presentation/model/rootState';

const stateOfActions = {
	past: <Array<RootState>>[],
	future: <Array<RootState>>[],
};

export const push = (state: RootState) => {
	const newState = state;
	stateOfActions.past.push(newState);
	stateOfActions.future.length = 0;
};

export const undo = (setState: (state: RootState) => void) => {
	if (stateOfActions.past.length == 1) return;

	const currentState = stateOfActions.past.pop()!;
	stateOfActions.future.unshift(currentState);

	setState(stateOfActions.past[stateOfActions.past.length - 1]);
};

export const redo = (setState: (state: RootState) => void) => {
	if (stateOfActions.future.length == 0) return;

	const nextState = stateOfActions.future.shift()!;
	stateOfActions.past.push(nextState);

	setState(nextState);
};

export const clear = () => {
	stateOfActions.past.length = 0;
	stateOfActions.future.length = 0;
};
