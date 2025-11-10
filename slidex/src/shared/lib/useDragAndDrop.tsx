import { MutableRefObject, useEffect, useLayoutEffect, useRef } from 'react';
import { TCorner } from '../model/corner/corner';
import { InfoAboutRect } from '../model/setterOfCoords/setterOfCoords';

type PropsDragAndDrop = {
	rectEl: MutableRefObject<HTMLDivElement | null>;
	rectCoords: { x: number; y: number };
	setCoordsRect: (coords: { x: number; y: number }) => void;

	isSlide: boolean;
	isObjOnSlideBar: boolean;

	onEnd: (newX: number, newY: number) => void;

	originalStyle?: MutableRefObject<{ position: string; top: string; left: string }>;
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
		originalStyle,
		typeCorner,
		stateEditing,
		arrOfInfoObj,
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
				if (originalStyle?.current) {
					originalStyle.current = {
						position: '',
						top: `${rectCoords.y}px`,
						left: `${rectCoords.x}px`,
					};
				}

				startsCoord.current = { x: event.pageX, y: event.pageY };

				if (arrOfInfoObj) {
					initialCoords.current = arrOfInfoObj.current.map(elem => ({
						x: elem.coordsObj.x,
						y: elem.coordsObj.y,
					}));
				}

				if (isSlide) {
					rectEl.current.style.position = 'relative';
					rectEl.current.style.zIndex = '10';
					rectEl.current.style.left = `${rectCoords.x}px`;
					rectEl.current.style.top = `${rectCoords.y}px`;
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
				} else {
					if (isSlide) {
						rectEl.current.style.left = `${rectCoords.x}px`;
						rectEl.current.style.top = `${newY}px`;
					} else {
						setCoordsRect({ x: newX, y: newY });
					}
				}
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
								elem.onEnd(newX, newY);
							}
						}
					});
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

				onEnd(newX, newY);
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
