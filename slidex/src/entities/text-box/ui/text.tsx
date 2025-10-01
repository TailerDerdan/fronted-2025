import { Text } from '../model/types';

export const TextView = (props: Text) => {
	const { id, content, font } = props;

	const styleFont = {
		fontFamily: font.fontFamily,
		fontSize: font.fontSize,
		color: font.fontColor,
		fontWeight: font.isBold ? 'bold' : 'normal',
		fontStyle: font.isItalic ? 'italic' : 'normal',
		textDecoration: font.isUnderlined ? 'underline' : '',
	} as React.CSSProperties;

	return (
		<>
			<span key={id} style={styleFont}>
				{content}
			</span>
		</>
	);
};
