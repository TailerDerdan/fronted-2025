import { Rect } from '../rect/model/types';
import { AuxLine } from './model/auxLine';
import styles from './auxLines.module.css';
import { Id } from '../../id/Id';

type PropsForGettingAuxLine = {
	movingObjects: Record<Id, Rect>;
	allObjects: Record<Id, Rect>;
};

type PropsAuxLine = {
	auxLines: AuxLine[];
};

export const AuxLines = (props: PropsAuxLine) => {
	return props.auxLines.map((line, index) => (
		<div
			key={`${line.type}-${line.x}-${line.y}-${index}`}
			className={`${styles.aux_line} ${styles[line.type]}`}
			style={
				line.type === 'vertical'
					? { left: `${line.x}px`, top: 0, width: '3px', height: '100%' }
					: { top: `${line.y}px`, left: 0, height: '3px', width: '100%' }
			}
		/>
	));
};

const DIF_AUX_LINES = 5;

export const getAuxLines = (props: PropsForGettingAuxLine): AuxLine[] => {
	const { movingObjects, allObjects } = props;
	const auxLines: AuxLine[] = [];

	const movingIds = new Set(Object.keys(movingObjects));

	for (const [objId, obj] of Object.entries(allObjects)) {
		if (movingIds.has(objId)) continue;

		for (const [movId, movObj] of Object.entries(movingObjects)) {
			let linesMov = getAuxLinesOfSide(movObj, obj, 'top');
			let linesObj = getAuxLinesOfSide(obj, movObj, 'bottom');
			compareAndPush(linesMov, linesObj, auxLines);

			linesMov = getAuxLinesOfSide(movObj, obj, 'bottom');
			linesObj = getAuxLinesOfSide(obj, movObj, 'top');
			compareAndPush(linesMov, linesObj, auxLines);

			linesMov = getAuxLinesOfSide(movObj, obj, 'left');
			linesObj = getAuxLinesOfSide(obj, movObj, 'right');
			compareAndPush(linesMov, linesObj, auxLines);

			linesMov = getAuxLinesOfSide(movObj, obj, 'right');
			linesObj = getAuxLinesOfSide(obj, movObj, 'left');
			compareAndPush(linesMov, linesObj, auxLines);
		}
	}

	return auxLines.filter(
		(line, index, self) =>
			self.findIndex(
				l => l.type === line.type && (l.type === 'vertical' ? l.x === line.x : l.y === line.y),
			) === index,
	);
};

function compareAndPush(linesMov: AuxLine[], linesObj: AuxLine[], auxLines: AuxLine[]) {
	for (const lineMov of linesMov) {
		for (const lineObj of linesObj) {
			if (
				(lineMov.type === 'vertical' && Math.abs(lineMov.x - lineObj.x) <= DIF_AUX_LINES) ||
				(lineMov.type === 'horizontal' && Math.abs(lineMov.y - lineObj.y) <= DIF_AUX_LINES)
			) {
				auxLines.push(lineObj);
			}
		}
	}
}

