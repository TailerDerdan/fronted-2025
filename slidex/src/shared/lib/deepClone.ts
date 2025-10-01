export function deepClone<T>(source: T): T {
	if (source === null || typeof source !== 'object') {
		return source;
	}

	if (source instanceof Map) {
		const result = new Map();
		source.forEach((value, key) => {
			result.set(deepClone(key), deepClone(value));
		});

		return result as T;
	}

	if (Array.isArray(source)) {
		return source.map(item => deepClone(item)) as T;
	}

	if (typeof source === 'object') {
		const result: Record<string, unknown> = {};
		for (const key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				result[key] = deepClone(source[key]);
			}
		}
		return result as T;
	}

	return source;
}
