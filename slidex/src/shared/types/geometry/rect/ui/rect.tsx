import { ReactNode } from 'react';
import { Rect } from '../model/types';
import { Alignment } from '../../../alignment/Alignment';

type RectProps = {
	rect: Rect;
	aligment?: Alignment;
	scaleY: number;
	scaleX: number;
	children: Array<ReactNode> | ReactNode;
	onClick?: () => void;
};

export const RectView = (props: RectProps) => {
	const { rect, children, aligment, scaleX, scaleY, onClick } = props;

	const styleRect = {
		top: rect.x * scaleX,
		left: rect.y * scaleY,
		width: rect.width * 1,
		height: rect.height * 1,
		textAlign: aligment ? aligment : '',
		position: 'absolute',
	} as React.CSSProperties;

	return (
		<div style={styleRect} onClick={onClick}>
			{children}
		</div>
	);
};