const getAuxLinesOfSide = (rect: Rect, anotherRect: Rect, side: 'top' | 'right' | 'bottom' | 'left') => {
	const auxLines: AuxLine[] = [];
	switch (side) {
		case 'top': {
			const left: AuxLine = {
				x: rect.x,
				y: rect.y,
				type: 'vertical',
				place: 'left',
				widthRect: anotherRect.width,
				heightRect: anotherRect.height,
			};
			const center: AuxLine = {
				x: rect.x + rect.width / 2,
				y: rect.y,
				type: 'vertical',
				place: 'center',
				widthRect: anotherRect.width,
				heightRect: anotherRect.height,
			};
			const right: AuxLine = {
				x: rect.x + rect.width,
				y: rect.y,
				type: 'vertical',
				place: 'right',
				widthRect: anotherRect.width,
				heightRect: anotherRect.height,
			};
			auxLines.push(left, center, right);
			return auxLines;
		}
		case 'right': {
			const left: AuxLine = {
				x: rect.x + rect.width,
				y: rect.y,
				type: 'horizontal',
				place: 'left',
				widthRect: anotherRect.width,
				heightRect: anotherRect.height,
			};
			const center: AuxLine = {
				x: rect.x + rect.width,
				y: rect.y + rect.height / 2,
				type: 'horizontal',
				place: 'center',
				widthRect: anotherRect.width,
				heightRect: anotherRect.height,
			};
			const right: AuxLine = {
				x: rect.x + rect.width,
				y: rect.y + rect.height,
				type: 'horizontal',
				place: 'right',
				widthRect: anotherRect.width,
				heightRect: anotherRect.height,
			};
			auxLines.push(left, center, right);
			return auxLines;
		}
		case 'bottom': {
			const left: AuxLine = {
				x: rect.x,
				y: rect.y + rect.height,
				type: 'vertical',
				place: 'left',
				widthRect: anotherRect.width,
				heightRect: anotherRect.height,
			};
			const center: AuxLine = {
				x: rect.x + rect.width / 2,
				y: rect.y + rect.height,
				type: 'vertical',
				place: 'center',
				widthRect: anotherRect.width,
				heightRect: anotherRect.height,
			};
			const right: AuxLine = {
				x: rect.x + rect.width,
				y: rect.y + rect.height,
				type: 'vertical',
				place: 'right',
				widthRect: anotherRect.width,
				heightRect: anotherRect.height,
			};
			auxLines.push(left, center, right);
			return auxLines;
		}
		case 'left': {
			const left: AuxLine = {
				x: rect.x,
				y: rect.y,
				type: 'horizontal',
				place: 'left',
				widthRect: anotherRect.width,
				heightRect: anotherRect.height,
			};
			const center: AuxLine = {
				x: rect.x,
				y: rect.y + rect.height / 2,
				type: 'horizontal',
				place: 'center',
				widthRect: anotherRect.width,
				heightRect: anotherRect.height,
			};
			const right: AuxLine = {
				x: rect.x,
				y: rect.y + rect.height,
				type: 'horizontal',
				place: 'right',
				widthRect: anotherRect.width,
				heightRect: anotherRect.height,
			};
			auxLines.push(left, center, right);
			return auxLines;
		}

		default:
			return auxLines;
	}
};

const AUX_THRESHOLD = 10;

