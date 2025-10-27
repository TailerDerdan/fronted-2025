import { MutableRefObject, useEffect, useLayoutEffect, useRef } from 'react';

type PropsDragAndDrop = {
	rectEl: MutableRefObject<HTMLDivElement | null>;
	rectCoords: { x: number; y: number };
	setCoordsRect: (coords: { x: number; y: number }) => void;

	isSlide: boolean;
	isObjOnSlideBar: boolean;

	onEnd: (newX: number, newY: number) => void;

	originalStyle?: MutableRefObject<{ position: string; top: string; left: string }>;
};

export const useDragAndDrop = (props: PropsDragAndDrop) => {
	const { rectEl, rectCoords, setCoordsRect, isSlide, isObjOnSlideBar, onEnd, originalStyle } = props;

	const startsCoord = useRef({ x: 0, y: 0 });

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
			if (rectEl?.current) {
				if (originalStyle?.current) {
					originalStyle.current = {
						position: '',
						top: `${rectCoords.y}px`,
						left: `${rectCoords.x}px`,
					};
				}

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

				if (isSlide) {
					rectEl.current.style.left = `${rectCoords.x}px`;
					rectEl.current.style.top = `${newY}px`;
				} else {
					setCoordsRect({ x: newX, y: newY });
				}
			};

			const onDrop = (event: MouseEvent) => {
				if (isObjOnSlideBar) return;

				window.removeEventListener('mouseup', onDrop);
				window.removeEventListener('mousemove', onDragging);

				if (rectEl?.current) rectEl.current.removeEventListener('mousedown', onDrag);

				const newX = rectCoords.x - startsCoord.current.x + event.pageX;
				const newY = rectCoords.y - startsCoord.current.y + event.pageY;

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
