import { useCallback } from 'react';
import { getSelectedObjects } from '../../../entities/presentation/lib/presentation';
import { deleteObjs, deleteSlides } from '../../../entities/presentation/model/slideSlice';
import { useAppDispatch, useAppSelector } from '../../../entities/presentation/model/store';

export const useDeleteHandler = () => {
	const { slides, selection } = useAppSelector(state => state);
	const dispatch = useAppDispatch();

	const handleDelete = useCallback(
		(event: KeyboardEvent) => {
			const target = event.target as HTMLElement;

			if (
				target.tagName === 'INPUT' ||
				target.tagName === 'TEXTAREA' ||
				target.getAttribute('contentEditable') == 'true'
			) {
				return;
			}

			if (event.key == 'Delete' || event.key == 'Backspace') {
				if (
					getSelectedObjects(selection.selectedObj, slides.slideList, selection.selectedSlides[0])
						.length == 0
				) {
					console.log('delete', selection.selectedSlides);
					dispatch(deleteSlides(selection.selectedSlides));
				} else {
					if (selection.selectedSlides.length == 0) return;
					dispatch(
						deleteObjs({ idSlide: selection.selectedSlides[0], ids: selection.selectedObj }),
					);
				}
			}
		},
		[dispatch, slides, selection],
	);

	return handleDelete;
};
