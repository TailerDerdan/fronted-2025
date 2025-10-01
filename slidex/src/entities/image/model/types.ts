import { Rect } from '../../../shared/types/geometry/rect/model/types';
import { Picture } from '../../../shared/types/picture/Picture';

export type Image = Picture & {
	type: 'image';
	rect: Rect;
};
