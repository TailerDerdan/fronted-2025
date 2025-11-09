import { MutableRefObject, useRef } from 'react';
import { useResize } from '../lib/useResize';
import styles from './corner.module.css';
import { TCorner } from '../model/corner/corner';
import { Rect } from '../model/geometry/rect/model/types';
import { Id } from '../model/id/Id';

type PropsCorner = {
	idRect: Id;
	type: TCorner;
	rect: Rect;
	rectEl: MutableRefObject<HTMLDivElement | null>;
	updateDataRect?: (idObj: Id, newRect: Rect) => void;
};

export const MARGIN_CORNER = 10;

export const Corner = (props: PropsCorner) => {
	const { type, rectEl, rect, updateDataRect, idRect } = props;
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

	useResize({
		rectEl: rectEl,
		typeCorner: type,
		cornerEl: cornerRef,
		rect: rect,
		updateRectOnEnd: updateDataRect,
		idRect: idRect,
	});

	return <div className={style} ref={cornerRef} />;
};
