type Rect = {
	x: number;
	y: number;
	width: number;
	height: number;
};

function createRect(x: number, y: number, width: number, height: number): Rect {
	return {
		x: x,
		y: y,
		width: width,
		height: height,
	};
}

function setXRect(rect: Rect, x: number): Rect {
	return {
		...rect,
		x: x,
	};
}

function setYRect(rect: Rect, y: number): Rect {
	return {
		...rect,
		y: y,
	};
}

function setWidthRect(rect: Rect, width: number): Rect {
	return {
		...rect,
		width: width,
	};
}

function setHeightRect(rect: Rect, height: number): Rect {
	return {
		...rect,
		height: height,
	};
}

export type { Rect };

export { createRect, setXRect, setYRect, setWidthRect, setHeightRect };
