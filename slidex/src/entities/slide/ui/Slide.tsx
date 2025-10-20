import { ReactNode } from 'react';
import { ImageView } from '../../image/ui/Image';
import { TextboxView } from '../../text-box/ui/Textbox';
import { Slide } from '../model/types';
import styles from './slide.module.css';
import { Background } from '../../../shared/model/background/Background';
import { Id } from '../../../shared/model/id/Id';
import { Rect } from '../../../shared/model/geometry/rect/model/types';

type PropsForSlideObj = {
	slide: Slide;
	scaleX: number;
	scaleY: number;
	onClickImageView?: (id: Id, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	onClickTextBoxView?: (id: Id, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	selectedObj?: Array<Id>;
	handleUpdateRect?: (idObj: Id, newRect: Rect) => void;
};

export function getReactNodeObjs(props: PropsForSlideObj): Array<ReactNode> {
	const { scaleX, scaleY, slide, onClickImageView, onClickTextBoxView, selectedObj, handleUpdateRect } =
		props;

	let isSelected: boolean = false;

	const objsOnSlide: Array<ReactNode> = slide.layersOfSlide.map((elem: string) => {
		const objOnSlide = slide.objects.get(elem);
		isSelected = false;
		if (selectedObj && selectedObj.indexOf(elem) >= 0) {
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
				/>
			);
		}
	});

	return objsOnSlide;
}

export function getStyleBackground(background: Background): React.CSSProperties {
	if (background && typeof background === 'object' && 'src' in background) {
		return {
			background: `center / cover no-repeat url("${background.src}")`,
		};
	} else {
		return {
			background: background,
		};
	}
}

type SlideProps = {
	slide: Slide;
	scaleX: number;
	scaleY: number;
	isSelected: boolean;
};

export const SlideView = (props: SlideProps) => {
	const { slide, scaleX, scaleY, isSelected } = props;

	const objsOnSlide = getReactNodeObjs({ slide, scaleX, scaleY });

	const styleSlide = getStyleBackground(slide.background);

	const styleForSelected = isSelected ? styles.slide_selected : ``;

	return (
		<div className={`${styles.slide} ${styleForSelected}`} style={styleSlide}>
			{objsOnSlide}
		</div>
	);
};
