import { useLocation, useNavigate } from 'react-router-dom';
import { emptyPresState, useAppSelector } from '../../../entities/presentation/model/store';
import { autoSave } from '../../../shared/appwrite/autoSave';
import { IconButton } from '../../../shared/ui/iconButton';
import { PresentationNameView } from '../../presentation-name/ui/PresentationName';
import { Toolbar } from '../../toolbar/ui/ToolBar';
import { IconPresent } from '../lib/iconComponent';
import styles from './header.module.css';
import { useContext } from 'react';
import { PresActionContext } from '../../../shared/lib/presentationContext';

export const Header = () => {
	const state = useAppSelector(state => state);
	const actions = useContext(PresActionContext);
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
						setTimeout(() => {
							navigate('/list');
							actions?.setPresState(emptyPresState);
						}, 350);
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
