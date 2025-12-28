import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../entities/presentation/model/store';
import { autoSave } from '../../../shared/appwrite/autoSave';
import { IconButton } from '../../../shared/ui/iconButton';
import { PresentationNameView } from '../../presentation-name/ui/PresentationName';
import { Toolbar } from '../../toolbar/ui/ToolBar';
import { IconPresent } from '../lib/iconComponent';
import styles from './header.module.css';

export const Header = () => {
	const state = useAppSelector(state => state);
	const navigate = useNavigate();
	const location = useLocation();
	return (
		<div className={styles.header}>
			<div className={styles.header__presName}>
				<PresentationNameView />
			</div>
			<div>
				<button
					onClick={() => {
						autoSave(state);
						navigate('/list');
					}}
				>
					Назад
				</button>
			</div>
			<div className={styles.header__toolbar}>
				<Toolbar />
			</div>
			<div className={styles.header__slideShow}>
				<IconButton
					onClick={() => {
						navigate(location.pathname + '/view');
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
