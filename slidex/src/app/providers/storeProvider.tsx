import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../entities/presentation/model/store';

type PropsStoreProvider = {
	children: Array<ReactNode> | ReactNode;
};

export const StoreProvider = (props: PropsStoreProvider) => {
	const { children } = props;
	return <Provider store={store}>{children}</Provider>;
};
