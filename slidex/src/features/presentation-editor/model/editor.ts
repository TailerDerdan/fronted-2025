import { UpdateImageProps, UpdateTextBoxProps } from '../../../entities/presentation/lib/presentation';
import { slideMaker } from '../../../entities/presentation/model/store/data';
import { Presentation } from '../../../entities/presentation/model/types';
import { SlideObj } from '../../../entities/slide/model/types';
import { Background } from '../../../shared/model/background/Background';

export let editor: Presentation = slideMaker;
export let editorHandleChange: () => void;

type PayloadObjectFn = (presentation: Presentation, payload: object) => Presentation;
type PayloadSlideObjectFn = (presentation: Presentation, payload: SlideObj) => Presentation;
type PayloadUpdImageObjectFn = (presentation: Presentation, payload: UpdateImageProps) => Presentation;
type PayloadUpdTextBoxObjectFn = (presentation: Presentation, payload: UpdateTextBoxProps) => Presentation;
type PayloadBackgroundObjectFn = (presentation: Presentation, payload: Background) => Presentation;
type PayloadNumberFn = (presentation: Presentation, payload: number) => Presentation;
type PayloadStringFn = (presentation: Presentation, payload: string) => Presentation;

type ModifyFn =
	| PayloadObjectFn
	| PayloadNumberFn
	| PayloadStringFn
	| PayloadSlideObjectFn
	| PayloadUpdImageObjectFn
	| PayloadUpdTextBoxObjectFn
	| PayloadBackgroundObjectFn;

export function getEditor() {
	return editor;
}

function setEditor(newEditor: Presentation) {
	editor = newEditor;
}

export function addEditorChangeHandler(handler: () => void) {
	editorHandleChange = handler;
}

export function dispatch(modifyFn: ModifyFn, payload?: object | number | string) {
	const newEditor = modifyFn(editor, payload as never);
	setEditor(newEditor);
	if (editorHandleChange) {
		editorHandleChange();
	}
}
