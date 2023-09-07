class UserInput {
    constructor() {
        this.setDefaultOptions();
        this.getForms();
        this.bindForms();
    }
    setDefaultOptions() {
        this.userOptions = {
            graph: {
                directed: false,
                weighted: false
            },
            tree: {
                binary: false,
                nary: false,
                nulls: false
            },
            stack: {},
            queue: {},
            linkedlist: {
                doubly: false
            }
        };
    }
    getForms() {
        this.dsaSelectionText = document.querySelector('.dataset-dropdown-text');
    }
    bindForms() { }
}
const UI = new UserInput();
export { UI };
