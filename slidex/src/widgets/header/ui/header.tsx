import { PresentationNameView } from '../../presentation-name/ui/presentation-name';
import { Toolbar } from '../../toolbar/ui/toolbar';
import styles from './header.module.css';

type HeaderProps = {
	name: string;
};

export const Header = (props: HeaderProps) => {
	const { name } = props;

	return (
		<div className={styles.header}>
			<div className={styles.header__presName}>
				<PresentationNameView name={name} />
			</div>
			<div className={styles.header__toolbar}>
				<Toolbar />
			</div>
		</div>
	);
};
