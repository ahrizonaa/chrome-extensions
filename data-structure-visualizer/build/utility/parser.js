import { UI } from '../ui.service';
class Parser {
    static isValid(val, msg, str) {
        let obj = Parser.deserialize(val);
        if (obj == null) {
            return 'Malformed JSON';
        }
        if (Array.isArray(obj) == false) {
            return 'Expected JSON array';
        }
        if (UI.userSelection.dsaType == 'graph' &&
            UI.userSelection.dsaFormat == 'adjacency_list') {
            for (let row of obj) {
                if (Array.isArray(row) == false) {
                    return 'Expected 2D array';
                }
            }
            let rowsize = UI.userOptions.graph.weighted ? 3 : 2;
            for (let row of obj) {
                if (row.length != rowsize) {
                    return `Expected N x ${rowsize} matrix`;
                }
            }
        }
        else if (UI.userSelection.dsaType == 'graph' &&
            UI.userSelection.dsaFormat == 'adjacency_matrix') {
            for (let row of obj) {
                if (Array.isArray(row) == false) {
                    return 'Expected 2D array';
                }
            }
            let rowsize = obj.length;
            for (let row of obj) {
                if (row.length != rowsize) {
                    return 'Expected N x N array';
                }
            }
        }
        return true;
    }
    static deserialize(str) {
        try {
            return JSON.parse(str);
        }
        catch (_a) {
            return null;
        }
    }
    static stripInput(input_dirty) {
        return input_dirty.replace(/[\n\t\s;]/g, '');
    }
}
export { Parser };
//# sourceMappingURL=parser.js.map