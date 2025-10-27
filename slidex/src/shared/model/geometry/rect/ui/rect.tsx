import { ReactNode, useEffect, useRef, useState } from 'react';
import { Rect } from '../model/types';
import { Alignment } from '../../../alignment/Alignment';
import { Id } from '../../../id/Id';
import styles from './rect.module.css';
import { useDragAndDrop } from '../../../../lib/useDragAndDrop';
import { Corner } from '../../../../ui/Corner';

type RectProps = {
	rect: Rect;
	aligment?: Alignment;
	scaleY: number;
	scaleX: number;
	children: Array<ReactNode> | ReactNode;
	onClick?: (id: Id, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	id: Id;
	isSelected?: boolean;
	dispatchUpdateObject?: (x: number, y: number, width: number, height: number) => void;
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
	}, [rect, scaleX, scaleY, onClick]);

	let isObjOnSlideBar = false;
	if (onClick === undefined) {
		isObjOnSlideBar = true;
	}

	const onEnd = (newX: number, newY: number) => {
		if (!dispatchUpdateObject) return;
		dispatchUpdateObject(newX, newY, rect.width, rect.height);
	};

	useDragAndDrop({
		rectEl: rectEl,
		rectCoords: coords,
		setCoordsRect: setCoords,
		isSlide: false,
		isObjOnSlideBar: isObjOnSlideBar,
		onEnd: onEnd,
	});

	const styleRect = {
		position: 'absolute',
		transformOrigin: 'top center',
		top: coords.y,
		left: coords.x,
		width: rect.width,
		height: rect.height,
		textAlign: aligment ? aligment : '',
	} as React.CSSProperties;

	if (onClick === undefined) {
		styleRect.width = rect.width * scaleX;
		styleRect.height = rect.height * scaleY;
	}

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
			{isSelected ? (
				<>
					<Corner
						type="top_left"
						rect={{ ...rect, x: coords.x, y: coords.y }}
						rectEl={rectEl}
						updateDataRect={dispatchUpdateObject}
					/>
					<Corner
						type="top_right"
						rect={{ ...rect, x: coords.x, y: coords.y }}
						rectEl={rectEl}
						updateDataRect={dispatchUpdateObject}
					/>
					<Corner
						type="bottom_left"
						rect={{ ...rect, x: coords.x, y: coords.y }}
						rectEl={rectEl}
						updateDataRect={dispatchUpdateObject}
					/>
					<Corner
						type="bottom_right"
						rect={{ ...rect, x: coords.x, y: coords.y }}
						rectEl={rectEl}
						updateDataRect={dispatchUpdateObject}
					/>
				</>
			) : (
				<></>
			)}
			{children}
		</div>
	);
};
