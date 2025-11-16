import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Rect } from '../../../shared/model/geometry/rect/model/types';
import { RectView } from '../../../shared/model/geometry/rect/ui/rect';
import { Id } from '../../../shared/model/id/Id';
import { InfoAboutRect } from '../../../shared/model/setterOfCoords/setterOfCoords';
import { TextBox } from '../../../shared/model/textbox/types';
// import { TextView } from './Text';

type TextboxProps = TextBox & {
	scaleX: number;
	scaleY: number;
	onClick?: (id: Id, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
	id: Id;
	isSelected?: boolean;
	handleUpdateRect?: (idObj: Id, newRect: Rect) => void;
	arrOfInfoObj?: MutableRefObject<Array<InfoAboutRect>>;
};

export const TextboxView = (props: TextboxProps) => {
	const { rect, alignment, scaleX, scaleY, onClick, id, isSelected, handleUpdateRect, arrOfInfoObj } =
		props;
	const refOnRichText = useRef<HTMLDivElement>(null);
	const [stateEditing, setStateEditing] = useState(false);

	// console.log(texts);

	// const renderedTexts = texts.map((elem: Text) => (
	// 	<TextView key={elem.id} content={elem.content} id={elem.id} font={elem.font} scaleX={scaleX} />
	// ));

	useEffect(() => {
		if (refOnRichText.current) {
			// console.log(refOnRichText.current.children);
			// console.log(refOnRichText.current);
		}
	});

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

	return (
		<RectView
			rect={rect}
			aligment={alignment}
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
		>
			<div contentEditable="true" ref={refOnRichText}></div>
		</RectView>
	);
};
