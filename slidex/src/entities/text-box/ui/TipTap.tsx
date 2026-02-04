import { useEditor, EditorContent } from '@tiptap/react';
import { FloatingMenu, BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';

type PropsTipTap = {
	updateText: (newText: string) => void;
	textView: string;
	scaleX: number;
};

const Tiptap = (props: PropsTipTap) => {
	const { updateText, textView, scaleX } = props;

	const editor = useEditor({
		onUpdate: ({ editor }) => {
			updateText(editor.getHTML());
		},
		extensions: [StarterKit],
		content: textView,
		immediatelyRender: false,
	});

	useEffect(() => {
		if (editor && textView) {
			editor.commands.setContent(textView);
			setTimeout(() => {
				editor.commands.focus('end');
			}, 100);
		}
	}, [editor, textView]);

	return (
		<div style={{ fontSize: `${24 * scaleX}px` }}>
			<EditorContent editor={editor} />
			{/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
			<BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
		</div>
	);
};

export default Tiptap;
