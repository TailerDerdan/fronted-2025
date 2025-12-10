export function debounce(func: (...args: any[]) => void, ms: number): (...args: any[]) => void {
	let timeout: NodeJS.Timeout | null = null;

	return function (this: any, ...args: any[]): void {
		const later = () => {
			clearTimeout(timeout!);
			func.apply(this, args);
		};

		clearTimeout(timeout!);
		timeout = setTimeout(later, ms);
	};
}