export const snapToLines = (rect: Rect, lines: AuxLine[] | undefined): Rect => {
	if (!lines || lines.length === 0) {
		return rect;
	}

	const origLeft = rect.x;
	const origTop = rect.y;

	let finalX = rect.x;
	let finalY = rect.y;
	let finalWidth = rect.width;
	let finalHeight = rect.height;

	let minDistX = AUX_THRESHOLD;
	let minDistY = AUX_THRESHOLD;
	let minDistWidth = AUX_THRESHOLD;
	let minDistHeight = AUX_THRESHOLD;

	for (const line of lines) {
		if (line.type === 'vertical' && line.x !== undefined) {
			let dist: number = 0;
			let snappedX: number = 0;

			if (line.place === 'left') {
				dist = Math.abs(origLeft - line.x);
				snappedX = line.x;
				if (dist < minDistX) {
					minDistX = dist;
					finalX = snappedX;
				} else {
					dist = Math.abs(origLeft + line.widthRect / 2 - line.x);
					snappedX = line.x - line.widthRect / 2;
					if (dist < minDistX) {
						minDistX = dist;
						finalX = snappedX;
					} else {
						dist = Math.abs(origLeft + line.widthRect - line.x);
						snappedX = line.x - line.widthRect;
						if (dist < minDistX) {
							minDistX = dist;
							finalX = snappedX;
						}
					}
				}
			} else if (line.place === 'center') {
				dist = Math.abs(origLeft - line.x);
				snappedX = line.x;
				if (dist < minDistX) {
					minDistX = dist;
					finalX = snappedX;
				} else {
					dist = Math.abs(origLeft + line.widthRect / 2 - line.x);
					snappedX = line.x - line.widthRect / 2;
					if (dist < minDistX) {
						minDistX = dist;
						finalX = snappedX;
					} else {
						dist = Math.abs(origLeft + line.widthRect - line.x);
						snappedX = line.x - line.widthRect;
						if (dist < minDistX) {
							minDistX = dist;
							finalX = snappedX;
						}
					}
				}
			} else if (line.place === 'right') {
				dist = Math.abs(origLeft - line.x);
				snappedX = line.x;
				if (dist < minDistX) {
					minDistX = dist;
					finalX = snappedX;
				} else {
					dist = Math.abs(origLeft + line.widthRect / 2 - line.x);
					snappedX = line.x - line.widthRect / 2;
					if (dist < minDistX) {
						minDistX = dist;
						finalX = snappedX;
					} else {
						dist = Math.abs(origLeft + line.widthRect - line.x);
						snappedX = line.x - line.widthRect;
						if (dist < minDistX) {
							minDistX = dist;
							finalX = snappedX;
						}
					}
				}
			}

			let widthSnapDist: number = 0;
			let snappedWidth: number = 0;

			widthSnapDist = Math.abs(rect.width - line.x);
			snappedWidth = line.x;
			if (widthSnapDist < minDistWidth) {
				minDistWidth = widthSnapDist;
				finalWidth = snappedWidth;
			} else {
				widthSnapDist = Math.abs(rect.width / 2 - line.x);
				snappedWidth = line.x * 2;
				if (widthSnapDist < minDistWidth) {
					minDistWidth = widthSnapDist;
					finalWidth = snappedWidth;
				} else {
					widthSnapDist = Math.abs(rect.x + rect.width - line.x);
					snappedWidth = line.x - rect.x;
					if (widthSnapDist < minDistWidth) {
						minDistWidth = widthSnapDist;
						finalWidth = snappedWidth;
					}
				}
			}
		}
		if (line.type === 'horizontal' && line.y !== undefined) {
			let dist: number = 0;
			let snappedY: number = 0;

			if (line.place === 'left') {
				dist = Math.abs(origTop - line.y);
				snappedY = line.y;
				if (dist < minDistY) {
					minDistY = dist;
					finalY = snappedY;
				} else {
					dist = Math.abs(origTop + line.heightRect / 2 - line.y);
					snappedY = line.y - line.heightRect / 2;
					if (dist < minDistY) {
						minDistY = dist;
						finalY = snappedY;
					} else {
						dist = Math.abs(origTop + line.heightRect - line.y);
						snappedY = line.y - line.heightRect;
						if (dist < minDistY) {
							minDistY = dist;
							finalY = snappedY;
						}
					}
				}
			} else if (line.place === 'center') {
				dist = Math.abs(origTop - line.y);
				snappedY = line.y;
				if (dist < minDistY) {
					minDistY = dist;
					finalY = snappedY;
				} else {
					dist = Math.abs(origTop + line.heightRect / 2 - line.y);
					snappedY = line.y - line.heightRect / 2;
					if (dist < minDistY) {
						minDistY = dist;
						finalY = snappedY;
					} else {
						dist = Math.abs(origTop + line.heightRect - line.y);
						snappedY = line.y - line.heightRect;
						if (dist < minDistY) {
							minDistY = dist;
							finalY = snappedY;
						}
					}
				}
			} else if (line.place === 'right') {
				dist = Math.abs(origTop - line.y);
				snappedY = line.y;
				if (dist < minDistY) {
					minDistY = dist;
					finalY = snappedY;
				} else {
					dist = Math.abs(origTop + line.heightRect / 2 - line.y);
					snappedY = line.y - line.heightRect / 2;
					if (dist < minDistY) {
						minDistY = dist;
						finalY = snappedY;
					} else {
						dist = Math.abs(origTop + line.heightRect - line.y);
						snappedY = line.y - line.heightRect;
						if (dist < minDistY) {
							minDistY = dist;
							finalY = snappedY;
						}
					}
				}
			}

			let heightSnapDist: number = 0;
			let snappedHeight: number = 0;

			heightSnapDist = Math.abs(rect.height - line.y);
			snappedHeight = line.y;
			if (heightSnapDist < minDistHeight) {
				minDistHeight = heightSnapDist;
				finalHeight = snappedHeight;
			} else {
				heightSnapDist = Math.abs(rect.height / 2 - line.y);
				snappedHeight = line.y * 2;
				if (heightSnapDist < minDistHeight) {
					minDistHeight = heightSnapDist;
					finalHeight = snappedHeight;
				} else {
					heightSnapDist = Math.abs(rect.y + rect.height - line.y);
					snappedHeight = line.y - rect.y;
					if (heightSnapDist < minDistHeight) {
						minDistHeight = heightSnapDist;
						finalHeight = snappedHeight;
					}
				}
			}
		}
	}

	return {
		x: finalX,
		y: finalY,
		width: finalWidth,
		height: finalHeight,
	};
};
