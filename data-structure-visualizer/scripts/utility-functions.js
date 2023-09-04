import { InputTypes } from './constants.js';

const parse_input = (input_dirty, dstype, inputtype, InputOptions) => {
	let input_safe = sanitize_input(input_dirty);
	if (validate_input(input_safe)) {
		let obj = deserialize_input(input_safe);
		if (obj == null) {
			console.error('invalid input');
			return null;
		}
		if (dstype == 'graph') {
			if (Array.isArray(obj) == false) {
				console.error('Input data is not a 2D array');
				return null;
			}
			for (let row of obj) {
				if (Array.isArray(row) == false) {
					console.error('Input data is not a 2D array');
					return null;
				}
			}
			if (inputtype == 'adjacency_matrix') {
				let height = obj.length;
				for (let row of obj) {
					if (row.length != height) {
						console.error('matrix is not square');
						return null;
					}
				}
				return obj;
			}

			if (inputtype == 'adjacency_list') {
				let rowsize = InputOptions.graph.weighted ? 3 : 2;
				for (let row of obj) {
					if (row.length != rowsize) {
						console.error(`Adjacency list is not N x ${rowsize}`);
						return null;
					}
				}
				return obj;
			}
		}

		return obj;
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

// [[1,1,2],[2,2,3],[3,4,5]]
