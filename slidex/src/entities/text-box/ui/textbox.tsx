import { RectView } from '../../../shared/types/geometry/rect/ui/rect';
import { Id } from '../../../shared/types/id/Id';
import { Text, TextBox } from '../model/types';
import { TextView } from './text';

type TextboxProps = TextBox & {
	scaleX: number;
	scaleY: number;
	objId: Id;
};

export const TextboxView = (props: TextboxProps) => {
	const { texts, rect, alignment, scaleX, scaleY, objId } = props;

	const renderedTexts = texts.map((elem: Text) => (
		<TextView key={elem.id} content={elem.content} id={elem.id} font={elem.font} scaleX={scaleX} />
	));

	return (
		<RectView
			rect={rect}
			aligment={alignment}
			scaleX={scaleX}
			scaleY={scaleY}
			onClick={() => console.log(objId)}
		>
			{renderedTexts}
		</RectView>
	);
};
