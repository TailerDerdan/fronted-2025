import { database } from './appwrite';

type PayloadForPresentation = {
	title: string;
	content: string;
	user_id: string;
};

type ColFuncs = {
	create: (payload: PayloadForPresentation, $id: string) => Promise<any>;
	delete: (id: string) => Promise<any>;
	list: () => Promise<any>;
	get: (id: string) => Promise<any>;
};

const db: { [key: string]: ColFuncs } = {};

const collections = [
	{
		dbId: import.meta.env.VITE_DATABASE_ID,
		id: import.meta.env.VITE_COLLECTION_ID_PRESENTATION,
		name: 'presenation',
	},
];

collections.forEach(col => {
	db[col.name] = {
		create: (payload: PayloadForPresentation, $id: string) => {
			console.log(col, payload, $id);
			return database.upsertRow({
				databaseId: col.dbId,
				tableId: col.id,
				rowId: $id,
				data: payload,
			});
		},

		delete: (id: string) => database.deleteRow({ databaseId: col.dbId, tableId: col.id, rowId: id }),

		list: () => database.listRows({ databaseId: col.dbId, tableId: col.id }),

		get: (id: string) => database.getRow({ databaseId: col.dbId, tableId: col.id, rowId: id }),
	};
});

export default db;
