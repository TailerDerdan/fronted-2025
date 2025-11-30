import { MutableRefObject, useEffect, useLayoutEffect, useRef } from 'react';
import { TCorner } from '../model/corner/corner';
import { InfoAboutRect, InfoAboutSlide } from '../model/setterOfCoords/setterOfCoords';

const getCorrectPositions = (
	infoSelectedSlides: MutableRefObject<Array<InfoAboutSlide>>,
	totalSlidesCount: number,
) => {
	const sortedSelectedSlides = infoSelectedSlides.current.sort(
		(a, b) => a.fromIndexOfSlide - b.fromIndexOfSlide,
	);
	const firstInsertIndex = sortedSelectedSlides[0].toIndexOfSlide;
	const isPosAfterForFirstInsertIndex = sortedSelectedSlides[0].positionAroundOfToIndex === 'after';

	const nonSelectedIndexes = Array.from({ length: totalSlidesCount }, (value, index) => index).filter(
		index => !sortedSelectedSlides.some(slide => slide.fromIndexOfSlide === index),
	);

	let firstInsertPos = nonSelectedIndexes.indexOf(firstInsertIndex);
	if (firstInsertPos === -1) {
		firstInsertPos = nonSelectedIndexes.findIndex(index => index > firstInsertIndex);
		if (firstInsertPos === -1) firstInsertPos = nonSelectedIndexes.length;
	}

	const minOriginalIndex = sortedSelectedSlides[0].fromIndexOfSlide;
	let insertPosition = firstInsertPos;
	if (isPosAfterForFirstInsertIndex) insertPosition++;

	const newOrder = [...nonSelectedIndexes];

	sortedSelectedSlides.forEach(slide => {
		const offset = slide.fromIndexOfSlide - minOriginalIndex;
		const newPosition = insertPosition + offset;

		newOrder.splice(newPosition, 0, slide.fromIndexOfSlide);

		slide.toIndexOfSlide = newPosition;
	});
};

export type OnEndArgs = { x: number; y: number } | { newPos: Array<{ fromIndex: number; toIndex: number }> };

type PropsDragAndDrop = {
	rectEl: MutableRefObject<HTMLDivElement | null>;
	rectCoords: { x: number; y: number };
	setCoordsRect: (coords: { x: number; y: number }) => void;

	isSlide: boolean;
	isObjOnSlideBar: boolean;

	onEnd: (args: OnEndArgs) => void;

	handleDetectTarget?: (
		xCoord: number,
		yCoord: number,
		indexOfDragSlide: number,
		sizeOfSlides: number,
	) => {
		index: number;
		position: 'before' | 'after';
	} | null;
	infoSelectedSlides?: MutableRefObject<Array<InfoAboutSlide>>;
	sizeOfSlides?: number;

	typeCorner?: TCorner;

	stateEditing?: boolean;
	arrOfInfoObj?: MutableRefObject<Array<InfoAboutRect>>;
};

