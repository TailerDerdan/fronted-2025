import { MutableRefObject, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Slide } from '../model/types';
import styles from './slide.module.css';
import { Id } from '../../../shared/model/id/Id';
import { OnEndArgs, useDragAndDrop } from '../../../shared/lib/useDragAndDrop';
import { InfoAboutSlide } from '../../../shared/model/setterOfCoords/setterOfCoords';
import { getReactNodeObjs, getStyleBackground } from '../lib/getSlideObjs';
import { PresActionContext } from '../../../shared/lib/presentationContext';

type SlideProps = {
	slide: Slide;
	scaleX: number;
	scaleY: number;
	isSelected: boolean;
	refOnSlides: MutableRefObject<HTMLDivElement | null>;
	indexOfSlide: number;
	idSlide: Id;
	handleOnClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>, idSlide: Id) => void;
	infoSelectedSlides: MutableRefObject<Array<InfoAboutSlide>>;
	slideOrder: Array<Id>;
};

export const SlideView = (props: SlideProps) => {
	const {
		slide,
		scaleX,
		scaleY,
		isSelected,
		refOnSlides,
		indexOfSlide,
		idSlide,
		handleOnClick,
		infoSelectedSlides,
		slideOrder,
	} = props;

	const [slideCoords, setCoordsSlide] = useState({ x: 0, y: 0 });

	const stableSetCoords = useCallback((newCoords: { x: number; y: number }) => {
		setCoordsSlide(newCoords);
	}, []);

	const slideEl = useRef<HTMLDivElement>(null);
	const originalStyleRef = useRef({ position: '', top: '', left: '' });

	const objsOnSlide = getReactNodeObjs({ slide, scaleX, scaleY, isSlideShow: false });
	const styleSlide = getStyleBackground(slide.background);
	const styleForSelected = isSelected ? styles.slide_selected : ``;
	const actions = useContext(PresActionContext);

	useEffect(() => {
		if (!slideEl.current) return;

		const indexOfSelectedSlide = infoSelectedSlides.current.findIndex(item => item.id === idSlide);
		const currentIndex = slideOrder.findIndex(id => id == idSlide);

		if (isSelected) {
			if (indexOfSelectedSlide == -1) {
				const newInfoSlide: InfoAboutSlide = {
					id: idSlide,
					refObj: slideEl,
					fromIndexOfSlide: currentIndex,
					toIndexOfSlide: currentIndex,
					positionAroundOfToIndex: 'before',
					coordsSlide: slideCoords,
					setCoordsSlide: stableSetCoords,
					originalStyle: originalStyleRef,
				};
				infoSelectedSlides.current.push(newInfoSlide);
			} else {
				if (
					infoSelectedSlides.current[indexOfSelectedSlide].fromIndexOfSlide != currentIndex ||
					infoSelectedSlides.current[indexOfSelectedSlide].toIndexOfSlide != currentIndex
				) {
					infoSelectedSlides.current[indexOfSelectedSlide].fromIndexOfSlide = currentIndex;
					infoSelectedSlides.current[indexOfSelectedSlide].toIndexOfSlide = currentIndex;
				}
			}
		} else {
			if (indexOfSelectedSlide != -1) {
				infoSelectedSlides.current.splice(indexOfSelectedSlide, 1);
			}
		}
	}, [isSelected, idSlide, indexOfSlide, slideEl]);

	const detectSlideUnderCursor = useCallback(
		(xCoord: number, yCoord: number, indexOfDragSlide: number, sizeOfSlides: number) => {
			if (!refOnSlides.current) return null;

			if (sizeOfSlides == 1) {
				const position: 'before' | 'after' = 'before';
				return { index: 0, position: position };
			}

			const elements = document.elementsFromPoint(xCoord, yCoord);

			for (const element of elements) {
				if (element.getAttribute('data-typeslide') == 'wrapper') {
					const index = parseInt(element.getAttribute('data-index') || '0');

					if (indexOfDragSlide == index) continue;

					const rect = element.getBoundingClientRect();
					const position: 'before' | 'after' =
						yCoord < rect.top + rect.height / 2 ? 'before' : 'after';

					return { index, position };
				}
			}

			return null;
		},
		[],
	);

	const onEnd = useCallback(
		(args: OnEndArgs) => {
			if ('x' in args && 'y' in args) return;
			if (args.newPos.length == 0) return;
			actions?.setPositionSlide(args.newPos);
		},
		[actions],
	);

	useDragAndDrop({
		rectEl: slideEl,
		isSlide: true,
		rectCoords: slideCoords,
		setCoordsRect: setCoordsSlide,
		isObjOnSlideBar: false,
		onEnd: onEnd,
		handleDetectTarget: detectSlideUnderCursor,
		infoSelectedSlides: infoSelectedSlides,
		sizeOfSlides: slideOrder.length,
	});

	return (
		<div
			className={styles.wrapper_slide}
			onClick={event => {
				event.stopPropagation();
				event.preventDefault();
				handleOnClick(event, idSlide);
			}}
			ref={slideEl}
			data-index={indexOfSlide}
			data-typeslide={'wrapper'}
		>
			<div className={`${styles.slide} ${styleForSelected}`} style={styleSlide}>
				{objsOnSlide}
			</div>
		</div>
	);
};
