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

	const allObjects: Record<Id, Rect> = {};
	Object.entries(slide.objects).forEach(([id, slideObj]) => {
		allObjects[id as Id] = {
			x: slideObj.rect.x,
			y: slideObj.rect.y,
			width: slideObj.rect.width,
			height: slideObj.rect.height,
		};
	});

	const selectedRects: Record<Id, Rect> = selectedObj
		? selectedObj.reduce(
				(acc, id) => {
					if (id in slide.objects) {
						acc[id as Id] = {
							x: slide.objects[id].rect.x,
							y: slide.objects[id].rect.y,
							width: slide.objects[id].rect.width,
							height: slide.objects[id].rect.height,
						};
					}
					return acc;
				},
				{} as Record<Id, Rect>,
			)
		: {};

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
					allRects={allObjects}
					movingRects={selectedRects}
				/>
			);
		}
		if (objOnSlide?.type == 'textbox') {
			if (!onClickImageView) {
				console.log(objOnSlide);
			}
			return (
				<TextboxView
					key={elem}
					type={objOnSlide.type}
					text={objOnSlide.text}
					rect={objOnSlide.rect}
					scaleX={scaleX}
					scaleY={scaleY}
					onClick={onClickTextBoxView}
					id={elem}
					isSelected={isSelected}
					handleUpdateRect={handleUpdateRect}
					arrOfInfoObj={arrOfInfoObj}
					allRects={allObjects}
					movingRects={selectedRects}
				/>
			);
		}
	});

	return objsOnSlide;
}

export function getStyleBackground(background: Background): React.CSSProperties {
	if (background.src[0] == '#') {
		return {
			backgroundColor: `${background.src}`,
		};
	}
	return {
		background: `center / cover no-repeat url("${background.src}")`,
	};
}
