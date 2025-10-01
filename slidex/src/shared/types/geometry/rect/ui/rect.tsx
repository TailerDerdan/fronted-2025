import { ReactNode } from 'react';
import { Rect } from '../model/types';
import { Alignment } from '../../../alignment/Alignment';

type RectProps = {
	rect: Rect;
	aligment?: Alignment;
	children: Array<ReactNode> | ReactNode;
};

export const RectView = (props: RectProps) => {
	const { rect, children, aligment } = props;

	const styleRect = {
		top: rect.x,
		left: rect.y,
		width: rect.width,
		height: rect.height,
		textAlign: aligment ? aligment : '',
	} as React.CSSProperties;

	return <div style={styleRect}>{children}</div>;
};
