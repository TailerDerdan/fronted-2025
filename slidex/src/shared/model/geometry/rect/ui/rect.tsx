import { ReactNode, useEffect, useRef, useState } from 'react';
import { Rect } from '../model/types';
import { Alignment } from '../../../alignment/Alignment';
import { Id } from '../../../id/Id';
import styles from './rect.module.css';
import { useDragAndDrop } from '../../../../lib/useDragAndDrop';

type RectProps = {
	rect: Rect;
	aligment?: Alignment;
	scaleY: number;
	scaleX: number;
	children: Array<ReactNode> | ReactNode;
	onClick?: (id: Id, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	id: Id;
	isSelected?: boolean;
	dispatchUpdateObject: (x: number, y: number) => void;
};

export const RectView = (props: RectProps) => {
	const { rect, children, aligment, scaleX, scaleY, onClick, id, isSelected, dispatchUpdateObject } = props;
	const rectEl = useRef(null);
	const [coords, setCoords] = useState({ x: rect.x, y: rect.y });

	useEffect(() => {
		if (onClick === undefined) {
			setCoords({ x: rect.x * scaleX, y: rect.y * scaleY });
		} else {
			setCoords({ x: rect.x, y: rect.y });
		}
	}, [rect, scaleX, scaleY]);

	useDragAndDrop({
		rectEl: rectEl,
		rectCoords: coords,
		setCoordsRect: setCoords,
		updateCoordsRect: dispatchUpdateObject,
	});

	const styleRect = {
		top: coords.y,
		left: coords.x,
		width: rect.width * scaleX,
		height: rect.height * scaleY,
		textAlign: aligment ? aligment : '',
		position: 'absolute',
	} as React.CSSProperties;

	const styleForSelected = isSelected ? styles.obj_selected : ``;

	return (
		<div
			style={styleRect}
			className={styleForSelected}
			onClick={event => {
				event.preventDefault();
				event.stopPropagation();

				if (onClick) {
					onClick(id, event);
				}
			}}
			ref={rectEl}
			draggable={false}
		>
			{children}
		</div>
	);
};
