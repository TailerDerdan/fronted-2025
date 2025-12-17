import { useCallback } from 'react';
import { useAppDispatch } from '../../../entities/presentation/model/store';
import { redo, undo } from '../../../entities/history/history';
import { setPres } from '../../../entities/presentation/model/presentationSlice';
import { RootState } from '../../../entities/presentation/model/rootState';

export const useHistoryHandler = () => {
	const dispatch = useAppDispatch();

	const setPresState = (state: RootState) => {
		dispatch(setPres(state));
	};

	const handleHistory = useCallback(
		(event: KeyboardEvent) => {
			if (event.ctrlKey || event.metaKey) {
				if (event.key == 'z' || event.key == 'Z' || event.key == 'я' || event.key == 'Я') {
					event.preventDefault();
					undo(setPresState);
				}
				if (event.key == 'y' || event.key == 'Y' || event.key == 'н' || event.key == 'Н') {
					event.preventDefault();
					redo(setPresState);
				}
			}
		},
		[dispatch],
	);

	return handleHistory;
};
