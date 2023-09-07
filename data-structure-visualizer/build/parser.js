import { UI } from './userinput.service';
class Parser {
    static parse_input(input_dirty) {
        let input_safe = this.sanitize_input(input_dirty);
        if (this.validate_input(input_safe)) {
            let obj = this.deserialize_input(input_safe);
            let msg = '';
            let invalid = document.querySelector('.dataset-container .invalid-feedback');
            let textarea = document.querySelector('textarea#dataset-textarea');
            if (obj == null) {
                msg = 'Malformed input data';
            }
            else {
                if (UI.dsa == 'graph') {
                    if (Array.isArray(obj) == false) {
                        msg = 'Input data is not a 2D array';
                    }
                    for (let row of obj) {
                        if (Array.isArray(row) == false) {
                            msg = 'Input data is not a 2D array';
                            break;
                        }
                    }
                    if (UI.dsaFormat == 'adjacency_matrix') {
                        let height = obj.length;
                        for (let row of obj) {
                            if (row.length != height) {
                                msg = 'Matrix is not square';
                                break;
                            }
                        }
                        return obj;
                    }
                    if (UI.dsaFormat == 'adjacency_list') {
                        let rowsize = UI.userOptions.graph.weighted ? 3 : 2;
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
            }
            else {
                invalid.innerText = '';
                textarea.classList.toggle('is-invalid', false);
                textarea.classList.toggle('is-valid', true);
                return obj;
            }
        }
    }
    static validate_input(input) {
        if (input == '')
            return false;
        return true;
    }
    static sanitize_input(input_dirty) {
        return input_dirty.replace(/[\n\t\s;]/g, '');
    }
    static deserialize_input(input) {
        let result = null;
        try {
            result = JSON.parse(input);
            return result;
        }
        catch (ex) {
            return null;
        }
    }
}
export { Parser };
