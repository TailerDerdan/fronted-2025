import { ReactNode } from 'react';
import styles from './button.module.css';

export type TextButtonProps = {
	onClick: () => void;
	children: ReactNode;
	className: string;
	loading?: boolean;
};

export const TextButton = (props: TextButtonProps) => {
	const { onClick, children, className, loading } = props;

	return (
		<button onClick={onClick} className={styles[className]} disabled={loading}>
			{children}
		</button>
	);
};
