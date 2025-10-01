import React from 'react';
import ReactDOM from 'react-dom/client';
import { PresentationMaker } from '../pages/presentation-maker';
import { slideMaker } from '../entities/presentation/model/store/data';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<PresentationMaker pres={slideMaker} />
	</React.StrictMode>,
);
