import { Font } from '../../../shared/types/font/Font';
import { Id } from '../../../shared/types/id/Id';
import { Alignment } from '../../../shared/types/alignment/Alignment';
import { Rect } from '../../../shared/types/geometry/rect/model/types';

type Text = {
	id: Id;
	content: string;
	font: Font;
};

type TextBox = {
	type: 'textbox';
	rect: Rect;
	texts: Array<Text>;
	alignment: Alignment;
};

export type { Text, TextBox };
