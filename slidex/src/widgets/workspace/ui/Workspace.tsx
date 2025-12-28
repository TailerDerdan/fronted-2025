import { useContext, useRef } from 'react';
import { Slide } from '../../../entities/slide/model/types';
import { Rect } from '../../../shared/model/geometry/rect/model/types';
import { Id } from '../../../shared/model/id/Id';
import { TextButton } from '../../../shared/ui/textButton';
import { SCALE_X, SCALE_Y } from '../lib/consts';
import styles from './workspace.module.css';
import { InfoAboutRect } from '../../../shared/model/setterOfCoords/setterOfCoords';
import { PresActionContext } from '../../../shared/lib/presentationContext';
import { useAppSelector } from '../../../entities/presentation/model/store';
import { getReactNodeObjs, getStyleBackground } from '../../../entities/slide/lib/getSlideObjs';

type WorkspaceProps = {
	slide: Slide;
	isToggleOfBack: boolean;
	setIsToggleOfBack: (state: boolean) => void;
	isSlideShow: boolean;
};

export const Workspace = (props: WorkspaceProps) => {
	const { slide, setIsToggleOfBack, isToggleOfBack, isSlideShow } = props;
	const { selectedObj } = useAppSelector(state => state.selection);

	const arrOfInfoObj = useRef<Array<InfoAboutRect>>([]);
	const actions = useContext(PresActionContext);

	const handleClickTextBox = (idObj: Id, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (event.ctrlKey || event.shiftKey) {
			actions?.addSelectedObj(idObj);
		} else {
			actions?.setSelectedObj(idObj);
		}
	};

	const handleClickImage = (idObj: Id, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (event.ctrlKey || event.shiftKey) {
			actions?.addSelectedObj(idObj);
		} else {
			actions?.setSelectedObj(idObj);
		}
	};

	const handleUpdateRect = (idObj: Id, newRect: Rect) => {
		actions?.updateRectObj(idObj, newRect);
	};

	const objsOnSlide = getReactNodeObjs({
		slide,
		scaleX: SCALE_X,
		scaleY: SCALE_Y,
		isSlideShow,
		onClickImageView: handleClickImage,
		onClickTextBoxView: handleClickTextBox,
		selectedObj: selectedObj,
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

					actions?.clearSelectionObjs();
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
						actions?.clearSelectionObjs();
						event.stopPropagation();
						event.isDefaultPrevented();
					}}
				>
					{objsOnSlide}
				</div>
			</div>
			{!isSlideShow && (
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
			)}
		</div>
	);
};
