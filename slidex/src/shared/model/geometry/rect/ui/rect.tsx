import { MutableRefObject, ReactNode, useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { Rect } from '../model/types';
import { Alignment } from '../../../alignment/Alignment';
import { Id } from '../../../id/Id';
import styles from './rect.module.css';
import { OnEndArgs, useDragAndDrop } from '../../../../lib/useDragAndDrop';
import { InfoAboutRect } from '../../../setterOfCoords/setterOfCoords';
import { Corner } from '../../../../ui/Corner';
import { AuxLines } from '../../auxLines/AuxLines';

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
	allRects?: Record<Id, Rect>;
	movingRects?: Record<Id, Rect>;
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
		allRects,
		movingRects,
	} = props;

	const [isMoving, setIsMoving] = useState(false);

	const rectEl = useRef(null);
	const [coords, setCoords] = useState({ x: rect.x, y: rect.y });

	const [currentRect, setCurrentRect] = useState(rect);

	const [isResizing, setIsResizing] = useState(false);

	const lastExternalRect = useRef(rect);
	useEffect(() => {
		if (
			rect.x !== lastExternalRect.current.x ||
			rect.y !== lastExternalRect.current.y ||
			rect.width !== lastExternalRect.current.width ||
			rect.height !== lastExternalRect.current.height
		) {
			setCurrentRect(rect);
			lastExternalRect.current = rect;
		}
	}, [rect]);

	// useEffect(() => {
	// 	if (!isMoving && !isResizing) {
	// 		setCurrentRect(rect);
	// 	}
	// }, [rect.x, rect.y, rect.width, rect.height, isMoving, isResizing]);

	const handleResizeChange = useCallback(
		(newRect: Rect) => {
			setCurrentRect(newRect);
		},
		[setCurrentRect],
	);

	const stableSetCoords = useCallback((newCoords: { x: number; y: number }) => {
		setCoords(newCoords);
	}, []);

	const stableOnEnd = useCallback(
		(args: OnEndArgs) => {
			if ('newPos' in args) return;
			const { x, y } = args;
			if (!dispatchUpdateObject) return;

			if (isNaN(x) || isNaN(y) || !rect || !rect.width || !rect.height) {
				console.error('invalid:', x, y);
				return;
			}

			dispatchUpdateObject(id, {
				x: x,
				y: y,
				width: currentRect.width,
				height: currentRect.height,
			});
		},
		[dispatchUpdateObject, id, currentRect],
	);

	useEffect(() => {
		if (onClick === undefined) {
			setCoords({ x: currentRect.x * scaleX, y: currentRect.y * scaleY });
		} else {
			setCoords({ x: currentRect.x, y: currentRect.y });
		}
	}, [currentRect, scaleX, scaleY, onClick]);

	useEffect(() => {
		if (!arrOfInfoObj || !rectEl) return;

		const index = arrOfInfoObj.current.findIndex(elem => elem.refObj.current === rectEl.current);

		if (!isSelected) {
			if (index !== -1) {
				arrOfInfoObj.current.splice(index, 1);
			}
			return;
		}

		const size = { width: currentRect.width, height: currentRect.height };

		const infoAboutRect: InfoAboutRect = {
			refObj: rectEl,
			coordsObj: coords,
			size,
			setCoordsObj: stableSetCoords,
			id,
			onEnd: stableOnEnd,
		};

		if (index === -1) {
			arrOfInfoObj.current.push(infoAboutRect);
		} else {
			arrOfInfoObj.current[index] = infoAboutRect;
		}
	}, [
		isSelected,
		coords.x,
		coords.y,
		currentRect.width,
		currentRect.height,
		stableSetCoords,
		stableOnEnd,
		arrOfInfoObj,
	]);

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
		setIsMoving: setIsMoving,
	});

	const styleRect = {
		position: 'absolute',
		transformOrigin: 'top center',
		top: coords.y,
		left: coords.x,
		width: currentRect.width,
		height: currentRect.height,
		textAlign: aligment ? aligment : '',
	} as React.CSSProperties;

	if (onClick === undefined) {
		styleRect.width = currentRect.width * scaleX;
		styleRect.height = currentRect.height * scaleY;
	}

	const styleForSelected = isSelected ? styles.obj_selected : ``;

	const getAllObjectsArray = () => {
		if (!allRects) return [];

		const allObjectsArray = Object.entries(allRects).map(([objId, objRect]) => {
			if ((isMoving || isResizing) && objId === id) {
				return {
					...objRect,
					x: coords.x,
					y: coords.y,
					width: currentRect.width,
					height: currentRect.height,
				};
			}
			return objRect;
		});

		return allObjectsArray;
	};

	const getMovingObjectsArray = () => {
		if (!movingRects) return [];

		const movingObjectsArray = Object.entries(movingRects).map(([objId, objRect]) => {
			if (objId === id) {
				return {
					...objRect,
					x: coords.x,
					y: coords.y,
					width: currentRect.width,
					height: currentRect.height,
				};
			}
			return objRect;
		});

		return movingObjectsArray;
	};

	return (
		<>
			{isMoving || isResizing ? (
				<AuxLines allObjects={getAllObjectsArray()} movingObjects={getMovingObjectsArray()} />
			) : (
				<></>
			)}
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
							rect={{ ...currentRect, x: coords.x, y: coords.y }}
							rectEl={rectEl}
							updateDataRect={dispatchUpdateObject}
							idRect={id}
							setIsMoving={setIsMoving}
							setIsResizing={setIsResizing}
							onChangeRect={handleResizeChange}
						/>
						<Corner
							type="top_center"
							rect={{ ...currentRect, x: coords.x, y: coords.y }}
							rectEl={rectEl}
							updateDataRect={dispatchUpdateObject}
							idRect={id}
							setIsMoving={setIsMoving}
							setIsResizing={setIsResizing}
							onChangeRect={handleResizeChange}
						/>
						<Corner
							type="top_right"
							rect={{ ...currentRect, x: coords.x, y: coords.y }}
							rectEl={rectEl}
							updateDataRect={dispatchUpdateObject}
							idRect={id}
							setIsMoving={setIsMoving}
							setIsResizing={setIsResizing}
							onChangeRect={handleResizeChange}
						/>
						<Corner
							type="right_center"
							rect={{ ...currentRect, x: coords.x, y: coords.y }}
							rectEl={rectEl}
							updateDataRect={dispatchUpdateObject}
							idRect={id}
							setIsMoving={setIsMoving}
							setIsResizing={setIsResizing}
							onChangeRect={handleResizeChange}
						/>
						<Corner
							type="bottom_left"
							rect={{ ...currentRect, x: coords.x, y: coords.y }}
							rectEl={rectEl}
							updateDataRect={dispatchUpdateObject}
							idRect={id}
							setIsMoving={setIsMoving}
							setIsResizing={setIsResizing}
							onChangeRect={handleResizeChange}
						/>
						<Corner
							type="bottom_center"
							rect={{ ...currentRect, x: coords.x, y: coords.y }}
							rectEl={rectEl}
							updateDataRect={dispatchUpdateObject}
							idRect={id}
							setIsMoving={setIsMoving}
							setIsResizing={setIsResizing}
							onChangeRect={handleResizeChange}
						/>
						<Corner
							type="bottom_right"
							rect={{ ...currentRect, x: coords.x, y: coords.y }}
							rectEl={rectEl}
							updateDataRect={dispatchUpdateObject}
							idRect={id}
							setIsMoving={setIsMoving}
							setIsResizing={setIsResizing}
							onChangeRect={handleResizeChange}
						/>
						<Corner
							type="left_center"
							rect={{ ...currentRect, x: coords.x, y: coords.y }}
							rectEl={rectEl}
							updateDataRect={dispatchUpdateObject}
							idRect={id}
							setIsMoving={setIsMoving}
							setIsResizing={setIsResizing}
							onChangeRect={handleResizeChange}
						/>
					</>
				) : (
					<></>
				)}
				{children}
			</div>
		</>
	);
};
