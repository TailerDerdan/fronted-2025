import { MutableRefObject, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useDragAndDrop } from './useDragAndDrop';
import { Rect } from '../model/geometry/rect/model/types';
import { TCorner } from '../model/corner/corner';
import { MARGIN_CORNER } from '../ui/Corner';
import { Id } from '../model/id/Id';

type PropsResize = {
	idRect: Id;
	rectEl: MutableRefObject<HTMLDivElement | null>;
	cornerEl: MutableRefObject<HTMLDivElement | null>;
	typeCorner: TCorner;
	rect: Rect;
	updateRectOnEnd?: (idObj: Id, newRect: Rect) => void;
};

export const useResize = (props: PropsResize) => {
	const { idRect, rectEl, typeCorner, cornerEl, rect, updateRectOnEnd } = props;
	const [coordsOfCorner, setCoordsOfCorner] = useState({ x: 0, y: 0 });
	const [newRect, setNewRect] = useState({ ...rect });

	const updateStyleCorner = (cornerEl: MutableRefObject<HTMLDivElement | null>, typeCorner: TCorner) => {
		if (!cornerEl.current) return;
		switch (typeCorner) {
			case 'top_left':
				cornerEl.current.style.top = `-${MARGIN_CORNER}px`;
				cornerEl.current.style.left = `-${MARGIN_CORNER}px`;
				break;
			case 'top_right':
				cornerEl.current.style.top = `-${MARGIN_CORNER}px`;
				cornerEl.current.style.left = '';
				cornerEl.current.style.right = `-${MARGIN_CORNER}px`;
				break;
			case 'bottom_left':
				cornerEl.current.style.top = '';
				cornerEl.current.style.bottom = `-${MARGIN_CORNER}px`;
				cornerEl.current.style.left = `-${MARGIN_CORNER}px`;
				break;
			case 'bottom_right':
				cornerEl.current.style.top = '';
				cornerEl.current.style.bottom = `-${MARGIN_CORNER}px`;
				cornerEl.current.style.left = '';
				cornerEl.current.style.right = `-${MARGIN_CORNER}px`;
				break;
			case 'top_center':
				cornerEl.current.style.top = `-${MARGIN_CORNER}px`;
				cornerEl.current.style.bottom = ``;
				cornerEl.current.style.left = `${50}%`;
				cornerEl.current.style.right = ``;
				break;
			case 'right_center':
				cornerEl.current.style.top = `${50}%`;
				cornerEl.current.style.bottom = ``;
				cornerEl.current.style.left = ``;
				cornerEl.current.style.right = `-${MARGIN_CORNER}px`;
				break;
			case 'bottom_center':
				cornerEl.current.style.top = '';
				cornerEl.current.style.bottom = `-${MARGIN_CORNER}px`;
				cornerEl.current.style.left = `${50}%`;
				cornerEl.current.style.right = ``;
				break;
			case 'left_center':
				cornerEl.current.style.top = `${50}%`;
				cornerEl.current.style.bottom = ``;
				cornerEl.current.style.left = `-${MARGIN_CORNER}px`;
				cornerEl.current.style.right = ``;
				break;
			default:
				break;
		}
	};

	const calcTopLeftCorner = (oldRect: Rect, delta: { x: number; y: number }): Rect => {
		return {
			x:
				oldRect.width - delta.x >= 0
					? oldRect.x + delta.x
					: oldRect.x + delta.x + (oldRect.width - delta.x),
			y:
				oldRect.height - delta.y >= 0
					? oldRect.y + delta.y
					: oldRect.y + delta.y + (oldRect.height - delta.y),
			width: oldRect.width - delta.x >= 0 ? oldRect.width - delta.x : 0,
			height: oldRect.height - delta.y >= 0 ? oldRect.height - delta.y : 0,
		};
	};

	const calcTopRightCorner = (oldRect: Rect, delta: { x: number; y: number }): Rect => {
		return {
			x: oldRect.x,
			y:
				oldRect.height - delta.y >= 0
					? oldRect.y + delta.y
					: oldRect.y + delta.y + oldRect.height - delta.y,
			width: oldRect.width + delta.x >= 0 ? oldRect.width + delta.x : 0,
			height: oldRect.height - delta.y >= 0 ? oldRect.height - delta.y : 0,
		};
	};

	const calcBottomLeftCorner = (oldRect: Rect, delta: { x: number; y: number }): Rect => {
		return {
			x:
				oldRect.width - delta.x >= 0
					? oldRect.x + delta.x
					: oldRect.x + delta.x + oldRect.width - delta.x,
			y: oldRect.y,
			width: oldRect.width - delta.x >= 0 ? oldRect.width - delta.x : 0,
			height: oldRect.height + delta.y >= 0 ? oldRect.height + delta.y : 0,
		};
	};

	const calcBottomRightCorner = (oldRect: Rect, delta: { x: number; y: number }): Rect => {
		return {
			x: oldRect.x,
			y: oldRect.y,
			width: oldRect.width + delta.x >= 0 ? oldRect.width + delta.x : 0,
			height: oldRect.height + delta.y >= 0 ? oldRect.height + delta.y : 0,
		};
	};

	const calcTopCenterCorner = (oldRect: Rect, delta: { x: number; y: number }): Rect => {
		return {
			x: oldRect.x,
			y:
				oldRect.height - delta.y >= 0
					? oldRect.y + delta.y
					: oldRect.y + delta.y + oldRect.height - delta.y,
			width: oldRect.width,
			height: oldRect.height - delta.y >= 0 ? oldRect.height - delta.y : 0,
		};
	};

	const calcRightCenterCorner = (oldRect: Rect, delta: { x: number; y: number }): Rect => {
		return {
			x: oldRect.x,
			y: oldRect.y,
			width: oldRect.width + delta.x >= 0 ? oldRect.width + delta.x : 0,
			height: oldRect.height,
		};
	};

	const calcBottomCenterCorner = (oldRect: Rect, delta: { x: number; y: number }): Rect => {
		return {
			x: oldRect.x,
			y: oldRect.y,
			width: oldRect.width,
			height: oldRect.height + delta.y >= 0 ? oldRect.height + delta.y : 0,
		};
	};

	const calcLeftCenterCorner = (oldRect: Rect, delta: { x: number; y: number }): Rect => {
		return {
			x:
				oldRect.width - delta.x >= 0
					? oldRect.x + delta.x
					: oldRect.x + delta.x + oldRect.width - delta.x,
			y: oldRect.y,
			width: oldRect.width - delta.x >= 0 ? oldRect.width - delta.x : 0,
			height: oldRect.height,
		};
	};

	const calcNewRect = (oldRect: Rect, delta: { x: number; y: number }, typeCorner: TCorner): Rect => {
		if (typeCorner == 'top_left') {
			return calcTopLeftCorner(oldRect, delta);
		}
		if (typeCorner == 'top_right') {
			return calcTopRightCorner(oldRect, delta);
		}
		if (typeCorner == 'bottom_left') {
			return calcBottomLeftCorner(oldRect, delta);
		}
		if (typeCorner == 'bottom_right') {
			return calcBottomRightCorner(oldRect, delta);
		}
		if (typeCorner == 'top_center') {
			return calcTopCenterCorner(oldRect, delta);
		}
		if (typeCorner == 'right_center') {
			return calcRightCenterCorner(oldRect, delta);
		}
		if (typeCorner == 'bottom_center') {
			return calcBottomCenterCorner(oldRect, delta);
		}
		if (typeCorner == 'left_center') {
			return calcLeftCenterCorner(oldRect, delta);
		}
		return oldRect;
	};

	const stableOnEnd = useCallback(
		(newX: number, newY: number) => {
			if (!updateRectOnEnd) return;
			console.log(rect);
			const updatedRect = calcNewRect(rect, { x: newX, y: newY }, typeCorner);
			console.log(updatedRect);
			updateRectOnEnd(idRect, updatedRect);
			setNewRect(updatedRect);
			setCoordsOfCorner({ x: 0, y: 0 });
		},
		[rect, typeCorner],
	);

	useDragAndDrop({
		rectEl: cornerEl,
		rectCoords: coordsOfCorner,
		setCoordsRect: setCoordsOfCorner,
		isSlide: false,
		isObjOnSlideBar: false,
		onEnd: stableOnEnd,
		typeCorner: typeCorner,
	});

	useLayoutEffect(() => {
		if (rectEl.current && cornerEl.current) {
			updateStyleCorner(cornerEl, typeCorner);
			rectEl.current.style.left = `${newRect.x}px`;
			rectEl.current.style.top = `${newRect.y}px`;
			rectEl.current.style.width = `${newRect.width}px`;
			rectEl.current.style.height = `${newRect.height}px`;
		}
	}, [newRect, setNewRect]);

	useEffect(() => {
		setNewRect(calcNewRect(rect, coordsOfCorner, typeCorner));
	}, [coordsOfCorner, rect, typeCorner]);
};
