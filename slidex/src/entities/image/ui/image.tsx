import { CSSProperties } from 'react';
import { RectView } from '../../../shared/types/geometry/rect/ui/rect';
import { Id } from '../../../shared/types/id/Id';
import { Image } from '../model/types';

type ImageProps = Image & {
	scaleX: number;
	scaleY: number;
	objId: Id;
};

export const ImageView = (props: ImageProps) => {
	const { rect, src, scaleX, scaleY, objId } = props;

	const styleForImage: CSSProperties = {
		width: '100%',
		height: '100%',
	};

	return (
		<RectView rect={rect} scaleX={scaleX} scaleY={scaleY} onClick={() => console.log(objId)}>
			<img src={src} alt="image" style={styleForImage} />
		</RectView>
	);
};
