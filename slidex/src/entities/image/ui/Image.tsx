import { CSSProperties, MutableRefObject } from 'react';
import { RectView } from '../../../shared/model/geometry/rect/ui/rect';
import { Image } from '../model/types';
import { Id } from '../../../shared/model/id/Id';
import { Rect } from '../../../shared/model/geometry/rect/model/types';
import { InfoAboutRect } from '../../../shared/model/setterOfCoords/setterOfCoords';

type ImageProps = Image & {
	scaleX: number;
	scaleY: number;
	onClick?: (id: Id, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	id: Id;
	isSelected?: boolean;
	handleUpdateRect?: (idObj: Id, newRect: Rect) => void;
	arrOfInfoObj?: MutableRefObject<Array<InfoAboutRect>>;
};

export const ImageView = (props: ImageProps) => {
	const { rect, src, scaleX, scaleY, onClick, id, isSelected, handleUpdateRect, arrOfInfoObj } = props;

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
			dispatchUpdateObject={handleUpdateRect}
			arrOfInfoObj={arrOfInfoObj}
		>
			<img src={src} alt="image" style={styleForImage} />
		</RectView>
	);
};
