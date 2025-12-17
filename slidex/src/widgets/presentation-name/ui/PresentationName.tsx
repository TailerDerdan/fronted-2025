import { useContext } from 'react';
import styles from './presentation-name.module.css';
import { PresActionContext } from '../../../shared/lib/presentationContext';
import { useAppSelector } from '../../../entities/presentation/model/store';

export const PresentationNameView = () => {
	const name = useAppSelector(state => state.presentation.name);

	const actions = useContext(PresActionContext);

	// const debouncedChangeName = useCallback(
	// 	debounce((newName: string) => {
	// 		actions?.setNamePresentation(newName);
	// 	}, 300),
	// 	[actions],
	// );

	return (
		<div className={styles.presName}>
			<input
				type="text"
				id="presName"
				value={name}
				className={styles.presName__input}
				onChange={e => {
					// debouncedChangeName(e.target.value);
					actions?.setNamePresentation(e.target.value);
				}}
			/>
		</div>
	);
};
