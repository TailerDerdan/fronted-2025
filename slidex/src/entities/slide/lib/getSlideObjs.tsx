import { MutableRefObject, ReactNode } from 'react';
import { InfoAboutRect } from '../../../shared/model/setterOfCoords/setterOfCoords';
import { Rect } from '../../../shared/model/geometry/rect/model/types';
import { Id } from '../../../shared/model/id/Id';
import { Slide } from '../model/types';
import { ImageView } from '../../image/ui/Image';
import { TextboxView } from '../../text-box/ui/Textbox';
import { Background } from '../../../shared/model/background/Background';

type PropsForSlideObj = {
	slide: Slide;
	scaleX: number;
	scaleY: number;
	isSlideShow: boolean;
	onClickImageView?: (id: Id, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	onClickTextBoxView?: (id: Id, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	selectedObj?: Array<Id>;
	handleUpdateRect?: (idObj: Id, newRect: Rect) => void;
	arrOfInfoObj?: MutableRefObject<Array<InfoAboutRect>>;
};

export function getReactNodeObjs(props: PropsForSlideObj): Array<ReactNode> {
	const {
		scaleX,
		scaleY,
		slide,
		isSlideShow,
		onClickImageView,
		onClickTextBoxView,
		selectedObj,
		handleUpdateRect,
		arrOfInfoObj,
	} = props;

	let isSelected: boolean = false;

	const objsOnSlide: Array<ReactNode> = slide.layersOfSlide.map((elem: string) => {
		const objOnSlide = slide.objects[elem];
		isSelected = false;
		if (!isSlideShow && selectedObj && selectedObj.indexOf(elem) >= 0) {
			isSelected = true;
		}
		if (objOnSlide?.type == 'image') {
			return (
				<ImageView
					key={elem}
					type={objOnSlide.type}
					rect={objOnSlide.rect}
					src={objOnSlide.src}
					borderColor={objOnSlide.borderColor}
					scaleX={scaleX}
					scaleY={scaleY}
					onClick={onClickImageView}
					id={elem}
					isSelected={isSelected}
					handleUpdateRect={handleUpdateRect}
					arrOfInfoObj={arrOfInfoObj}
				/>
			);
		}
		if (objOnSlide?.type == 'textbox') {
			return (
				<TextboxView
					key={elem}
					type={objOnSlide.type}
					texts={objOnSlide.texts}
					rect={objOnSlide.rect}
					alignment={objOnSlide.alignment}
					scaleX={scaleX}
					scaleY={scaleY}
					onClick={onClickTextBoxView}
					id={elem}
					isSelected={isSelected}
					handleUpdateRect={handleUpdateRect}
					arrOfInfoObj={arrOfInfoObj}
				/>
			);
		}
	});

	return objsOnSlide;
}

export function getStyleBackground(background: Background): React.CSSProperties {
	// console.log(background, 'ewew');
	if (background[0] == '#') {
		return {
			backgroundColor: `${background}`,
		};
	}
	return {
		background: `center / cover no-repeat url("${background}")`,
	};
}
