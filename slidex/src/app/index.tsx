import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './providers/appProvider';
import { AppRoutes } from './AppRoute';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<AppProvider>
		<BrowserRouter>
			<AppRoutes />
		</BrowserRouter>
	</AppProvider>,
);
