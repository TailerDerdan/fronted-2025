import { Rect } from '../rect/model/types';
import { AuxLine } from './model/auxLine';
import styles from './auxLines.module.css';

type PropsForGettingAuxLine = {
	movingObjects: Rect[];
	allObjects: Rect[];
};

export const AuxLines = (props: PropsForGettingAuxLine) => {
	const auxLines: AuxLine[] = getAuxLines(props);

	return auxLines.map((line, index) => (
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

const getAuxLines = (props: PropsForGettingAuxLine) => {
	const { movingObjects, allObjects } = props;
	console.log(movingObjects[0]);

	const auxLines: AuxLine[] = [];

	const DIF_AUX_LINES = 5;

	allObjects.forEach((obj: Rect) => {
		movingObjects.forEach((movObj: Rect) => {
			if (movObj.y >= obj.y) {
				const topAuxLinesOfMovObj = getAuxLinesOfSide(movObj, 'top');
				const bottomAuxLinesOfObj = getAuxLinesOfSide(obj, 'bottom');

				topAuxLinesOfMovObj.forEach((lineMovObj: AuxLine) => {
					bottomAuxLinesOfObj.forEach((lineObj: AuxLine) => {
						// console.log(lineMovObj.y - lineObj.y);
						if (Math.abs(lineMovObj.y - lineObj.y) <= DIF_AUX_LINES) {
							auxLines.push(lineObj);
						}
					});
				});
			}
		});
	});

	return auxLines;
};

const getAuxLinesOfSide = (rect: Rect, side: 'top' | 'right' | 'bottom' | 'left') => {
	const auxLines: AuxLine[] = [];
	switch (side) {
		case 'top': {
			const left: AuxLine = { x: rect.x, y: rect.y, type: 'vertical' };
			const center: AuxLine = { x: rect.x + rect.width / 2, y: rect.y, type: 'vertical' };
			const right: AuxLine = { x: rect.x + rect.width, y: rect.y, type: 'vertical' };
			auxLines.push(left, center, right);
			return auxLines;
		}
		case 'right': {
			const left: AuxLine = { x: rect.x + rect.width, y: rect.y, type: 'horizontal' };
			const center: AuxLine = {
				x: rect.x + rect.width,
				y: rect.y + rect.height / 2,
				type: 'horizontal',
			};
			const right: AuxLine = {
				x: rect.x + rect.width,
				y: rect.y + rect.height,
				type: 'horizontal',
			};
			auxLines.push(left, center, right);
			return auxLines;
		}
		case 'bottom': {
			const left: AuxLine = { x: rect.x, y: rect.y + rect.height, type: 'vertical' };
			const center: AuxLine = { x: rect.x + rect.width / 2, y: rect.y + rect.height, type: 'vertical' };
			const right: AuxLine = { x: rect.x + rect.width, y: rect.y + rect.height, type: 'vertical' };
			auxLines.push(left, center, right);
			return auxLines;
		}
		case 'left': {
			const left: AuxLine = { x: rect.x, y: rect.y, type: 'horizontal' };
			const center: AuxLine = { x: rect.x, y: rect.y + rect.height / 2, type: 'horizontal' };
			const right: AuxLine = { x: rect.x, y: rect.y + rect.height, type: 'horizontal' };
			auxLines.push(left, center, right);
			return auxLines;
		}

		default:
			return auxLines;
	}
};
