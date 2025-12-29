type Picture = {
	src: string;
	id: string;
};

function createPicture(src: string, id: string): Picture {
	return {
		src: src,
		id: id,
	};
}

export type { Picture };
export { createPicture };
