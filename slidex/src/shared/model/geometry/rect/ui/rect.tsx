import { MutableRefObject, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Rect } from '../model/types';
import { Alignment } from '../../../alignment/Alignment';
import { Id } from '../../../id/Id';
import styles from './rect.module.css';
import { useDragAndDrop } from '../../../../lib/useDragAndDrop';
import { InfoAboutRect } from '../../../setterOfCoords/setterOfCoords';
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
	dispatchUpdateObject?: (idObj: Id, newRect: Rect) => void;
	stateEditing?: boolean;
	handleDoubleClick?: () => void;
	handleOnBlur?: () => void;
	arrOfInfoObj?: MutableRefObject<Array<InfoAboutRect>>;
};

export const RectView = (props: RectProps) => {
	const {
		rect,
		children,
		aligment,
		scaleX,
		scaleY,
		onClick,
		id,
		isSelected,
		dispatchUpdateObject,
		stateEditing,
		handleDoubleClick,
		handleOnBlur,
		arrOfInfoObj,
	} = props;
	const rectEl = useRef(null);
	const [coords, setCoords] = useState({ x: rect.x, y: rect.y });
	const rectRef = useRef({ ...rect });

	console.log(rect, isSelected);

	useEffect(() => {
		rectRef.current = rect;
	}, [rect]);

	const stableSetCoords = useCallback((newCoords: { x: number; y: number }) => {
		setCoords(newCoords);
	}, []);

	const stableOnEnd = useCallback(
		(newX: number, newY: number) => {
			if (!dispatchUpdateObject) return;

			if (isNaN(newX) || isNaN(newY) || !rect || !rect.width || !rect.height) {
				console.error('invalid:', newX, newY);
				return;
			}

			dispatchUpdateObject(id, {
				x: newX,
				y: newY,
				width: rectRef.current.width,
				height: rectRef.current.height,
			});
		},
		[dispatchUpdateObject, id],
	);

	useEffect(() => {
		if (!arrOfInfoObj) return;
		const index = arrOfInfoObj.current.findIndex(elem => elem.refObj.current === rectEl.current);
		if (index != -1) {
			arrOfInfoObj.current[index].coordsObj = coords;
		}
	}, [coords]);

	useEffect(() => {
		if (onClick === undefined) {
			setCoords({ x: rectRef.current.x * scaleX, y: rectRef.current.y * scaleY });
		} else {
			setCoords({ x: rectRef.current.x, y: rectRef.current.y });
		}
	}, [rect, scaleX, scaleY, onClick]);

	useEffect(() => {
		if (!arrOfInfoObj || !rectEl) return;
		if (!isSelected) {
			const index = arrOfInfoObj.current.findIndex(elem => elem.refObj.current === rectEl.current);
			if (index != -1) {
				arrOfInfoObj.current.splice(index, 1);
			}
		} else {
			const existingIndex = arrOfInfoObj.current.findIndex(
				elem => elem.refObj.current === rectEl.current,
			);
			const infoAboutRect: InfoAboutRect = {
				refObj: rectEl,
				coordsObj: coords,
				setCoordsObj: stableSetCoords,
				id: id,
				onEnd: stableOnEnd,
			};
			if (existingIndex === -1) {
				arrOfInfoObj.current.push(infoAboutRect);
			} else {
				arrOfInfoObj.current[existingIndex] = infoAboutRect;
			}
		}
	}, [isSelected]);

	let isObjOnSlideBar = false;
	if (onClick === undefined) {
		isObjOnSlideBar = true;
	}

	useDragAndDrop({
		rectEl: rectEl,
		rectCoords: coords,
		setCoordsRect: setCoords,
		isSlide: false,
		isObjOnSlideBar: isObjOnSlideBar,
		onEnd: stableOnEnd,
		stateEditing: stateEditing,
		arrOfInfoObj: arrOfInfoObj,
	});

	const styleRect = {
		position: 'absolute',
		transformOrigin: 'top center',
		top: coords.y,
		left: coords.x,
		width: rectRef.current.width,
		height: rectRef.current.height,
		textAlign: aligment ? aligment : '',
	} as React.CSSProperties;

	if (onClick === undefined) {
		styleRect.width = rectRef.current.width * scaleX;
		styleRect.height = rectRef.current.height * scaleY;
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
			onDoubleClick={handleDoubleClick}
			onBlur={handleOnBlur}
		>
			{isSelected ? (
				<>
					<Corner
						type="top_left"
						rect={{ ...rectRef.current, x: coords.x, y: coords.y }}
						rectEl={rectEl}
						updateDataRect={dispatchUpdateObject}
						idRect={id}
					/>
					<Corner
						type="top_center"
						rect={{ ...rectRef.current, x: coords.x, y: coords.y }}
						rectEl={rectEl}
						updateDataRect={dispatchUpdateObject}
						idRect={id}
					/>
					<Corner
						type="top_right"
						rect={{ ...rectRef.current, x: coords.x, y: coords.y }}
						rectEl={rectEl}
						updateDataRect={dispatchUpdateObject}
						idRect={id}
					/>
					<Corner
						type="right_center"
						rect={{ ...rectRef.current, x: coords.x, y: coords.y }}
						rectEl={rectEl}
						updateDataRect={dispatchUpdateObject}
						idRect={id}
					/>
					<Corner
						type="bottom_left"
						rect={{ ...rectRef.current, x: coords.x, y: coords.y }}
						rectEl={rectEl}
						updateDataRect={dispatchUpdateObject}
						idRect={id}
					/>
					<Corner
						type="bottom_center"
						rect={{ ...rectRef.current, x: coords.x, y: coords.y }}
						rectEl={rectEl}
						updateDataRect={dispatchUpdateObject}
						idRect={id}
					/>
					<Corner
						type="bottom_right"
						rect={{ ...rectRef.current, x: coords.x, y: coords.y }}
						rectEl={rectEl}
						updateDataRect={dispatchUpdateObject}
						idRect={id}
					/>
					<Corner
						type="left_center"
						rect={{ ...rectRef.current, x: coords.x, y: coords.y }}
						rectEl={rectEl}
						updateDataRect={dispatchUpdateObject}
						idRect={id}
					/>
				</>
			) : (
				<></>
			)}
			{children}
		</div>
	);
};
