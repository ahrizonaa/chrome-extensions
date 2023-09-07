import { DSA } from './dsa-metadata';
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
        this.textarea = document.getElementById('dataset-textarea');
        this.dsaSelectionText = document.querySelector('.dataset-dropdown-text');
        this.graphControls = document.getElementById('graph-options-panel');
        this.treeControls = document.getElementById('tree-options-panel');
        this.linkedlistControls = document.getElementById('linkedlist-options-panel');
        this.weightedSwitch = document.getElementById('weighted_switch');
        this.directedSwitch = document.getElementById('directed-switch');
        this.bstSwitch = document.getElementById('bst_switch');
        this.narySwitch = document.getElementById('nary-switch');
        this.nullsSwitch = document.getElementById('nulls-switch');
        this.doublySwitch = document.getElementById('doubly_switch');
    }
    bindForms() {
        document
            .querySelector('.dropdown-menu')
            .addEventListener('click', this.dropdownItemSelected.bind(this));
        this.weightedSwitch.addEventListener('change', (event) => {
            this.userOptions.graph.weighted = event.target.checked;
        });
        this.directedSwitch.addEventListener('change', (event) => {
            this.userOptions.graph.directed = event.target.checked;
        });
        this.bstSwitch.addEventListener('change', (event) => {
            this.userOptions.tree.binary = event.target.checked;
        });
        this.narySwitch.addEventListener('change', (event) => {
            this.userOptions.tree.nary = event.target.checked;
        });
        this.nullsSwitch.addEventListener('change', (event) => {
            this.userOptions.tree.nulls = event.target.checked;
        });
    }
    toggleControls(control) {
        let hideGraph = control != 'graph';
        let hideLL = control != 'linkedlist';
        let hideTree = control != 'tree';
        this.graphControls.classList.toggle('hide-opts-panel', hideGraph);
        this.linkedlistControls.classList.toggle('hide-opts-panel', hideLL);
        this.treeControls.classList.toggle('hide-opts-panel', hideTree);
    }
    dropdownItemSelected(event) {
        if (event.target.hasAttribute('dsinputtypeoption')) {
            this.dsa = event.target.getAttribute('dstype');
            this.dsaFormat = event.target.getAttribute('dsinputtype');
            localStorage.setItem('dsa', this.dsa);
            localStorage.setItem('dsa-format', this.dsaFormat);
            if (UI.dsaSelectionText) {
                UI.dsaSelectionText.innerText = event.target.innerText;
            }
            let placeholder = DSA[this.dsa][this.dsaFormat].findPlaceholder(this.userOptions.graph.weighted);
            if (this.textarea) {
                this.textarea.setAttribute('placeholder', placeholder);
            }
        }
    }
}
const UI = new UserInput();
export { UI };
