import { Color } from '../../../shared/model/color/Color';
import { Rect } from '../../../shared/model/geometry/rect/model/types';
import { Picture } from '../../../shared/model/picture/Picture';

export type Image = Picture & {
	type: 'image';
	rect: Rect;
	borderColor: Color;
};
