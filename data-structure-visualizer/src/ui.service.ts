import {
	DataStructureOptions,
	DataStructureRadioOption,
	DataStructureSelection,
	DSA,
	UserOptions,
	UserSelection
} from './utility/dsa-metadata';

import {
	Collapse,
	Popconfirm
} from '../node_modules/tw-elements/dist/js/tw-elements.es.min.js';
import { svgs } from './animated-datastructure-icons/svg-icons';
import { RadioBtn } from './dsa-radio-btn-group/radio-btn';
import { ListBtn } from './dsa-radio-btn-group/list-btn';
import { PopDiv } from './dsa-radio-btn-group/pop-div';

import { map, distinctUntilChanged, fromEvent, debounceTime } from 'rxjs';
import { RadioGroup } from './dsa-radio-btn-group/radio-group-div';
import { SwitchPanel } from './switch-panel/switch-panel';
import { DrawButton } from './draw-button/draw-button';
import { TextAreaClasses } from './textarea/textarea';

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
	textareaWrapper: HTMLDivElement;
	userOptions: DataStructureOptions;
	userSelection: DataStructureSelection;
	goBtn: HTMLButtonElement;
	typeOptions: DataStructureRadioOption[];
	formValid: boolean = false;

	constructor() {
		this.setDefaultOptions();
		this.getForms();
		this.bindForms();
	}

	setDefaultOptions(): void {
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

	getForms(): void {
		document.querySelector('switch-panel').innerHTML = SwitchPanel;
		this.controlsCollapse = document.getElementById(
			'collapse-item'
		) as HTMLDivElement;

		document.querySelector('draw-button').innerHTML = DrawButton;
		this.goBtn = document.getElementById('go-btn') as HTMLButtonElement;

		this.textarea = document.getElementById(
			'dataset-textarea'
		) as HTMLTextAreaElement;
		this.textarea.setAttribute('class', TextAreaClasses);

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

	cacheObj(val: any, key: string = 'user-options'): void {
		localStorage.setItem(key, JSON.stringify(val));
	}

	cache(val: string, key: string): void {
		localStorage.setItem(key, val);
	}

	bindForms(): void {
		this.controlsCollapse = new Collapse(
			document.getElementById('collapse-item'),
			{
				toggle: false
			}
		);

		fromEvent(this.textarea, 'input')
			.pipe(
				map((e: any) => {
					return e.target.value;
				}),
				distinctUntilChanged(),
				debounceTime(1000)
			)
			.subscribe((input: string) => {
				console.log(input);
				this.triggerValidation();
			});

		this.weightedSwitch.addEventListener('change', (event: any) => {
			this.userOptions.graph.weighted = event.target.checked;
			this.switchChanged();
		});

		this.directedSwitch.addEventListener('change', (event: any) => {
			this.userOptions.graph.directed = event.target.checked;
			this.switchChanged();
		});
		this.bstSwitch.addEventListener('change', (event: any) => {
			this.userOptions.tree.binary = event.target.checked;
			this.switchChanged();
		});

		this.narySwitch.addEventListener('change', (event: any) => {
			this.userOptions.tree.nary = event.target.checked;
			this.switchChanged();
		});

		this.nullsSwitch.addEventListener('change', (event: any) => {
			this.userOptions.tree.nulls = event.target.checked;
			this.switchChanged();
		});
	}

	validated(): void {
		this.goBtn.removeAttribute('disabled');
		this.goBtn.classList.toggle('pointer-events-none', false);
		this.formValid = true;
		this.cache(this.textarea.value, 'user-input');
	}

	invalidated(): void {
		this.goBtn.setAttribute('disabled', '');
		this.goBtn.classList.toggle('pointer-events-none', true);
		this.formValid = false;
	}

	switchChanged() {
		this.cacheObj(this.userOptions);
		this.triggerValidation();
	}

	toggleAll() {
		this.toggleSwitches();

		if (UI.userSelection.dsaType) {
			UI.toggleTypeRadio();
		}
		UI.toggleSwitchVisibility();
		if (UI.userSelection.dsaFormat) {
			UI.toggleFormatSelection();
		}

		if (UI.textarea.value) {
			this.triggerValidation();
		}
	}

	triggerValidation(): void {
		this.goBtn.removeAttribute('disabled');
		this.goBtn.dispatchEvent(new Event('click'));
		// this.textarea.dispatchEvent(new Event('input'));
	}

	toggleSwitches(): void {
		UI.directedSwitch.checked = UI.userOptions.graph.directed;
		UI.weightedSwitch.checked = UI.userOptions.graph.weighted;
		UI.bstSwitch.checked = UI.userOptions.tree.binary;
		UI.narySwitch.checked = UI.userOptions.tree.nary;
		UI.nullsSwitch.checked = UI.userOptions.tree.nulls;
		UI.doublySwitch.checked = UI.userOptions.linkedlist.doubly;
	}

	toggleSwitchVisibility() {
		let hideGraph = UI.userSelection.dsaType != 'graph';
		let hideLL = UI.userSelection.dsaType != 'linkedlist';
		let hideTree = UI.userSelection.dsaType != 'tree';
		if (!hideGraph || !hideLL || !hideTree) {
			this.graphControls.classList.toggle('hide-switch-panel', hideGraph);
			this.linkedlistControls.classList.toggle('hide-switch-panel', hideLL);
			this.treeControls.classList.toggle('hide-switch-panel', hideTree);
			this.controlsCollapse.show();
		} else if (hideGraph && hideLL && hideTree) {
			this.controlsCollapse.hide();
		}
	}

	toggleTypeRadio(dsaType = UI.userSelection.dsaType): void {
		this.typeOptions.forEach((option: any) => {
			if (option.name == dsaType) {
				UI.userSelection.dsaType = dsaType;
				option.node.classList.add('!bg-neutral-800');
				option.node.classList.add('!outline');
				option.node.classList.add('!ring-0');
			} else {
				option.node.classList.remove('!bg-neutral-800');
				option.node.classList.remove('!outline');
				option.node.classList.remove('!ring-0');
			}
		});
	}
	toggleFormatSelection(): void {
		let opt = this.typeOptions
			.filter((o) => o.name == UI.userSelection.dsaType)
			.pop();

		setTimeout(() => {
			try {
				[...opt.popconfirm.popconfirmBody.firstChild.childNodes]
					.filter((el: HTMLElement) => el.tagName == 'BUTTON')
					.forEach((btn: HTMLButtonElement) => {
						btn.classList.toggle(
							'bg-neutral-700',
							btn.dataset.dsaFormat == UI.userSelection.dsaFormat
						);
					});
			} catch (ex) {}
			UI.togglePlaceholder();
		}, 0);
	}

	togglePlaceholder(): void {
		this.textarea.placeholder = DSA.findPlaceholder(
			UI.userSelection.dsaType,
			UI.userSelection.dsaFormat,
			{
				weighted: this.userOptions.graph.weighted
			}
		);
	}

	createRadio(): void {
		let btnGroup = document.querySelector('radio-group');

		btnGroup.innerHTML = RadioGroup;
		btnGroup = document.querySelector('div#radio-group');

		this.typeOptions.forEach((option: DataStructureRadioOption, i: number) => {
			let radioBtn = RadioBtn.cloneNode() as HTMLButtonElement;
			radioBtn.textContent = option.name;
			radioBtn.dataset.dsaType = option.name;
			let opts: any = {};
			if (i == 0) {
				radioBtn.classList.add('rounded-l');
				opts.position = 'bottom right';
			} else if (i == this.typeOptions.length - 1) {
				radioBtn.classList.add('rounded-r');
				opts.position = 'bottom left';
			}

			option.popconfirm = new Popconfirm(radioBtn, opts, {
				body: 'backdrop-blur-md p-[1rem] bg-white/20 rounded-[0.5rem] opacity-0 dark:bg-neutral-700/20'
			});

			let pop = PopDiv.cloneNode() as HTMLDivElement;

			option.formats.forEach((format: any, index: number) => {
				let listBtn = ListBtn.cloneNode() as HTMLButtonElement;
				listBtn.dataset.dsaType = option.name;
				listBtn.dataset.dsaFormat = format.value;
				listBtn.innerText = format.text;
				listBtn.addEventListener('click', (event: any) => {
					let evtBtn = event.target as HTMLButtonElement;
					UI.userSelection.dsaFormat = evtBtn.dataset.dsaFormat;
					this.cacheObj(UI.userSelection, 'user-selection');
					[...(evtBtn.parentElement.childNodes as any)]
						.filter((e) => e.tagName == 'BUTTON')
						.forEach((lstBtn: HTMLButtonElement) => {
							lstBtn.classList.toggle(
								'bg-neutral-700',
								lstBtn.dataset.dsaFormat == UI.userSelection.dsaFormat
							);
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

			radioBtn.addEventListener('click', (event: any) => {
				UI.userSelection.dsaType = event.target.dataset.dsaType;
				if (
					!UI.userSelection.dsaFormat ||
					DSA[UI.userSelection.dsaType][UI.userSelection.dsaFormat] == undefined
				) {
					UI.userSelection.dsaFormat = this.typeOptions
						.filter((o) => o.name == UI.userSelection.dsaType)
						.pop().formats[0].value;
				}
				this.cacheObj(UI.userSelection, 'user-selection');

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

const UI: UserInput = new UserInput();

export { UI };
