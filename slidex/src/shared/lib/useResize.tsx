import { MutableRefObject, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { OnEndArgs, useDragAndDrop } from './useDragAndDrop';
import { Rect } from '../model/geometry/rect/model/types';
import { TCorner } from '../model/corner/corner';
import { MARGIN_CORNER } from '../ui/Corner';
import { Id } from '../model/id/Id';
import { snapToLines } from '../model/geometry/auxLines/AuxLines';
import { AuxLine } from '../model/geometry/auxLines/model/auxLine';

type PropsResize = {
	idRect: Id;
	rectEl: MutableRefObject<HTMLDivElement | null>;
	cornerEl: MutableRefObject<HTMLDivElement | null>;
	typeCorner: TCorner;
	rect: Rect;
	setIsMoving: (state: boolean) => void;
	setIsResizing: (state: boolean) => void;
	updateRectOnEnd?: (idObj: Id, newRect: Rect) => void;
	onChangeRect?: (newRect: Rect) => void;
	auxLines?: AuxLine[];
};

export const useResize = (props: PropsResize) => {
	const {
		idRect,
		rectEl,
		typeCorner,
		cornerEl,
		rect,
		updateRectOnEnd,
		setIsMoving,
		setIsResizing,
		onChangeRect,
		auxLines,
	} = props;
	const [coordsOfCorner, setCoordsOfCorner] = useState({ x: 0, y: 0 });
	const [newRect, setNewRect] = useState({ ...rect });

	useEffect(() => {
		if (coordsOfCorner.x === 0 && coordsOfCorner.y === 0) {
			const rectChanged =
				rect.x !== newRect.x ||
				rect.y !== newRect.y ||
				rect.width !== newRect.width ||
				rect.height !== newRect.height;

			if (rectChanged) {
				setNewRect({ ...rect });
			}
		}
	}, [rect, coordsOfCorner.x, coordsOfCorner.y, newRect]);

	const isInitialMount = useRef(true);

	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
			return;
		}

		if (coordsOfCorner.x !== 0 || coordsOfCorner.y !== 0) {
			setIsResizing(true);
		} else {
			setTimeout(() => setIsResizing(false), 0);
		}
	}, [coordsOfCorner]);

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
		(args: OnEndArgs) => {
			if ('newPos' in args) return;
			if (!updateRectOnEnd) return;
			const { x, y } = args;

			const updatedRect = calcNewRect(rect, { x: x, y: y }, typeCorner);
			const snappedRect = snapToLines(updatedRect, auxLines);

			updateRectOnEnd(idRect, snappedRect);
			setNewRect(snappedRect);
			setCoordsOfCorner({ x: 0, y: 0 });
			setIsResizing(false);
		},
		[rect, typeCorner, updateRectOnEnd, idRect],
	);

	useDragAndDrop({
		rectEl: cornerEl,
		rectCoords: coordsOfCorner,
		setCoordsRect: setCoordsOfCorner,
		isSlide: false,
		isObjOnSlideBar: false,
		onEnd: stableOnEnd,
		typeCorner: typeCorner,
		setIsMoving: setIsMoving,
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

	const baseRectRef = useRef(rect);
	useEffect(() => {
		if (coordsOfCorner.x === 0 && coordsOfCorner.y === 0) {
			baseRectRef.current = rect;
		}
	}, [rect, coordsOfCorner.x, coordsOfCorner.y]);

	useEffect(() => {
		if (coordsOfCorner.x == 0 && coordsOfCorner.y == 0) return;

		const calculatedRect = calcNewRect(baseRectRef.current, coordsOfCorner, typeCorner);
		const snappedRect = snapToLines(calculatedRect, auxLines);
		setNewRect(snappedRect);
		if (onChangeRect) {
			onChangeRect(snappedRect);
		}
	}, [coordsOfCorner, typeCorner, onChangeRect]);
};
