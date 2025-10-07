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
		width: `calc(100% * ${scaleX})`,
		height: `calc(100% * ${scaleY})`,
	};

	return (
		<RectView rect={rect} scaleX={scaleX} scaleY={scaleY} onClick={() => console.log(objId)}>
			<img src={src} alt="image" style={styleForImage} />
		</RectView>
	);
};
