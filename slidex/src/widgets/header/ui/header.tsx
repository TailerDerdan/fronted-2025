import { IconButton } from '../../../shared/ui/iconButton';
import { PresentationNameView } from '../../presentation-name/ui/presentation-name';
import { Toolbar } from '../../toolbar/ui/toolbar';
import { IconPresent } from '../lib/iconComponent';
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
			<div className={styles.header__slideShow}>
				<IconButton
					onClick={() => {
						console.log('Показ слайдов');
					}}
					className="icon_toolbar_present"
					icon={<IconPresent />}
				>
					<p>Слайд шоу</p>
				</IconButton>
			</div>
		</div>
	);
};
