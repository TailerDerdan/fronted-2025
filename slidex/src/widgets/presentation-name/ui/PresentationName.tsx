import { setNamePresentation } from '../../../entities/presentation/lib/presentation';
import { dispatch } from '../../../features/presentation-editor/model/editor';
import styles from './presentation-name.module.css';

type PresentationNameViewProps = {
	name: string;
};

export const PresentationNameView = (props: PresentationNameViewProps) => {
	const { name } = props;

	return (
		<div className={styles.presName}>
			<input
				type="text"
				id="presName"
				defaultValue={name}
				className={styles.presName__input}
				onChange={e => {
					dispatch(setNamePresentation, e.target.value);
				}}
			/>
		</div>
	);
};
