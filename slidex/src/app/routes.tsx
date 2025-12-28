import { ReactNode } from 'react';
import { Login } from '../pages/login/ui/Login';
import { ListPresentations } from '../pages/listPres/ui/ListPresentations';
import { PresentationMaker } from '../pages/presentation-maker';
import { ViewPres } from '../pages/viewPres/ui/ViewPres';

export const mapRoutes: Map<string, ReactNode> = new Map([
	['/', <Login key={'login'} />],
	['/list/', <ListPresentations key={'listPresentations'} />],
	['/list/:id', <PresentationMaker key={'presenatation'} />],
	['/list/:id/view', <ViewPres key={'viewPresenatation'} />],
]);
