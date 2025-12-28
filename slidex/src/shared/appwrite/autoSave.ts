import { RootState } from '../../entities/presentation/model/rootState';
import { account } from './appwrite';
import db from './database';

export let saveTimeout: NodeJS.Timeout | null = null;

export const setupSaveTimeout = () => {
	saveTimeout = null;
};

const save = async (state: RootState) => {
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

export const autoSave = async (state: RootState) => {
	if (saveTimeout) {
		clearTimeout(saveTimeout);
	}

	saveTimeout = setTimeout(() => {
		save(state);
	}, DEBOUNCE_DELAY);
};

export const DEBOUNCE_DELAY = 5 * 1000;
