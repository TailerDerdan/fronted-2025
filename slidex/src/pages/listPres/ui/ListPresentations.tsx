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
};

const PreviewPres = (props: PropsPreviewPres) => {
	const { title, email, $createdAt, $updatedAt, $id } = props;

	const navigate = useNavigate();

	return (
		<div
			className={styles.card}
			onClick={() => {
				navigate(`/list/${$id}`);
			}}
		>
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
	const navigate = useNavigate();

	const infoAboutUser = useUser();

	useEffect(() => {
		const init = async () => {
			const response = await db['presenation'].list();
			setListOfPres(response.rows);
		};
		console.log(infoAboutUser.current);
		init();
	}, []);

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
			<div className={styles.grid}>
				<button className={styles.create_button} onClick={handleCreatePres}>
					Создать
					<br />
					презентацию
				</button>
				{listOfPres.map(
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
							/>
						),
				)}
			</div>
		</div>
	);
};
