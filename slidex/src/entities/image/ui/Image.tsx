import { CSSProperties } from 'react';
import { RectView } from '../../../shared/model/geometry/rect/ui/rect';
import { Image } from '../model/types';
import { Id } from '../../../shared/model/id/Id';

type ImageProps = Image & {
	scaleX: number;
	scaleY: number;
	onClick?: (id: Id, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	id: Id;
	isSelected?: boolean;
};

export const ImageView = (props: ImageProps) => {
	const { rect, src, scaleX, scaleY, onClick, id, isSelected } = props;

	const styleForImage: CSSProperties = {
		width: '100%',
		height: '100%',
	};

	return (
		<RectView
			rect={rect}
			scaleX={scaleX}
			scaleY={scaleY}
			onClick={onClick}
			id={id}
			isSelected={isSelected}
		>
			<img src={src} alt="image" style={styleForImage} />
		</RectView>
	);
};
