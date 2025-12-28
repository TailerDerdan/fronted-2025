import { ID } from 'appwrite';
import { storage } from './appwrite';

type PayloadForStorage = {
	file: File;
};

const bucketId = import.meta.env.VITE_STORAGE_ID;

export const createFile = (payload: PayloadForStorage) => {
	return storage.createFile({
		bucketId: bucketId,
		fileId: ID.unique(),
		file: payload.file,
	});
};

export const getFileURL = (id: string) => {
	return storage.getFileView({
		bucketId: bucketId,
		fileId: id,
	});
};

export const deleteFile = (id: string) => {
	return storage.deleteFile({
		bucketId: bucketId,
		fileId: id,
	});
};
