import { addSlide, setSelectedSlide } from '../../../entities/presentation/lib/presentation';
import { dispatch } from '../../../features/presentation-editor/model/editor';
import styles from './workspace.module.css';

export const EmptyWorkspace = () => {
	return (
		<div className={styles.wrapper_workspace}>
			<div
				className={styles.workspace}
				onClick={event => {
					dispatch(addSlide);
					dispatch(setSelectedSlide, 0);
					event.stopPropagation();
					event.isDefaultPrevented();
				}}
			>
				<div
					className={styles.visble_workspace}
					onClick={event => {
						dispatch(addSlide);
						dispatch(setSelectedSlide, 0);
						event.stopPropagation();
						event.isDefaultPrevented();
					}}
				>
					Нажмите, чтобы добавить слайд
				</div>
			</div>
			<div className={styles.wrapper_workspace__background}>
				<div className={styles.group_buttons}>
					<div className={styles.background__button}></div>
				</div>
			</div>
		</div>
	);
};
