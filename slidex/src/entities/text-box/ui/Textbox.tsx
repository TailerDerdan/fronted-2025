import { MutableRefObject, useContext, useEffect, useRef, useState } from 'react';
import { Rect } from '../../../shared/model/geometry/rect/model/types';
import { RectView } from '../../../shared/model/geometry/rect/ui/rect';
import { Id } from '../../../shared/model/id/Id';
import { InfoAboutRect } from '../../../shared/model/setterOfCoords/setterOfCoords';
import { TextBox } from '../../../shared/model/textbox/types';
import Tiptap from './TipTap';
import { PresActionContext } from '../../../shared/lib/presentationContext';

type TextboxProps = TextBox & {
	scaleX: number;
	scaleY: number;
	onClick?: (id: Id, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	id: Id;
	isSelected?: boolean;
	handleUpdateRect?: (idObj: Id, newRect: Rect) => void;
	arrOfInfoObj?: MutableRefObject<Array<InfoAboutRect>>;
	allRects?: Record<Id, Rect>;
	movingRects?: Record<Id, Rect>;
};

export const TextboxView = (props: TextboxProps) => {
	const {
		rect,
		scaleX,
		scaleY,
		onClick,
		id,
		isSelected,
		handleUpdateRect,
		arrOfInfoObj,
		allRects,
		movingRects,
		text,
	} = props;
	const refOnRichText = useRef<HTMLDivElement>(null);
	const [stateEditing, setStateEditing] = useState(false);
	const actions = useContext(PresActionContext);

	const handleDoubleClick = () => {
		setStateEditing(true);
		if (refOnRichText.current) {
			refOnRichText.current.focus();
		}
	};

	const handleOnBlur = () => {
		setStateEditing(false);
		if (refOnRichText.current) {
			refOnRichText.current.blur();
		}
	};

	const handleUpdate = (newContent: string) => {
		actions?.updateTextBox(id, { type: 'textbox', rect: rect, text: newContent });
	};

	return (
		<RectView
			rect={rect}
			scaleX={scaleX}
			scaleY={scaleY}
			onClick={onClick}
			id={id}
			isSelected={isSelected}
			dispatchUpdateObject={handleUpdateRect}
			stateEditing={stateEditing}
			handleDoubleClick={handleDoubleClick}
			handleOnBlur={handleOnBlur}
			arrOfInfoObj={arrOfInfoObj}
			allRects={allRects}
			movingRects={movingRects}
		>
			<Tiptap updateText={handleUpdate} textView={text} scaleX={scaleX} />
		</RectView>
	);
};
