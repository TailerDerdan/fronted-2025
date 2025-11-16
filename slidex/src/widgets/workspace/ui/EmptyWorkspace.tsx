import { useContext } from 'react';
import styles from './workspace.module.css';
import { PresActionContext } from '../../../shared/lib/presentationContext';

export const EmptyWorkspace = () => {
	const actions = useContext(PresActionContext);
	return (
		<div className={styles.wrapper_workspace}>
			<div
				className={styles.workspace}
				onClick={event => {
					actions?.addSlide();
					event.stopPropagation();
					event.isDefaultPrevented();
				}}
			>
				<div
					className={styles.visble_workspace}
					onClick={event => {
						actions?.addSlide();
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
