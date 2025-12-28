import { useEffect, useState } from 'react';
import styles from './ListPresentation.module.css';
import db from '../../../shared/appwrite/database';
import { useUser } from '../../../shared/appwrite/user';
import { useNavigate } from 'react-router-dom';
import { ID } from 'appwrite';

type PropsPreviewPres = {
	$id: string;
	content: string;
	title: string;
	email: string;
	user_id: string;
	$createdAt: string;
	$updatedAt: string;
	updateListAfterDelete: (id: string) => void;
};

const PreviewPres = (props: PropsPreviewPres) => {
	const { title, email, $createdAt, $updatedAt, $id, updateListAfterDelete } = props;

	const navigate = useNavigate();

	return (
		<div
			className={styles.card}
			onClick={() => {
				navigate(`/list/${$id}`);
			}}
		>
			<button
				onClick={event => {
					event.stopPropagation();
					updateListAfterDelete($id);
					db['presenation'].delete($id);
				}}
			>
				Удалить презентацию
			</button>
			<div className={styles.card_data}>
				<p>Название: {title}</p>
				<p>Email: {email}</p>
				<p>Создана: {new Date($createdAt).toLocaleString()}</p>
				<p>Обновлена: {new Date($updatedAt).toLocaleString()}</p>
			</div>
		</div>
	);
};

export const ListPresentations = () => {
	const [listOfPres, setListOfPres] = useState<PropsPreviewPres[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	const infoAboutUser = useUser();

	useEffect(() => {
		if (!isLoading) {
			if (!infoAboutUser.current) {
				navigate('/');
			}
		}
	}, [infoAboutUser.current, isLoading]);

	const updateListAfterDelete = (deletedId: string) => {
		setListOfPres(prevList => prevList.filter(pres => pres.$id !== deletedId));
	};

	useEffect(() => {
		const init = async () => {
			try {
				const response = await db['presenation'].list();
				setListOfPres(response.rows);
			} catch (error) {
				console.error('ошибка при загрузке презентаций:', error);
			} finally {
				setIsLoading(false);
			}
		};
		console.log(infoAboutUser.current);
		if (infoAboutUser.current) {
			init();
		}
	}, [infoAboutUser.current]);

	const handleCreatePres = () => {
		const addPres = async () => {
			if (infoAboutUser.current) {
				console.log(infoAboutUser.current?.$id);
				const result = await db['presenation'].create(
					{
						content: '',
						title: 'Новая презентация',
						user_id: infoAboutUser.current?.$id,
					},
					ID.unique(),
				);

				console.log(result);

				navigate(`/list/${result.$id}`);
			}
		};

		addPres();
	};

	useEffect(() => {
		console.log(listOfPres);
	});

	return (
		<div className={styles.container}>
			<h1 className={styles.header}>Список презентаций</h1>
			<div className={styles.scrollable_container}>
				<div className={styles.grid}>
					<button className={styles.create_button} onClick={handleCreatePres}>
						Создать
						<br />
						презентацию
					</button>
					{isLoading ? (
						<p>Загрузка презентаций...</p>
					) : (
						listOfPres.map(
							pres =>
								pres.user_id == infoAboutUser.current?.$id && (
									<PreviewPres
										key={pres.$id}
										$id={pres.$id}
										user_id={pres.user_id}
										content={pres.content}
										title={pres.title}
										email={infoAboutUser.current?.email || ''}
										$createdAt={pres.$createdAt}
										$updatedAt={pres.$updatedAt}
										updateListAfterDelete={updateListAfterDelete}
									/>
								),
						)
					)}
				</div>
			</div>
		</div>
	);
};
