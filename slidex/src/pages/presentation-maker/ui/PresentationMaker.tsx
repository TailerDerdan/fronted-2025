import { useEffect, useState } from 'react';
import { Header } from '../../../widgets/header/ui/Header';
import { Sidebar } from '../../../widgets/sidebar/ui/Sidebar';
import { SlideList } from '../../../widgets/slide-list/ui/SlideList';
import styles from './presentation.module.css';
import { MainWorkspace } from '../../../widgets/workspace/ui/MainWorkspace';
import { useDeleteHandler } from '../../../features/presentation-editor/lib/handleDelete';
import { clear, push } from '../../../entities/history/history';
import { useAppSelector } from '../../../entities/presentation/model/store';
import { useHistoryHandler } from '../../../features/presentation-editor/lib/handleHistory';
import { useNavigate, useParams } from 'react-router-dom';
import { usePresentationActions } from '../../../features/presentation-editor/model/presentationAction';
import db from '../../../shared/appwrite/database';
import { validate } from '../lib/validatePres';
import { SlidesState } from '../../../entities/presentation/model/slideSlice';
import { RootState } from '../../../entities/presentation/model/rootState';

export const PresentationMaker = () => {
	const [isToggleOfBack, setIsToggleOfBack] = useState(false);
	const navigate = useNavigate();

	const { id } = useParams<{ id: string }>();

	const handleDelete = useDeleteHandler();
	const handleHistory = useHistoryHandler();
	const state = useAppSelector(state => state);
	const actions = usePresentationActions();

	useEffect(() => {
		clear();
		push(state);
		const init = async () => {
			if (id) {
				actions.setIdPresentation(id);

				const row = await db['presenation'].get(id);

				if (validate(JSON.parse(row.content))) {
					const slideState: SlidesState = JSON.parse(row.content);
					const mainState: RootState = {
						slides: slideState,
						selection: {
							selectedObj: [],
							selectedSlides:
								slideState.slideOrder.length == 0 ? [] : [slideState.slideOrder[0]],
						},
						presentation: {
							name: row.title,
							id: id,
						},
					};
					actions.setPresState(mainState);
				} else {
					navigate('/list');
					console.log(row.errors);
				}
			}
		};
		init();
	}, [id]);

	useEffect(() => {
		window.addEventListener('keydown', handleDelete);
		return () => {
			window.removeEventListener('keydown', handleDelete);
		};
	}, [handleDelete]);

	useEffect(() => {
		window.addEventListener('keydown', handleHistory);
		return () => {
			window.removeEventListener('keydown', handleHistory);
		};
	}, [handleHistory]);

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
