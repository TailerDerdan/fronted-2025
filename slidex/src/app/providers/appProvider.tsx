import { ReactNode } from 'react';
import { StoreProvider } from './storeProvider';
import { PresProvider } from '../../features/presentation-editor/ui/presProvider';

type AppProviderProps = {
	children: Array<ReactNode> | ReactNode;
};

export const AppProvider = (props: AppProviderProps) => {
	const { children } = props;

	return (
		<StoreProvider>
			<PresProvider>{children}</PresProvider>
		</StoreProvider>
	);
};
