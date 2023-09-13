import { UI } from '../ui.service';

class Parser {
	static isValid(val, msg, str) {
		let obj: any = Parser.deserialize(val);
		if (obj == null) {
			return 'Malformed input data.  Must be valid array.';
		}
		if (Array.isArray(obj) == false) {
			return 'Input must be an array.';
		}

		if (
			UI.userSelection.dsaType == 'graph' &&
			UI.userSelection.dsaFormat == 'adjacency_list'
		) {
			for (let row of obj) {
				if (Array.isArray(row) == false) {
					return 'Input is not a 2D array';
				}
			}
			let rowsize = UI.userOptions.graph.weighted ? 3 : 2;
			for (let row of obj) {
				if (row.length != rowsize) {
					return `Input is not N x ${rowsize}`;
				}
			}
		} else if (
			UI.userSelection.dsaType == 'graph' &&
			UI.userSelection.dsaFormat == 'adjacency_matrix'
		) {
			for (let row of obj) {
				if (Array.isArray(row) == false) {
					return 'Input is not a 2D array';
				}
			}
			let rowsize = obj.length;
			for (let row of obj) {
				if (row.length != rowsize) {
					return 'Input is not a square matrix';
				}
			}
		}
		return true;
	}

	static deserialize(str): any {
		try {
			return JSON.parse(str);
		} catch {
			return null;
		}
	}

	static stripInput(input_dirty: string): string {
		return input_dirty.replace(/[\n\t\s;]/g, '');
	}
}

export { Parser };
