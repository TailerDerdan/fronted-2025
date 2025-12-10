import { useEffect, useState } from 'react';
import { Header } from '../../../widgets/header/ui/Header';
import { Sidebar } from '../../../widgets/sidebar/ui/Sidebar';
import { SlideList } from '../../../widgets/slide-list/ui/SlideList';
import styles from './presentation.module.css';
import { MainWorkspace } from '../../../widgets/workspace/ui/MainWorkspace';
import { useDeleteHandler } from '../../../features/presentation-editor/lib/handleDelete';
import { push } from '../../../entities/history/history';
import { useAppSelector } from '../../../entities/presentation/model/store';

export const PresentationMaker = () => {
	const [isToggleOfBack, setIsToggleOfBack] = useState(false);
	const handleDelete = useDeleteHandler();
	const state = useAppSelector(state => state);

	useEffect(() => {
		push(state);
	}, []);

	useEffect(() => {
		window.addEventListener('keydown', handleDelete);
		return () => {
			window.removeEventListener('keydown', handleDelete);
		};
	}, [handleDelete]);

	return (
		<div className={styles.presentation}>
			<Header />
			<Sidebar isToggleOfBack={isToggleOfBack} />
			<div className={styles.presentation__workfield}>
				<SlideList />
				<MainWorkspace isToggleOfBack={isToggleOfBack} setIsToggleOfBack={setIsToggleOfBack} />
			</div>
		</div>
	);
};
