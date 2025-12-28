import { Route, Routes } from 'react-router-dom';
import { UserProvider } from '../shared/appwrite/user';
import { mapRoutes } from './routes';

export const AppRoutes = () => {
	return (
		<UserProvider>
			<Routes>
				{Array.from(mapRoutes.entries()).map(([path, element]) => (
					<Route key={path} path={path} element={element} />
				))}
			</Routes>
		</UserProvider>
	);
};
