export const openFullscreen = () => {
	const elem = document.documentElement;
	if (elem.requestFullscreen) {
		elem.requestFullscreen();
	}
};

export const exitFullscreen = () => {
	if (document.exitFullscreen) {
		document.exitFullscreen();
	}
};
