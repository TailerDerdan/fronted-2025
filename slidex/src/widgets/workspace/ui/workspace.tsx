import { Slide } from '../../../entities/slide/model/types';
import { getReactNodeObjs } from '../../../entities/slide/ui/slide';
import styles from './workspace.module.css';

type WorkspaceProps = {
	slide: Slide | undefined;
};

export const Workspace = (props: WorkspaceProps) => {
	const { slide } = props;

	const objsOnSlide = getReactNodeObjs(slide);

	return (
		<div className={styles.wrapper_workspace}>
			<div className={styles.workspace}>{objsOnSlide}</div>
			<div className={styles.wrapper_workspace__background}></div>
		</div>
	);
};
