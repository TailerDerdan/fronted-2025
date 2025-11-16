import { ReactNode } from 'react';
import { PresActionContext } from '../../../shared/lib/presentationContext';
import { usePresentationActions } from '../model/presentationAction';

type PropsPresProvider = {
	children: Array<ReactNode> | ReactNode;
};

export const PresProvider = (props: PropsPresProvider) => {
	const { children } = props;
	const action = usePresentationActions();

	return <PresActionContext.Provider value={action}>{children}</PresActionContext.Provider>;
};
