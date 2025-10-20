import { RectView } from '../../../shared/model/geometry/rect/ui/rect';
import { Id } from '../../../shared/model/id/Id';
import { Text, TextBox } from '../model/types';
import { TextView } from './text';

type TextboxProps = TextBox & {
	scaleX: number;
	scaleY: number;
	onClick?: (id: Id, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	id: Id;
	isSelected?: boolean;
};

export const TextboxView = (props: TextboxProps) => {
	const { texts, rect, alignment, scaleX, scaleY, onClick, id, isSelected } = props;

	const renderedTexts = texts.map((elem: Text) => (
		<TextView key={elem.id} content={elem.content} id={elem.id} font={elem.font} scaleX={scaleX} />
	));

	return (
		<RectView
			rect={rect}
			aligment={alignment}
			scaleX={scaleX}
			scaleY={scaleY}
			onClick={onClick}
			id={id}
			isSelected={isSelected}
		>
			{renderedTexts}
		</RectView>
	);
};
