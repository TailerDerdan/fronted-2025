import { MutableRefObject, useRef } from 'react';
import { useResize } from '../lib/useResize';
import styles from './corner.module.css';
import { TCorner } from '../model/corner/corner';
import { Rect } from '../model/geometry/rect/model/types';

type PropsCorner = {
	type: TCorner;
	rect: Rect;
	rectEl: MutableRefObject<HTMLDivElement | null>;
	updateDataRect?: (x: number, y: number, width: number, height: number) => void;
};

export const MARGIN_CORNER = 10;

export const Corner = (props: PropsCorner) => {
	const { type, rectEl, rect, updateDataRect } = props;
	const cornerRef = useRef(null);

	let style: string = '';

	switch (type) {
		case 'top_left':
			style = styles.cornerTopLeft;
			break;
		case 'top_right':
			style = styles.cornerTopRight;
			break;
		case 'bottom_left':
			style = styles.cornerBottomLeft;
			break;
		case 'bottom_right':
			style = styles.cornerBottomRight;
			break;
		case 'top_center':
			style = styles.cornerTopCenter;
			break;
		case 'right_center':
			style = styles.cornerRightCenter;
			break;
		case 'bottom_center':
			style = styles.cornerBottomCenter;
			break;
		case 'left_center':
			style = styles.cornerLeftCenter;
			break;
		default:
			break;
	}

	const onEnd = (newRect: Rect) => {
		if (!updateDataRect) return;
		updateDataRect(newRect.x, newRect.y, newRect.width, newRect.height);
	};

	useResize({
		rectEl: rectEl,
		typeCorner: type,
		cornerEl: cornerRef,
		rect: rect,
		updateRectOnEnd: onEnd,
	});

	return <div className={style} ref={cornerRef} />;
};
