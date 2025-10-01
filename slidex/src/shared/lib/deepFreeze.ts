export function deepFreeze<T extends object>(o: T): T {
	Object.freeze(o);

	Object.getOwnPropertyNames(o).forEach(function (prop) {
		if (
			Object.prototype.hasOwnProperty.call(o, prop) &&
			o[prop as keyof T] !== null &&
			(typeof o[prop as keyof T] === 'object' || typeof o[prop as keyof T] === 'function') &&
			!Object.isFrozen(o[prop as keyof T])
		) {
			deepFreeze(o[prop as keyof T] as object);
		}
	});

	return o;
}
