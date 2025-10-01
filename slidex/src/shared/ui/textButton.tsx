import { ReactNode } from 'react';
import styles from './button.module.css';

export type TextButtonProps = {
	onClick: () => void;
	children: ReactNode;
	className: string;
};

export const TextButton = (props: TextButtonProps) => {
	const { onClick, children, className } = props;

	return (
		<button onClick={onClick} className={styles[className]}>
			{children}
		</button>
	);
};
