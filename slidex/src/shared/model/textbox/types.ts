import { Font } from '../../../shared/model/font/Font';
import { Id } from '../../../shared/model/id/Id';
import { Alignment } from '../../../shared/model/alignment/Alignment';
import { Rect } from '../../../shared/model/geometry/rect/model/types';

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