export const useDragAndDrop = (props: PropsDragAndDrop) => {
	const {
		rectEl,
		rectCoords,
		setCoordsRect,
		isSlide,
		isObjOnSlideBar,
		onEnd,
		typeCorner,
		stateEditing,
		arrOfInfoObj,
		handleDetectTarget,
		infoSelectedSlides,
		sizeOfSlides,
	} = props;

	const startsCoord = useRef({ x: 0, y: 0 });
	const initialCoords = useRef<Array<{ x: number; y: number }>>([]);

	useLayoutEffect(() => {
		if (arrOfInfoObj) {
			arrOfInfoObj.current.forEach(elem => {
				if (elem.refObj.current && elem.coordsObj) {
					if (!isNaN(elem.coordsObj.x) && !isNaN(elem.coordsObj.y)) {
						elem.refObj.current.style.left = `${elem.coordsObj.x}px`;
						elem.refObj.current.style.top = `${elem.coordsObj.y}px`;
					}
				}
			});
		} else {
			if (rectEl?.current && !isNaN(rectCoords.x) && !isNaN(rectCoords.y)) {
				rectEl.current.style.left = `${rectCoords.x}px`;
				rectEl.current.style.top = `${rectCoords.y}px`;
			}
		}
	}, [rectEl, rectCoords, setCoordsRect, arrOfInfoObj]);

	useEffect(() => {
		const onDrag = (event: MouseEvent) => {
			if (stateEditing) return;
			if (event.defaultPrevented || isObjOnSlideBar) return;
			event.preventDefault();
			if (rectEl?.current) {
				startsCoord.current = { x: event.pageX, y: event.pageY };

				if (arrOfInfoObj) {
					initialCoords.current = arrOfInfoObj.current.map(elem => ({
						x: elem.coordsObj.x,
						y: elem.coordsObj.y,
					}));
				}

				if (isSlide && infoSelectedSlides?.current) {
					initialCoords.current = infoSelectedSlides.current.map(slide => ({
						x: slide.coordsSlide.x,
						y: slide.coordsSlide.y,
					}));
					infoSelectedSlides.current.forEach(slide => {
						if (slide.refObj.current) {
							slide.originalStyle.current.position = '';
							slide.originalStyle.current.left = `${slide.coordsSlide.x}px`;
							slide.originalStyle.current.top = `${slide.coordsSlide.y}px`;

							slide.refObj.current.style.position = 'relative';
							slide.refObj.current.style.zIndex = '10';
							slide.refObj.current.style.left = `${slide.coordsSlide.x}px`;
							slide.refObj.current.style.top = `${slide.coordsSlide.y}px`;
						}
					});
				}
			}

			const onDragging = (event: MouseEvent) => {
				if (isObjOnSlideBar || !rectEl.current) return;

				const deltaX = event.pageX - startsCoord.current.x;
				const deltaY = event.pageY - startsCoord.current.y;

				if (isNaN(deltaX) || isNaN(deltaY)) {
					console.error('invalid:', deltaX, deltaY);
					return;
				}

				if (infoSelectedSlides?.current) {
					console.log([...infoSelectedSlides.current]);
					infoSelectedSlides.current.forEach((slide, index) => {
						const initial = initialCoords.current[index];
						if (initial && slide.refObj.current) {
							const newY = initial.y + deltaY;

							slide.refObj.current.style.left = `${slide.coordsSlide.x}px`;
							slide.refObj.current.style.top = `${newY}px`;

							slide.setCoordsSlide({ x: slide.coordsSlide.x, y: newY });

							if (handleDetectTarget && sizeOfSlides) {
								const rect = slide.refObj.current.getBoundingClientRect();
								const centerX = rect.left + rect.width / 2;
								const centerY = rect.top + rect.height / 2;

								const target = handleDetectTarget(
									centerX,
									centerY,
									slide.fromIndexOfSlide,
									sizeOfSlides,
								);

								if (target) {
									slide.toIndexOfSlide = target.index;
									slide.positionAroundOfToIndex = target.position;
								}
							}
						}
					});
					return;
				}

				if (arrOfInfoObj) {
					arrOfInfoObj.current.forEach((elem, index) => {
						const initial = initialCoords.current[index];
						if (initial) {
							const newX = initial.x + deltaX;
							const newY = initial.y + deltaY;

							if (!isNaN(newX) && !isNaN(newY)) {
								elem.setCoordsObj({ x: newX, y: newY });
							}
						}
					});
					return;
				}
				const newX = rectCoords.x + deltaX;
				const newY = rectCoords.y + deltaY;

				if (isNaN(newX) || isNaN(newY)) return;

				if (typeCorner) {
					if (
						typeCorner == 'top_left' ||
						typeCorner == 'top_right' ||
						typeCorner == 'bottom_right' ||
						typeCorner == 'bottom_left'
					) {
						setCoordsRect({ x: newX, y: newY });
					} else if (typeCorner == 'top_center' || typeCorner == 'bottom_center') {
						setCoordsRect({ x: rectCoords.x, y: newY });
					} else if (typeCorner == 'left_center' || typeCorner == 'right_center') {
						setCoordsRect({ x: newX, y: rectCoords.y });
					}
					return;
				}

				setCoordsRect({ x: newX, y: newY });
			};

			const onDrop = (event: MouseEvent) => {
				if (isObjOnSlideBar) return;

				window.removeEventListener('mouseup', onDrop);
				window.removeEventListener('mousemove', onDragging);

				if (rectEl?.current) rectEl.current.removeEventListener('mousedown', onDrag);

				const deltaX = event.pageX - startsCoord.current.x;
				const deltaY = event.pageY - startsCoord.current.y;

				if (isNaN(deltaX) || isNaN(deltaY)) {
					console.error('invalid:', deltaX, deltaY);
					return;
				}

				if (arrOfInfoObj) {
					arrOfInfoObj.current.forEach((elem, index) => {
						const initial = initialCoords.current[index];
						if (initial) {
							const newX = initial.x + deltaX;
							const newY = initial.y + deltaY;
							if (!isNaN(newX) && !isNaN(newY)) {
								elem.onEnd({ x: newX, y: newY });
							}
						}
					});
					return;
				}

				if (isSlide && sizeOfSlides && infoSelectedSlides?.current) {
					console.log('onEnd');

					getCorrectPositions(infoSelectedSlides, sizeOfSlides);
					const allMoves = infoSelectedSlides.current
						.filter(slide => slide.fromIndexOfSlide !== slide.toIndexOfSlide)
						.map(slide => ({
							fromIndex: slide.fromIndexOfSlide,
							toIndex: slide.toIndexOfSlide,
						}));
					console.log(allMoves);
					onEnd({ newPos: allMoves });

					infoSelectedSlides.current.forEach(slide => {
						if (slide.refObj.current) {
							slide.refObj.current.style.position = '';
							slide.refObj.current.style.zIndex = '1';
							slide.refObj.current.style.left = '';
							slide.refObj.current.style.top = '';
						}
						slide.fromIndexOfSlide = slide.toIndexOfSlide;
						slide.positionAroundOfToIndex = 'before';
						slide.setCoordsSlide({ x: 0, y: 0 });
					});

					console.log(infoSelectedSlides);
					return;
				}

				const newX = rectCoords.x + deltaX;
				const newY = rectCoords.y + deltaY;

				if (isNaN(newX) || isNaN(newY)) return;

				if (isSlide) {
					if (rectEl.current) {
						rectEl.current.style.position = '';
						rectEl.current.style.zIndex = '1';
					}
				}

				onEnd({ x: newX, y: newY });
			};

			window.addEventListener('mousemove', onDragging);
			window.addEventListener('mouseup', onDrop);
		};

		if (rectEl?.current) {
			rectEl.current.addEventListener('mousedown', onDrag);
		}

		return () => {
			if (rectEl?.current) {
				rectEl.current.removeEventListener('mousedown', onDrag);
			}
		};
	});
};
