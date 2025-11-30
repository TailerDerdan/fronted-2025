export type Color = string;

function hexToRgb(hex: string): { r: number; g: number; b: number } {
	let normalizedHex = hex.replace('#', '');
	if (normalizedHex.length === 3) {
		normalizedHex = normalizedHex
			.split('')
			.map(c => c + c)
			.join('');
	}
	return {
		r: parseInt(normalizedHex.substring(0, 2), 16),
		g: parseInt(normalizedHex.substring(2, 4), 16),
		b: parseInt(normalizedHex.substring(4, 6), 16),
	};
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
	r /= 255;
	g /= 255;
	b /= 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h = 0,
		s = 0;
	const l = (max + min) / 2;

	if (max !== min) {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}
	return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
	s /= 100;
	l /= 100;
	const c = (1 - Math.abs(2 * l - 1)) * s;
	const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
	const m = l - c / 2;
	let r = 0,
		g = 0,
		b = 0;

	if (0 <= h && h < 60) [r, g, b] = [c, x, 0];
	else if (60 <= h && h < 120) [r, g, b] = [x, c, 0];
	else if (120 <= h && h < 180) [r, g, b] = [0, c, x];
	else if (180 <= h && h < 240) [r, g, b] = [0, x, c];
	else if (240 <= h && h < 300) [r, g, b] = [x, 0, c];
	else [r, g, b] = [c, 0, x];

	return {
		r: Math.round((r + m) * 255),
		g: Math.round((g + m) * 255),
		b: Math.round((b + m) * 255),
	};
}

function rgbToHex(r: number, g: number, b: number): string {
	return (
		'#' +
		[r, g, b]
			.map(x => Math.max(0, Math.min(255, x)))
			.map(x => x.toString(16).padStart(2, '0'))
			.join('')
	);
}

export function getNextDarkerColor(hex: string, step: number = 5): string {
	const { r, g, b } = hexToRgb(hex);
	const { h, s, l } = rgbToHsl(r, g, b);
	const newL = Math.max(0, l - step);
	const { r: newR, g: newG, b: newB } = hslToRgb(h, s, newL);
	return rgbToHex(newR, newG, newB);
}
