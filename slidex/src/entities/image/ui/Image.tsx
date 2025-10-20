import { CSSProperties } from 'react';
import { RectView } from '../../../shared/model/geometry/rect/ui/rect';
import { Image } from '../model/types';
import { Id } from '../../../shared/model/id/Id';
import { Rect } from '../../../shared/model/geometry/rect/model/types';

type ImageProps = Image & {
	scaleX: number;
	scaleY: number;
	onClick?: (id: Id, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	id: Id;
	isSelected?: boolean;
	handleUpdateRect?: (idObj: Id, newRect: Rect) => void;
};

export const ImageView = (props: ImageProps) => {
	const { rect, src, scaleX, scaleY, onClick, id, isSelected, handleUpdateRect } = props;

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
			dispatchUpdateObject={(newX: number, newY: number) => {
				if (handleUpdateRect) {
					handleUpdateRect(id, { ...rect, x: newX, y: newY });
				}
			}}
		>
			<img src={src} alt="image" style={styleForImage} />
		</RectView>
	);
};
