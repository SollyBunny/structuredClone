/**
 * Creates a deep copy of the provided source object using structured cloning.
 * 
 * @param {*} source - The object to be cloned.
 * @param {Object} [options] - An optional object specifying cloning options.
 * @param {Array} [options.transfer] - An array of transferable objects that will be moved rather than cloned to the returned object.
 * @returns {*} - A deep copy of the source object.
 * @see [MDN Web Docs: structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone)
 * @note The source and return value must not contain functions or DOM elements.
 * @note This implementation has limitations:
 * - It lacks error checking and type enforcement.
 * - Does not support cloning of ArrayBuffers.
 */
function structuredClonePolyfill(source, options) {
	options = options || {};
	options.transfer = options.transfer || [];
	let value = source;
	if (Array.isArray(source)) {
		if (options.transfer.indexOf(source) === -1) {
			options.transfer.push(source);
			value = [...source];
			for (let i = 0; i < value.length; ++i)
				value[i] = structuredClone(value[name]);
		}
	} else if (source === null) {
		value = null;
	} else if (typeof source === "object" && source.__proto__ === Object.prototype) {
		if (options.transfer.indexOf(source) === -1) {
			options.transfer.push(source);
			value = Object.assign({}, source);
			for (const name in value)
				value[name] = structuredClone(value[name]);
		}
	}
	return value;
}
if (!this.structuredClone) {
	this.structuredClone = structuredClonePolyfill;
}
