import { DSA, UserOptions, UserSelection } from './dsa-metadata';
import { Collapse } from '../node_modules/tw-elements/dist/js/tw-elements.es.min.js';
class UserInput {
    constructor() {
        this.setDefaultOptions();
        this.getForms();
        this.bindForms();
    }
    setDefaultOptions() {
        this.userSelection = UserSelection;
        this.userOptions = UserOptions;
    }
    getForms() {
        this.controlsCollapse = document.getElementById('collapse-item');
        this.dropdownMenu = document.querySelector('.dropdown-menu');
        this.form = document.getElementById('textarea-form');
        this.goBtn = document.getElementById('go-btn');
        this.textareaWrapper = document.getElementById('textarea-validation-wrapper');
        this.textarea = document.getElementById('dataset-textarea');
        this.dsaSelectionText = document.querySelector('.dataset-dropdown-text');
        this.graphControls = document.getElementById('graph-controls');
        this.treeControls = document.getElementById('tree-controls');
        this.linkedlistControls = document.getElementById('linkedlist-controls');
        this.weightedSwitch = document.getElementById('weighted_switch');
        this.directedSwitch = document.getElementById('directed-switch');
        this.bstSwitch = document.getElementById('bst_switch');
        this.narySwitch = document.getElementById('nary-switch');
        this.nullsSwitch = document.getElementById('nulls-switch');
        this.doublySwitch = document.getElementById('doubly_switch');
    }
    cache(val, key = 'user-options') {
        localStorage.setItem(key, val);
    }
    bindForms() {
        this.controlsCollapse = new Collapse(document.getElementById('collapse-item'), {
            toggle: true
        });
        this.form.addEventListener('changed.te.validation', (event) => {
            if (this.textareaWrapper.dataset.teValidationState == 'valid') {
                this.goBtn.removeAttribute('disabled');
                this.goBtn.classList.toggle('pointer-events-none', false);
            }
            else {
                this.goBtn.setAttribute('disabled', '');
                this.goBtn.classList.toggle('pointer-events-none', true);
            }
        });
        this.dropdownMenu.addEventListener('click', this.dropdownItemSelected.bind(this));
        this.weightedSwitch.addEventListener('change', (event) => {
            this.userOptions.graph.weighted = event.target.checked;
            this.cache(this.userOptions);
        });
        this.directedSwitch.addEventListener('change', (event) => {
            this.userOptions.graph.directed = event.target.checked;
            this.cache(this.userOptions);
        });
        this.bstSwitch.addEventListener('change', (event) => {
            this.userOptions.tree.binary = event.target.checked;
            this.cache(this.userOptions);
        });
        this.narySwitch.addEventListener('change', (event) => {
            this.userOptions.tree.nary = event.target.checked;
            this.cache(this.userOptions);
        });
        this.nullsSwitch.addEventListener('change', (event) => {
            this.userOptions.tree.nulls = event.target.checked;
            this.cache(this.userOptions);
        });
    }
    toggleControls(control) {
        let hideGraph = control != 'graph';
        let hideLL = control != 'linkedlist';
        let hideTree = control != 'tree';
        if (!hideGraph || !hideLL || !hideTree) {
            this.controlsCollapse.show();
            this.graphControls.classList.toggle('hide-switch-panel', hideGraph);
            this.linkedlistControls.classList.toggle('hide-switch-panel', hideLL);
            this.treeControls.classList.toggle('hide-switch-panel', hideTree);
        }
        else if (hideGraph && hideLL && hideTree) {
            this.controlsCollapse.hide();
        }
    }
    dropdownItemSelected(event) {
        if (event.target.hasAttribute('dsa-option')) {
            this.dsaType = event.target.getAttribute('dsa-type');
            this.dsaFormat = event.target.getAttribute('dsa-format');
            localStorage.setItem('dsa-type', this.dsaType);
            localStorage.setItem('dsa-format', this.dsaFormat);
            if (UI.dsaSelectionText) {
                UI.dsaSelectionText.innerText = event.target.innerText;
            }
            let placeholder = DSA[this.dsaType][this.dsaFormat].findPlaceholder(this.userOptions.graph.weighted);
            this.toggleControls(this.dsaType);
            if (this.textarea) {
                this.textarea.setAttribute('placeholder', placeholder);
            }
        }
    }
}
const UI = new UserInput();
export { UI };
