import { MutableRefObject, useEffect, useLayoutEffect, useRef } from 'react';

type PropsDragAndDrop = {
	rectEl: MutableRefObject<HTMLDivElement | null>;
	rectCoords: { x: number; y: number };
	setCoordsRect: (coords: { x: number; y: number }) => void;
	updateCoordsRect?: (x: number, y: number) => void;

	isSlide: boolean;
	isObjOnSlideBar: boolean;
	refOnSlides?: MutableRefObject<HTMLDivElement | null>;
	indexSlide?: number;
	updateOrder?: (from: number, to: number) => void;
};

export const useDragAndDrop = (props: PropsDragAndDrop) => {
	const {
		rectEl,
		rectCoords,
		setCoordsRect,
		updateCoordsRect,
		isSlide,
		refOnSlides,
		indexSlide,
		updateOrder,
		isObjOnSlideBar,
	} = props;

	const startsCoord = useRef({ x: 0, y: 0 });
	const originalStyle = useRef({ position: '', top: '', left: '' });

	useLayoutEffect(() => {
		if (rectEl?.current) {
			rectEl.current.style.left = `${rectCoords.x}px`;
			rectEl.current.style.top = `${rectCoords.y}px`;
		}
	}, [rectEl, rectCoords, setCoordsRect]);

	useEffect(() => {
		const onDrag = (event: MouseEvent) => {
			if (event.defaultPrevented || isObjOnSlideBar) return;
			event.preventDefault();
			if (rectEl.current) {
				originalStyle.current = {
					position: '',
					top: `${rectCoords.y}`,
					left: `${rectCoords.x}`,
				};

				startsCoord.current = { x: event.pageX, y: event.pageY };

				if (isSlide) {
					rectEl.current.style.position = 'relative';
					rectEl.current.style.zIndex = '10';
					rectEl.current.style.left = `${rectCoords.x}px`;
					rectEl.current.style.top = `${rectCoords.y}px`;
				}
			}

			const onDragging = (event: MouseEvent) => {
				if (isObjOnSlideBar || !rectEl.current) return;
				const newX = rectCoords.x - startsCoord.current.x + event.pageX;
				const newY = rectCoords.y - startsCoord.current.y + event.pageY;

				if (isSlide && refOnSlides?.current) {
					rectEl.current.style.left = `${rectCoords.x}px`;
					rectEl.current.style.top = `${newY}px`;
				} else {
					setCoordsRect({ x: newX, y: newY });
				}
			};

			const onDrop = (event: MouseEvent) => {
				window.removeEventListener('mouseup', onDrop);
				window.removeEventListener('mousemove', onDragging);

				if (rectEl?.current) {
					rectEl.current.removeEventListener('mousedown', onDrag);
				}

				if (isObjOnSlideBar) return;

				const newX = rectCoords.x - startsCoord.current.x + event.pageX;
				const newY = rectCoords.y - startsCoord.current.y + event.pageY;
				if (!isSlide && updateCoordsRect) {
					setCoordsRect({ x: newX, y: newY });
					updateCoordsRect(newX, newY);
				} else if (isSlide && rectEl.current) {
					rectEl.current.style.position = '';
					rectEl.current.style.top = originalStyle.current.top;
					rectEl.current.style.left = originalStyle.current.left;
					rectEl.current.style.zIndex = '1';
					if (refOnSlides?.current && updateOrder && indexSlide !== undefined) {
						const childrenArray = Array.from(refOnSlides.current.children);

						const oldY =
							childrenArray[indexSlide].getBoundingClientRect().top -
							refOnSlides.current.getBoundingClientRect().top;

						let newIndex = indexSlide;

						for (let i = 0; i < childrenArray.length - 1; i += 2) {
							const child = childrenArray[i];
							const childNext = childrenArray[i + 1];
							console.log(
								oldY + newY,
								child.getBoundingClientRect().top -
									refOnSlides.current.getBoundingClientRect().top,
							);
							if (
								oldY + newY >=
									child.getBoundingClientRect().top -
										refOnSlides.current.getBoundingClientRect().top &&
								oldY + newY <=
									childNext.getBoundingClientRect().top -
										refOnSlides.current.getBoundingClientRect().top
							) {
								newIndex = indexSlide == 0 ? i : i + 1;
								break;
							}
						}

						if (oldY + newY < 0) {
							newIndex = 0;
						}

						if (
							oldY + newY >=
							childrenArray[childrenArray.length - 1].getBoundingClientRect().top -
								refOnSlides.current.getBoundingClientRect().top
						) {
							newIndex = childrenArray.length - 1;
						}

						if (indexSlide != newIndex) {
							console.log(indexSlide, newIndex, 'ЗЫ');
							updateOrder(indexSlide, newIndex);
						}
					}
				}
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
	}, [
		rectEl,
		rectCoords,
		setCoordsRect,
		updateCoordsRect,
		isSlide,
		isObjOnSlideBar,
		refOnSlides,
		indexSlide,
		updateOrder,
	]);
};
