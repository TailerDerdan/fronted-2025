import { MutableRefObject, useEffect, useLayoutEffect } from 'react';

type PropsDragAndDrop = {
	rectEl: MutableRefObject<HTMLDivElement | null>;
	rectCoords: { x: number; y: number };
	setCoordsRect: (coords: { x: number; y: number }) => void;
	updateCoordsRect: (x: number, y: number) => void;
};

export const useDragAndDrop = (props: PropsDragAndDrop) => {
	const { rectEl, rectCoords, setCoordsRect, updateCoordsRect } = props;

	let startX = 0;
	let startY = 0;

	useLayoutEffect(() => {
		if (rectEl?.current) {
			rectEl.current.style.left = `${rectCoords.x}px`;
			rectEl.current.style.top = `${rectCoords.y}px`;
		}
	}, [rectEl, rectCoords, setCoordsRect]);

	useEffect(() => {
		const onDrag = (event: MouseEvent) => {
			if (event.defaultPrevented) return;
			event.preventDefault();
			if (rectEl?.current) {
				startX = event.pageX;
				startY = event.pageY;
			}

			const onDragging = (event: MouseEvent) => {
				const newX = rectCoords.x - startX + event.pageX;
				const newY = rectCoords.y - startY + event.pageY;
				console.log(newX, newY);
				setCoordsRect({ x: newX, y: newY });
			};

			const onDrop = (event: MouseEvent) => {
				window.removeEventListener('mouseup', onDrop);
				window.removeEventListener('mousemove', onDragging);

				if (rectEl?.current) rectEl.current.removeEventListener('mousedown', onDrag);

				const newX = rectCoords.x - startX + event.pageX;
				const newY = rectCoords.y - startY + event.pageY;
				window.removeEventListener('mousemove', onDragging);
				setCoordsRect({ x: newX, y: newY });
				updateCoordsRect(newX, newY);
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
