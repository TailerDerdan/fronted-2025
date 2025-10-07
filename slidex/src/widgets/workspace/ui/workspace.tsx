import { Slide } from '../../../entities/slide/model/types';
import { getReactNodeObjs, getStyleBackground } from '../../../entities/slide/ui/slide';
import { TextButton } from '../../../shared/ui/textButton';
import styles from './workspace.module.css';

type WorkspaceProps = {
	slide: Slide | undefined;
};

export const Workspace = (props: WorkspaceProps) => {
	const { slide } = props;

	const objsOnSlide = getReactNodeObjs(slide, 0.8234375, 0.694444444);
	const styleSlide = slide ? getStyleBackground(slide.background) : {};

	return (
		<div className={styles.wrapper_workspace}>
			<div className={styles.workspace} style={styleSlide}>
				{objsOnSlide}
			</div>
			<div className={styles.wrapper_workspace__background}>
				<div className={styles.group_buttons}>
					<div className={styles.background__button_color}>
						<TextButton onClick={() => console.log('Цвет фона')} className="">
							<span>Цвет Фона</span>
						</TextButton>
					</div>
					<div className={styles.background__button_image}>
						<TextButton onClick={() => console.log('Картинка на фон')} className="">
							<span>Картинка на фон</span>
						</TextButton>
					</div>
				</div>
			</div>
		</div>
	);
};
