import { RectView } from '../../../shared/types/geometry/rect/ui/rect';
import { Text, TextBox } from '../model/types';
import { TextView } from './text';

export const TextboxView = (props: TextBox) => {
	const { texts, rect, alignment } = props;

	const renderedTexts = texts.map((elem: Text) => (
		<TextView key={elem.id} content={elem.content} id={elem.id} font={elem.font} />
	));

	return (
		<RectView rect={rect} aligment={alignment}>
			{renderedTexts}
		</RectView>
	);
};
