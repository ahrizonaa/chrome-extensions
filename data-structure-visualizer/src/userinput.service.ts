import {
	DataStructureOptions,
	DataStructureRepresentations,
	DSA
} from './dsa-metadata';

class UserInput {
	textarea: HTMLTextAreaElement;
	controlsCollapse: any;
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
	userOptions: DataStructureOptions;
	dsa: string;
	dsaFormat: string;

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
		this.textarea = document.getElementById(
			'dataset-textarea'
		) as HTMLTextAreaElement;
		this.dsaSelectionText = document.querySelector(
			'.dataset-dropdown-text'
		) as HTMLSpanElement;

		this.graphControls = document.getElementById(
			'graph-options-panel'
		) as HTMLDivElement;

		this.treeControls = document.getElementById(
			'tree-options-panel'
		) as HTMLDivElement;

		this.linkedlistControls = document.getElementById(
			'linkedlist-options-panel'
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
		document
			.querySelector('.dropdown-menu')!
			.addEventListener('click', this.dropdownItemSelected);

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
		this.graphControls.classList.toggle('hide-opts-panel', hideGraph);
		this.linkedlistControls.classList.toggle('hide-opts-panel', hideLL);
		this.treeControls.classList.toggle('hide-opts-panel', hideTree);
	}

	dropdownItemSelected(event: any): void {
		if (event.target.hasAttribute('dsinputtypeoption')) {
			this.dsa = event.target.getAttribute('dstype');
			this.dsaFormat = event.target.getAttribute('dsinputtype');
			localStorage.setItem('dsa', this.dsa);
			localStorage.setItem('dsa-format', this.dsaFormat);
			if (UI.dsaSelectionText) {
				UI.dsaSelectionText.innerText = event.target.innerText;
			}

			let placeholder = DSA[this.dsa][this.dsaFormat].findPlaceholder(
				this.userOptions.graph.weighted
			);

			if (textarea) {
				textarea.setAttribute('placeholder', placeholder);
			}
		}
	}
}

const UI: UserInput = new UserInput();

export { UI };
