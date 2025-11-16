import React from 'react';
import ReactDOM from 'react-dom/client';
import { PresentationMaker } from '../pages/presentation-maker';
import { AppProvider } from './providers/appProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<AppProvider>
		<PresentationMaker />
	</AppProvider>,
);
