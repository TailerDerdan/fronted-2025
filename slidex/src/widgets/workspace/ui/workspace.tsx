import { Slide } from '../../../entities/slide/model/types';
import { getReactNodeObjs, getStyleBackground } from '../../../entities/slide/ui/slide';
import { TextButton } from '../../../shared/ui/textButton';
import styles from './workspace.module.css';

type WorkspaceProps = {
	slide: Slide | undefined;
};

export const Workspace = (props: WorkspaceProps) => {
	const { slide } = props;

	const objsOnSlide = getReactNodeObjs(slide, 1, 1);
	const styleSlide = slide ? getStyleBackground(slide.background) : {};

	return (
		<div className={styles.wrapper_workspace}>
			<div className={styles.workspace}>
				<div className={styles.visble_workspace} style={styleSlide}>
					{objsOnSlide}
				</div>
			</div>
			<div className={styles.wrapper_workspace__background}>
				<div className={styles.group_buttons}>
					<div className={styles.background__button}>
						<TextButton onClick={() => console.log('Фон слайд')} className="icon_background">
							<span className={styles.button_text}>Фон слайд</span>
						</TextButton>
					</div>
				</div>
			</div>
		</div>
	);
};
