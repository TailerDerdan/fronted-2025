import React from 'react';
import ReactDOM from 'react-dom/client';
import { PresentationMaker } from '../pages/presentation-maker';
import { addEditorChangeHandler, getEditor } from '../features/presentation-editor/model/editor';
import { handleDelete } from '../features/presentation-editor/lib/handleDelete';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
function render() {
	root.render(
		//<React.StrictMode>
		<PresentationMaker pres={getEditor()} />,
		//</React.StrictMode>,
	);
}
addEditorChangeHandler(render);
render();
window.addEventListener('keydown', handleDelete);
