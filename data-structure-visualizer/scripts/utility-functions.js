import { InputTypes } from './constants.js';

const parse_input = (input_dirty, dstype, inputtype, InputOptions) => {
	let input_safe = sanitize_input(input_dirty);
	if (validate_input(input_safe)) {
		let obj = deserialize_input(input_safe);

		let msg = '';
		let invalid = document.querySelector(
			'.dataset-container .invalid-feedback'
		);
		let textarea = document.querySelector('textarea#dataset-textarea');

		if (obj == null) {
			msg = 'Malformed input data';
		} else {
			if (dstype == 'graph') {
				if (Array.isArray(obj) == false) {
					msg = 'Input data is not a 2D array';
				}
				for (let row of obj) {
					if (Array.isArray(row) == false) {
						msg = 'Input data is not a 2D array';
						break;
					}
				}
				if (inputtype == 'adjacency_matrix') {
					let height = obj.length;
					for (let row of obj) {
						if (row.length != height) {
							msg = 'Matrix is not square';
							break;
						}
					}
					return obj;
				}

				if (inputtype == 'adjacency_list') {
					let rowsize = InputOptions.graph.weighted ? 3 : 2;
					for (let row of obj) {
						if (row.length != rowsize) {
							msg = `Adjacency list is not N x ${rowsize}`;
							break;
						}
					}
				}
			}
		}

		if (msg) {
			invalid.innerText = msg;
			textarea.classList.toggle('is-invalid', true);
			textarea.classList.toggle('is-valid', false);
			return null;
		} else {
			invalid.innerText = '';
			textarea.classList.toggle('is-invalid', false);
			textarea.classList.toggle('is-valid', true);
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

// [[1,1,2],[2,2,3],[3,4,5]]
