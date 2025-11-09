import {
	deleteSelectedObjs,
	deleteSlides,
	getSelectedObjects,
} from '../../../entities/presentation/lib/presentation';
import { dispatch, editor } from '../model/editor';

export const handleDelete = (event: KeyboardEvent) => {
	const target = event.target as HTMLElement;

	if (
		target.tagName === 'INPUT' ||
		target.tagName === 'TEXTAREA' ||
		target.getAttribute('contentEditable') == 'true'
	) {
		return;
	}

	if (event.key == 'Delete' || event.key == 'Backspace') {
		if (getSelectedObjects(editor).length == 0) {
			dispatch(deleteSlides);
		} else {
			dispatch(deleteSelectedObjs);
		}
	}
};
