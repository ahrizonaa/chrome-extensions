import { DSA, UserOptions, UserSelection } from './utility/dsa-metadata';
import { Collapse, Popconfirm, Validation } from '../node_modules/tw-elements/dist/js/tw-elements.es.min.js';
import { svgs } from './animated-datastructure-icons/svg-icons';
import { RadioBtn } from './dsa-radio-btn-group/radio-btn';
import { ListBtn } from './dsa-radio-btn-group/list-btn';
import { PopDiv } from './dsa-radio-btn-group/pop-div';
import { map, distinctUntilChanged, fromEvent, debounceTime, tap } from 'rxjs';
import { RadioGroup } from './dsa-radio-btn-group/radio-group-div';
import { SwitchPanel } from './switch-panel/switch-panel';
import { DrawButton } from './draw-button/draw-button';
import { TextAreaClasses } from './textarea/textarea';
import { Parser } from './utility/parser';
class UserInput {
    constructor() {
        this.formValid = false;
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
        this.form = document.getElementById('textarea-form');
        document.querySelector('switch-panel').innerHTML = SwitchPanel;
        document.querySelector('draw-button').innerHTML = DrawButton;
        this.submitBtn = document.getElementById('submit-btn');
        this.textarea = document.getElementById('textarea');
        this.textarea.setAttribute('class', TextAreaClasses);
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
    cache(val, key) {
        localStorage.setItem(key, val);
    }
    bindForms() {
        this.controlsCollapse = new Collapse(document.getElementById('collapse-item'), {
            toggle: false
        });
        this.validator = new Validation(this.form, {
            customRules: {
                postValidation: this.postValidation.bind(this)
            },
            customErrorMessages: {
                postValidation: ''
            }
        });
        fromEvent(this.textarea, 'input')
            .pipe(tap((val) => {
            this.submitBtn.classList.toggle('pointer-events-none', true);
            this.submitBtn.classList.toggle('animate-[spin_0.75s_linear_infinite]', true);
            this.submitBtn.setAttribute('disabled', '');
        }), map((e) => {
            return e.target.value;
        }), distinctUntilChanged(), debounceTime(750))
            .subscribe((input) => {
            this.submitBtn.classList.toggle('animate-[spin_0.75s_linear_infinite]', false);
            this.validate();
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
        this.validate();
    }
    toggleAll() {
        this.toggleSwitches();
        if (this.userSelection.dsaType) {
            this.toggleTypeRadio();
        }
        this.toggleSwitchVisibility();
        if (this.userSelection.dsaFormat) {
            this.toggleFormatSelection();
        }
        if (this.textarea.value) {
            this.validate();
        }
    }
    validated() {
        this.submitBtn.removeAttribute('disabled');
        this.submitBtn.classList.toggle('pointer-events-none', false);
        this.cache(this.textarea.value, 'user-input');
    }
    invalidated() {
        this.submitBtn.setAttribute('disabled', '');
        this.submitBtn.classList.toggle('pointer-events-none', true);
    }
    postValidation() {
        if (this.formValid == false) {
            return this.currFeedback;
        }
        return this.formValid;
    }
    validate() {
        if (!this.textarea.value)
            return;
        this.currFeedback = Parser.isValid(this.textarea.value, '', '');
        if (this.currFeedback === true) {
            this.formValid = true;
            this.validated();
            this.submitBtn.dispatchEvent(new Event('click'));
            return;
        }
        this.formValid = false;
        this.invalidated();
        this.submitBtn.dispatchEvent(new Event('click'));
    }
    toggleSwitches() {
        this.directedSwitch.checked = this.userOptions.graph.directed;
        this.weightedSwitch.checked = this.userOptions.graph.weighted;
        this.bstSwitch.checked = this.userOptions.tree.binary;
        this.narySwitch.checked = this.userOptions.tree.nary;
        this.nullsSwitch.checked = this.userOptions.tree.nulls;
        this.doublySwitch.checked = this.userOptions.linkedlist.doubly;
    }
    toggleSwitchVisibility() {
        let hideGraph = this.userSelection.dsaType != 'graph';
        let hideLL = this.userSelection.dsaType != 'linkedlist';
        let hideTree = this.userSelection.dsaType != 'tree';
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
    toggleTypeRadio(dsaType = this.userSelection.dsaType) {
        this.typeOptions.forEach((option) => {
            if (option.name == dsaType) {
                this.userSelection.dsaType = dsaType;
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
            .filter((o) => o.name == this.userSelection.dsaType)
            .pop();
        setTimeout(() => {
            try {
                [...opt.popconfirm.popconfirmBody.firstChild.childNodes]
                    .filter((el) => el.tagName == 'BUTTON')
                    .forEach((btn) => {
                    btn.classList.toggle('bg-neutral-700', btn.dataset.dsaFormat == this.userSelection.dsaFormat);
                });
            }
            catch (ex) { }
            this.togglePlaceholder();
        }, 0);
        let format = opt.formats
            .filter((f) => f.value == this.userSelection.dsaFormat)
            .pop();
        opt.notch.children[0].innerText = format.text;
        for (let op of this.typeOptions) {
            op.notch.classList.toggle('hidden', op.name != opt.name);
        }
    }
    togglePlaceholder() {
        this.textarea.placeholder = DSA.findPlaceholder(this.userSelection.dsaType, this.userSelection.dsaFormat, {
            weighted: this.userOptions.graph.weighted
        });
    }
    createRadio() {
        let btnGroup = document.querySelector('radio-group');
        btnGroup.innerHTML = RadioGroup;
        btnGroup = document.querySelector('div#radio-group');
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
                    this.userSelection.dsaFormat = evtBtn.dataset.dsaFormat;
                    this.cacheObj(this.userSelection, 'user-selection');
                    [...evtBtn.parentElement.childNodes]
                        .filter((e) => e.tagName == 'BUTTON')
                        .forEach((lstBtn) => {
                        lstBtn.classList.toggle('bg-neutral-700', lstBtn.dataset.dsaFormat == this.userSelection.dsaFormat);
                    });
                    let pop = this.typeOptions
                        .filter((opt) => opt.name == this.userSelection.dsaType)
                        .pop();
                    pop.popconfirm._confirmButton.click();
                    this.toggleFormatSelection();
                    this.togglePlaceholder();
                    this.validate();
                });
                pop.appendChild(listBtn);
                if (index < option.formats.length - 1) {
                    let div = document.createElement('div');
                    div.style.height = '10px';
                    pop.appendChild(div);
                }
            });
            radioBtn.addEventListener('click', (event) => {
                this.userSelection.dsaType = event.target.dataset.dsaType;
                let btnOption = this.typeOptions
                    .filter((e) => e.name == event.target.dataset.dsaType)
                    .pop();
                this.toggleTypeRadio();
                if (this.userSelection.dsaFormat &&
                    btnOption.formats.filter((f) => f.value == this.userSelection.dsaFormat).length) {
                    this.toggleFormatSelection();
                    this.togglePlaceholder();
                }
                this.toggleSwitchVisibility();
                btnOption.popconfirm.popconfirmBody.replaceChildren(pop);
            });
            radioBtn.appendChild(svgs[i]);
            option.node = radioBtn;
            let notch = document.createElement('div');
            notch.setAttribute('class', 'hidden pointer-events-none absolute flex justify-center items-center normal-case right-0 bottom-0 w-full h-[15px] text-[10px]');
            let notchText = document.createElement('span');
            notchText.id = `format-btn-text-${option.name}`;
            notchText.setAttribute('class', 'font-light subpixel-antialiased normal-case text-ellipsis text-slate-400');
            let notchIcon = document.createElement('div');
            notchIcon.setAttribute('class', 'text-primary absolute bottom-0 right-0 w-[15px] h-[15px]');
            notchIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="!w-[15px] !h-[15px]pr-[5px] box-content">
						<path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"></path>
					</svg>`;
            notch.appendChild(notchText);
            notch.appendChild(notchIcon);
            option.notch = notch;
            radioBtn.appendChild(notch);
            btnGroup.appendChild(radioBtn);
        });
    }
}
const UI = new UserInput();
export { UI };
//# sourceMappingURL=ui.service.js.map