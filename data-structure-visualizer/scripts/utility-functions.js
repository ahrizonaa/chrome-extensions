const parse_input = (input_dirty) => {
	let input_safe = sanitize_input(input_dirty);
	if (validate_input(input_safe)) {
		let obj = deserialize_input(input_safe);
		if (obj == null) {
			console.log('invalid input');
			return null;
		} else {
			return obj;
		}
	}
};

const validate_input = (input) => {
	if (input == '') return false;
	return true;
};

const sanitize_input = (input_dirty) => {
	return input_dirty.replace(/[\n\t\s;]/g, '');
};

const deserialize_input = (input) => {
	let result = null;
	try {
		result = JSON.parse(input);
		return result;
	} catch (ex) {
		return null;
	}
};

const Parser = {
	parse_input: parse_input,
	validate_input: validate_input,
	sanitize_input: sanitize_input,
	deserialize_input: deserialize_input
};

export { Parser };
