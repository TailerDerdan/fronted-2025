import { RootState } from '../../entities/presentation/model/rootState';
import { account } from './appwrite';
import db from './database';

export const autoSave = async (state: RootState) => {
	try {
		await db['presenation'].create(
			{
				title: state.presentation.name,
				content: JSON.stringify(state.slides),
				user_id: (await account.get()).$id,
			},
			state.presentation.id,
		);
	} catch (error) {
		console.error('autoSave', error);
	}
};

export const DEBOUNCE_DELAY = 5 * 1000;
