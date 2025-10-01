import styles from './presentation-name.module.css';

type PresentationNameViewProps = {
	name: string;
};

export const PresentationNameView = (props: PresentationNameViewProps) => {
	const { name } = props;

	return (
		<div className={styles.presName}>
			<input type="text" value={name} className={styles.presName__input} />
		</div>
	);
};
