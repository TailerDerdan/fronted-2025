import { Route, Routes } from 'react-router-dom';
import { Login } from '../pages/presentation-maker/ui/Login';
import { PresentationMaker } from '../pages/presentation-maker';
import { UserProvider } from '../shared/appwrite/user';
import { ListPresentations } from '../pages/presentation-maker/ui/ListPresentations';

export const AppRoutes = () => {
	return (
		<UserProvider>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/list" element={<ListPresentations />} />
				<Route path="/list/:id" element={<PresentationMaker />} />
			</Routes>
		</UserProvider>
	);
};
