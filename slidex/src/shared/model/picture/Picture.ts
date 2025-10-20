type Picture = {
	src: string;
	file?: File;
};

function createPicture(src: string): Picture {
	return {
		src: src,
	};
}

export type { Picture };
export { createPicture };
