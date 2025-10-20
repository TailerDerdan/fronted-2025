import { ReactNode } from 'react';
import { Rect } from '../model/types';
import { Alignment } from '../../../alignment/Alignment';
import { Id } from '../../../id/Id';
import styles from './rect.module.css';

type RectProps = {
	rect: Rect;
	aligment?: Alignment;
	scaleY: number;
	scaleX: number;
	children: Array<ReactNode> | ReactNode;
	onClick?: (id: Id, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	id: Id;
	isSelected?: boolean;
};

export const RectView = (props: RectProps) => {
	const { rect, children, aligment, scaleX, scaleY, onClick, id, isSelected } = props;

	const styleRect = {
		top: rect.y * scaleY,
		left: rect.x * scaleX,
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
		>
			{children}
		</div>
	);
};
