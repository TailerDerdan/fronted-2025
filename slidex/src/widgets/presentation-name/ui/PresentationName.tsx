import { useContext } from 'react';
import styles from './presentation-name.module.css';
import { PresActionContext } from '../../../shared/lib/presentationContext';

type PresentationNameViewProps = {
	name: string;
};

export const PresentationNameView = (props: PresentationNameViewProps) => {
	const { name } = props;

	const actions = useContext(PresActionContext);

	return (
		<div className={styles.presName}>
			<input
				type="text"
				id="presName"
				defaultValue={name}
				className={styles.presName__input}
				onChange={e => {
					actions?.setNamePresentation(e.target.value);
				}}
			/>
		</div>
	);
};
