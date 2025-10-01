import { ReactNode } from 'react';
import styles from './button.module.css';
import { TextButtonProps } from './textButton';

type IconButtonProps = TextButtonProps & {
	icon: ReactNode;
};

export const IconButton = (props: IconButtonProps) => {
	const { onClick, className, icon } = props;

	return (
		<button onClick={onClick} className={styles[className]}>
			{icon}
		</button>
	);
};
