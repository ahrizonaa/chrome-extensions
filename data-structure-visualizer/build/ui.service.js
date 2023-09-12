import { DSA, UserOptions, UserSelection } from './dsa-metadata';
import { Collapse, Popconfirm } from '../node_modules/tw-elements/dist/js/tw-elements.es.min.js';
import { svgs } from './animated-datastructure-icons/svg-icons';
import { RadioBtn } from './dsa-radio-btn-group/radio-btn';
import { ListBtn } from './dsa-radio-btn-group/list-btn';
import { PopDiv } from './dsa-radio-btn-group/pop-div';
class UserInput {
    constructor() {
        this.setDefaultOptions();
        this.getForms();
        this.bindForms();
    }
    setDefaultOptions() {
        this.userSelection = UserSelection;
        this.userOptions = UserOptions;
        this.typeOptions = [
            {
                name: 'graph',
                formats: [
                    {
                        text: 'Adjacency List',
                        value: 'adjacency_list'
                    },
                    {
                        text: 'Adjacency Matrix',
                        value: 'adjacency_matrix'
                    }
                ]
            },
            { name: 'tree', formats: [{ text: 'Array', value: 'tree_array' }] },
            { name: 'stack', formats: [{ text: 'Array', value: 'stack_array' }] },
            { name: 'queue', formats: [{ text: 'Array', value: 'queue_array' }] },
            {
                name: 'linkedlist',
                formats: [{ text: 'Array', value: 'linkedlist_array' }]
            }
        ];
    }
    getForms() {
        this.controlsCollapse = document.getElementById('collapse-item');
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
    cacheObj(val, key = 'user-options') {
        localStorage.setItem(key, JSON.stringify(val));
    }
    bindForms() {
        this.controlsCollapse = new Collapse(document.getElementById('collapse-item'), {
            toggle: true
        });
        this.form.addEventListener('valid.te.validation', (event) => {
            this.goBtn.removeAttribute('disabled');
            this.goBtn.classList.toggle('pointer-events-none', false);
        });
        this.form.addEventListener('invalid.te.validation', (event) => {
            this.goBtn.setAttribute('disabled', '');
            this.goBtn.classList.toggle('pointer-events-none', true);
        });
        this.weightedSwitch.addEventListener('change', (event) => {
            this.userOptions.graph.weighted = event.target.checked;
            this.switchChanged();
        });
        this.directedSwitch.addEventListener('change', (event) => {
            this.userOptions.graph.directed = event.target.checked;
            this.switchChanged();
        });
        this.bstSwitch.addEventListener('change', (event) => {
            this.userOptions.tree.binary = event.target.checked;
            this.switchChanged();
        });
        this.narySwitch.addEventListener('change', (event) => {
            this.userOptions.tree.nary = event.target.checked;
            this.switchChanged();
        });
        this.nullsSwitch.addEventListener('change', (event) => {
            this.userOptions.tree.nulls = event.target.checked;
            this.switchChanged();
        });
    }
    switchChanged() {
        this.cacheObj(this.userOptions);
        this.textarea.dispatchEvent(new Event('input'));
    }
    toggleAll() {
        this.toggleSwitches();
        if (UI.userSelection.dsaType) {
            UI.toggleTypeRadio();
            UI.toggleSwitchVisibility();
        }
        if (UI.userSelection.dsaFormat) {
            UI.toggleFormatSelection();
        }
        if (UI.textarea.value) {
            this.triggerValidation();
        }
    }
    triggerValidation() {
        UI.goBtn.dispatchEvent(new Event('click'));
    }
    toggleSwitches() {
        UI.directedSwitch.checked = UI.userOptions.graph.directed;
        UI.weightedSwitch.checked = UI.userOptions.graph.weighted;
        UI.bstSwitch.checked = UI.userOptions.tree.binary;
        UI.narySwitch.checked = UI.userOptions.tree.nary;
        UI.nullsSwitch.checked = UI.userOptions.tree.nulls;
        UI.doublySwitch.checked = UI.userOptions.linkedlist.doubly;
    }
    toggleSwitchVisibility(control = UI.userSelection.dsaType) {
        let hideGraph = control != 'graph';
        let hideLL = control != 'linkedlist';
        let hideTree = control != 'tree';
        if (!hideGraph || !hideLL || !hideTree) {
            this.graphControls.classList.toggle('hide-switch-panel', hideGraph);
            this.linkedlistControls.classList.toggle('hide-switch-panel', hideLL);
            this.treeControls.classList.toggle('hide-switch-panel', hideTree);
            this.controlsCollapse.show();
        }
        else if (hideGraph && hideLL && hideTree) {
            this.controlsCollapse.hide();
        }
    }
    toggleTypeRadio(dsaType = UI.userSelection.dsaType) {
        this.typeOptions.forEach((option) => {
            if (option.name == dsaType) {
                UI.userSelection.dsaType = dsaType;
                option.node.classList.add('!bg-neutral-800');
                option.node.classList.add('!outline');
                option.node.classList.add('!ring-0');
            }
            else {
                option.node.classList.remove('!bg-neutral-800');
                option.node.classList.remove('!outline');
                option.node.classList.remove('!ring-0');
            }
        });
    }
    toggleFormatSelection() {
        let opt = this.typeOptions
            .filter((o) => o.name == UI.userSelection.dsaType)
            .pop();
        setTimeout(() => {
            try {
                [...opt.popconfirm.popconfirmBody.firstChild.childNodes]
                    .filter((el) => el.tagName == 'BUTTON')
                    .forEach((btn) => {
                    btn.classList.toggle('bg-neutral-700', btn.dataset.dsaFormat == UI.userSelection.dsaFormat);
                });
            }
            catch (ex) { }
            UI.togglePlaceholder();
        }, 0);
    }
    togglePlaceholder() {
        this.textarea.placeholder = DSA.findPlaceholder(UI.userSelection.dsaType, UI.userSelection.dsaFormat, {
            weighted: this.userOptions.graph.weighted
        });
    }
    createRadio() {
        let btnGroup = document.querySelector('.icon-panel > div[role=group]');
        this.typeOptions.forEach((option, i) => {
            let radioBtn = RadioBtn.cloneNode();
            radioBtn.textContent = option.name;
            radioBtn.dataset.dsaType = option.name;
            let opts = {};
            if (i == 0) {
                radioBtn.classList.add('rounded-l');
                opts.position = 'bottom right';
            }
            else if (i == this.typeOptions.length - 1) {
                radioBtn.classList.add('rounded-r');
                opts.position = 'bottom left';
            }
            option.popconfirm = new Popconfirm(radioBtn, opts, {
                body: 'backdrop-blur-md p-[1rem] bg-white/20 rounded-[0.5rem] opacity-0 dark:bg-neutral-700/20'
            });
            let pop = PopDiv.cloneNode();
            option.formats.forEach((format, index) => {
                let listBtn = ListBtn.cloneNode();
                listBtn.dataset.dsaType = option.name;
                listBtn.dataset.dsaFormat = format.value;
                listBtn.innerText = format.text;
                listBtn.addEventListener('click', (event) => {
                    let evtBtn = event.target;
                    UI.userSelection.dsaFormat = evtBtn.dataset.dsaFormat;
                    [...evtBtn.parentElement.childNodes]
                        .filter((e) => e.type == 'button')
                        .forEach((lstBtn, j) => {
                        lstBtn.classList.toggle('bg-neutral-700', lstBtn.dataset.dsaFormat == UI.userSelection.dsaFormat);
                    });
                    let pop = this.typeOptions
                        .filter((opt) => opt.name == UI.userSelection.dsaType)
                        .pop();
                    pop.popconfirm._confirmButton.click();
                    this.togglePlaceholder();
                });
                pop.appendChild(listBtn);
                if (index < option.formats.length - 1) {
                    let div = document.createElement('div');
                    div.style.height = '10px';
                    pop.appendChild(div);
                }
            });
            radioBtn.addEventListener('click', (event) => {
                UI.userSelection.dsaType = event.target.dataset.dsaType;
                if (!UI.userSelection.dsaFormat ||
                    DSA[UI.userSelection.dsaType][UI.userSelection.dsaFormat] == undefined) {
                    UI.userSelection.dsaFormat = this.typeOptions
                        .filter((o) => o.name == UI.userSelection.dsaType)
                        .pop().formats[0].value;
                }
                this.toggleTypeRadio();
                this.toggleFormatSelection();
                this.toggleSwitchVisibility();
                this.togglePlaceholder();
                let btnOption = this.typeOptions
                    .filter((e) => e.name == event.target.dataset.dsaType)
                    .pop();
                btnOption.popconfirm.popconfirmBody.replaceChildren(pop);
            });
            radioBtn.appendChild(svgs[i]);
            option.node = radioBtn;
            btnGroup.appendChild(radioBtn);
        });
    }
}
const UI = new UserInput();
export { UI };
