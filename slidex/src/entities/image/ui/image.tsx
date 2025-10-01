import { RectView } from '../../../shared/types/geometry/rect/ui/rect';
import { Image } from '../model/types';

export const ImageView = (props: Image) => {
	const { src, rect } = props;

	return (
		<RectView rect={rect}>
			<img src={src} alt="image" />
		</RectView>
	);
};
