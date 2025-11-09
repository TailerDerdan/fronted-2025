import { useRef } from 'react';
import {
	addSelectedObj,
	clearSelectionObjs,
	setSelectedObj,
	updateRectObj,
} from '../../../entities/presentation/lib/presentation';
import { Slide } from '../../../entities/slide/model/types';
import { getReactNodeObjs, getStyleBackground } from '../../../entities/slide/ui/Slide';
import { dispatch } from '../../../features/presentation-editor/model/editor';
import { Rect } from '../../../shared/model/geometry/rect/model/types';
import { Id } from '../../../shared/model/id/Id';
import { TextButton } from '../../../shared/ui/textButton';
import { SCALE_X, SCALE_Y } from '../lib/consts';
import styles from './workspace.module.css';
import { InfoAboutRect } from '../../../shared/model/setterOfCoords/setterOfCoords';

type WorkspaceProps = {
	slide: Slide;
	isToggleOfBack: boolean;
	setIsToggleOfBack: (state: boolean) => void;
};

export const Workspace = (props: WorkspaceProps) => {
	const { slide, setIsToggleOfBack, isToggleOfBack } = props;
	const arrOfInfoObj = useRef<Array<InfoAboutRect>>([]);

	const handleClickTextBox = (idObj: Id, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (event.ctrlKey || event.shiftKey) {
			dispatch(addSelectedObj, idObj);
		} else {
			dispatch(setSelectedObj, idObj);
		}
	};

	const handleClickImage = (idObj: Id, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (event.ctrlKey || event.shiftKey) {
			dispatch(addSelectedObj, idObj);
		} else {
			dispatch(setSelectedObj, idObj);
		}
	};

	const handleUpdateRect = (idObj: Id, newRect: Rect) => {
		dispatch(updateRectObj, { idObj: idObj, newRect: newRect });
	};

	const objsOnSlide = getReactNodeObjs({
		slide,
		scaleX: SCALE_X,
		scaleY: SCALE_Y,
		onClickImageView: handleClickImage,
		onClickTextBoxView: handleClickTextBox,
		selectedObj: slide.selectedObj,
		handleUpdateRect: handleUpdateRect,
		arrOfInfoObj: arrOfInfoObj,
	});

	const styleSlide = slide ? getStyleBackground(slide.background) : {};

	return (
		<div className={styles.wrapper_workspace}>
			<div
				className={styles.workspace}
				onClick={event => {
					if (event.ctrlKey) {
						setIsToggleOfBack(!isToggleOfBack);
					}

					dispatch(clearSelectionObjs);
					event.stopPropagation();
					event.isDefaultPrevented();
				}}
			>
				<div
					className={styles.visble_workspace}
					style={styleSlide}
					onClick={event => {
						if (event.ctrlKey) {
							setIsToggleOfBack(!isToggleOfBack);
						}
						dispatch(clearSelectionObjs);
						event.stopPropagation();
						event.isDefaultPrevented();
					}}
				>
					{objsOnSlide}
				</div>
			</div>
			<div className={styles.wrapper_workspace__background}>
				<div className={styles.group_buttons}>
					<div className={styles.background__button}>
						<TextButton
							onClick={() => setIsToggleOfBack(!isToggleOfBack)}
							className="icon_background"
						>
							<span className={styles.button_text}>Фон слайд</span>
						</TextButton>
					</div>
				</div>
			</div>
		</div>
	);
};
