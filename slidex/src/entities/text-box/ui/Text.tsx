import { Text } from '../../../shared/model/textbox/types';

type TextProps = Text & {
	scaleX: number;
};

export const TextView = (props: TextProps) => {
	const { id, content, font, scaleX } = props;

	const styleFont = {
		fontFamily: font.fontFamily,
		fontSize: Math.floor(font.fontSize * scaleX).toString() + 'px',
		color: font.fontColor,
		fontWeight: font.isBold ? 'bold' : 'normal',
		fontStyle: font.isItalic ? 'italic' : 'normal',
		textDecoration: font.isUnderlined ? 'underline' : '',
	} as React.CSSProperties;

	//TODO: span read only
	//TODO: атрибут content editable
	//TODO: Selection

	return (
		<>
			<span key={id} style={styleFont}>
				{content}
			</span>
		</>
	);
};
