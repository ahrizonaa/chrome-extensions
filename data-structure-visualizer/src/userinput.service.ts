import { DataStructureOptions, DSA } from './dsa-metadata';

import { Collapse } from '../node_modules/tw-elements/dist/js/tw-elements.es.min.js';

class UserInput {
	textarea: HTMLTextAreaElement;
	controlsCollapse: Collapse;
	graphControls: HTMLDivElement;
	treeControls: HTMLDivElement;
	linkedlistControls: HTMLDivElement;
	weightedSwitch: HTMLInputElement;
	directedSwitch: HTMLInputElement;
	bstSwitch: HTMLInputElement;
	narySwitch: HTMLInputElement;
	nullsSwitch: HTMLInputElement;
	doublySwitch: HTMLInputElement;
	dsaSelectionText: HTMLSpanElement;
	textareaWrapper: HTMLDivElement;
	userOptions: DataStructureOptions;
	dsaType: string;
	dsaFormat: string;
	goBtn: HTMLButtonElement;
	form: HTMLFormElement;
	dropdownMenu: HTMLUListElement;

	constructor() {
		this.setDefaultOptions();
		this.getForms();
		this.bindForms();
	}

	setDefaultOptions(): void {
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

	getForms(): void {
		this.controlsCollapse = document.getElementById(
			'collapse-item'
		) as HTMLDivElement;

		this.dropdownMenu = document.querySelector(
			'.dropdown-menu'
		) as HTMLUListElement;
		this.form = document.getElementById('textarea-form') as HTMLFormElement;
		this.goBtn = document.getElementById('go-btn') as HTMLButtonElement;
		this.textareaWrapper = document.getElementById(
			'textarea-validation-wrapper'
		) as HTMLDivElement;
		this.textarea = document.getElementById(
			'dataset-textarea'
		) as HTMLTextAreaElement;
		this.dsaSelectionText = document.querySelector(
			'.dataset-dropdown-text'
		) as HTMLSpanElement;

		this.graphControls = document.getElementById(
			'graph-controls'
		) as HTMLDivElement;

		this.treeControls = document.getElementById(
			'tree-controls'
		) as HTMLDivElement;

		this.linkedlistControls = document.getElementById(
			'linkedlist-controls'
		) as HTMLDivElement;

		this.weightedSwitch = document.getElementById(
			'weighted_switch'
		) as HTMLInputElement;
		this.directedSwitch = document.getElementById(
			'directed-switch'
		) as HTMLInputElement;

		this.bstSwitch = document.getElementById('bst_switch') as HTMLInputElement;

		this.narySwitch = document.getElementById(
			'nary-switch'
		) as HTMLInputElement;

		this.nullsSwitch = document.getElementById(
			'nulls-switch'
		) as HTMLInputElement;

		this.doublySwitch = document.getElementById(
			'doubly_switch'
		) as HTMLInputElement;
	}

	bindForms(): void {
		this.controlsCollapse = new Collapse(
			document.getElementById('collapse-item'),
			{
				toggle: true
			}
		);

		this.form.addEventListener('changed.te.validation', (event: any) => {
			if (this.textareaWrapper.dataset.teValidationState == 'valid') {
				this.goBtn.removeAttribute('disabled');
				this.goBtn.classList.toggle('pointer-events-none', false);
			} else {
				this.goBtn.setAttribute('disabled', '');
				this.goBtn.classList.toggle('pointer-events-none', true);
			}
		});

		this.dropdownMenu.addEventListener(
			'click',
			this.dropdownItemSelected.bind(this)
		);

		this.weightedSwitch.addEventListener('change', (event: any) => {
			this.userOptions.graph.weighted = event.target.checked;
		});

		this.directedSwitch.addEventListener('change', (event: any) => {
			this.userOptions.graph.directed = event.target.checked;
		});
		this.bstSwitch.addEventListener('change', (event: any) => {
			this.userOptions.tree.binary = event.target.checked;
		});

		this.narySwitch.addEventListener('change', (event: any) => {
			this.userOptions.tree.nary = event.target.checked;
		});

		this.nullsSwitch.addEventListener('change', (event: any) => {
			this.userOptions.tree.nulls = event.target.checked;
		});
	}

	toggleControls(control: string) {
		let hideGraph = control != 'graph';
		let hideLL = control != 'linkedlist';
		let hideTree = control != 'tree';
		if (!hideGraph || !hideLL || !hideTree) {
			this.controlsCollapse.show();
			this.graphControls.classList.toggle('hide-switch-panel', hideGraph);
			this.linkedlistControls.classList.toggle('hide-switch-panel', hideLL);
			this.treeControls.classList.toggle('hide-switch-panel', hideTree);
		} else if (hideGraph && hideLL && hideTree) {
			this.controlsCollapse.hide();
		}
	}

	dropdownItemSelected(event: any): void {
		if (event.target.hasAttribute('dsa-option')) {
			this.dsaType = event.target.getAttribute('dsa-type');
			this.dsaFormat = event.target.getAttribute('dsa-format');

			localStorage.setItem('dsa-type', this.dsaType);
			localStorage.setItem('dsa-format', this.dsaFormat);
			if (UI.dsaSelectionText) {
				UI.dsaSelectionText.innerText = event.target.innerText;
			}

			let placeholder = DSA[this.dsaType][this.dsaFormat].findPlaceholder(
				this.userOptions.graph.weighted
			);

			this.toggleControls(this.dsaType);

			if (this.textarea) {
				this.textarea.setAttribute('placeholder', placeholder);
			}
		}
	}
}

const UI: UserInput = new UserInput();

export { UI };
