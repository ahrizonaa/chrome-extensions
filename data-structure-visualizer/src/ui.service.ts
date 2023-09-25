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
	Popconfirm,
	Validation,
	Input
} from '../node_modules/tw-elements/dist/js/tw-elements.es.min.js';
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
	textarea: HTMLTextAreaElement;
	controlsCollapse: Collapse;
	graphControls: HTMLDivElement;
	treeControls: HTMLDivElement;
	linkedlistControls: HTMLDivElement;
	weightedSwitch: HTMLInputElement;
	directedSwitch: HTMLInputElement;
	bstSwitch: HTMLInputElement;
	minHeapSwitch: HTMLInputElement;
	maxHeapSwitch: HTMLInputElement;
	doublySwitch: HTMLInputElement;
	textareaWrapper: HTMLDivElement;
	userOptions: DataStructureOptions;
	userSelection: DataStructureSelection;
	submitBtn: HTMLButtonElement;
	typeOptions: DataStructureRadioOption[];
	formValid: boolean = false;
	validator: Validation;
	form: HTMLFormElement;
	currFeedback: string | true;

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
		this.form = document.getElementById('textarea-form') as HTMLFormElement;
		document.querySelector('switch-panel').innerHTML = SwitchPanel;

		document.querySelector('draw-button').innerHTML = DrawButton;
		this.submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;

		this.textarea = document.getElementById('textarea') as HTMLTextAreaElement;
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

		this.minHeapSwitch = document.getElementById(
			'min-heap-switch'
		) as HTMLInputElement;

		this.maxHeapSwitch = document.getElementById(
			'max-heap-switch'
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

		this.validator = new Validation(this.form, {
			customRules: {
				postValidation: this.postValidation.bind(this)
			},
			customErrorMessages: {
				postValidation: ''
			}
		});

		fromEvent(this.textarea, 'input')
			.pipe(
				tap((val) => {
					this.submitBtn.classList.toggle('pointer-events-none', true);
					this.submitBtn.classList.toggle(
						'animate-[spin_0.75s_linear_infinite]',
						true
					);
					this.submitBtn.setAttribute('disabled', '');
				}),
				map((e: any) => {
					return e.target.value;
				}),
				distinctUntilChanged(),
				debounceTime(750)
			)
			.subscribe((input: string) => {
				this.submitBtn.classList.toggle(
					'animate-[spin_0.75s_linear_infinite]',
					false
				);
				this.validate();
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

		this.minHeapSwitch.addEventListener('change', (event: any) => {
			this.userOptions.tree.maxHeap = event.target.checked;
			this.switchChanged();
		});

		this.maxHeapSwitch.addEventListener('change', (event: any) => {
			this.userOptions.tree.minHeap = event.target.checked;
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

	validated(): void {
		this.submitBtn.removeAttribute('disabled');
		this.submitBtn.classList.toggle('pointer-events-none', false);
		this.cache(this.textarea.value, 'user-input');
	}

	invalidated(): void {
		this.submitBtn.setAttribute('disabled', '');
		this.submitBtn.classList.toggle('pointer-events-none', true);
	}

	postValidation(): true | string {
		if (this.formValid == false) {
			return this.currFeedback;
		}
		return this.formValid;
	}

	validate() {
		this.textarea.value = this.textarea.value.replace(/null/gi, 'null');
		if (!this.textarea.value) return;
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

	toggleSwitches(): void {
		this.directedSwitch.checked = this.userOptions.graph.directed;
		this.weightedSwitch.checked = this.userOptions.graph.weighted;
		this.bstSwitch.checked = this.userOptions.tree.binary;
		this.minHeapSwitch.checked = this.userOptions.tree.maxHeap;
		this.maxHeapSwitch.checked = this.userOptions.tree.minHeap;
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
		} else if (hideGraph && hideLL && hideTree) {
			this.controlsCollapse.hide();
		}
	}

	toggleTypeRadio(dsaType = this.userSelection.dsaType): void {
		this.typeOptions.forEach((option: any) => {
			if (option.name == dsaType) {
				this.userSelection.dsaType = dsaType;
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
			.filter((o) => o.name == this.userSelection.dsaType)
			.pop();

		setTimeout(() => {
			try {
				[...opt.popconfirm.popconfirmBody.firstChild.childNodes]
					.filter((el: HTMLElement) => el.tagName == 'BUTTON')
					.forEach((btn: HTMLButtonElement) => {
						btn.classList.toggle(
							'bg-neutral-700',
							btn.dataset.dsaFormat == this.userSelection.dsaFormat
						);
					});
			} catch (ex) {}
			this.togglePlaceholder();
		}, 0);

		let format = opt.formats
			.filter((f) => f.value == this.userSelection.dsaFormat)
			.pop();

		(opt.notch.children[0] as HTMLSpanElement).innerText = format.text;
		for (let op of this.typeOptions) {
			op.notch.classList.toggle('hidden', op.name != opt.name);
		}
	}

	togglePlaceholder(): void {
		this.textarea.placeholder = DSA.findPlaceholder(
			this.userSelection.dsaType,
			this.userSelection.dsaFormat,
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
					this.userSelection.dsaFormat = evtBtn.dataset.dsaFormat;
					this.cacheObj(this.userSelection, 'user-selection');
					[...(evtBtn.parentElement.childNodes as any)]
						.filter((e) => e.tagName == 'BUTTON')
						.forEach((lstBtn: HTMLButtonElement) => {
							lstBtn.classList.toggle(
								'bg-neutral-700',
								lstBtn.dataset.dsaFormat == this.userSelection.dsaFormat
							);
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

			radioBtn.addEventListener('click', (event: any) => {
				this.userSelection.dsaType = event.target.dataset.dsaType;

				let btnOption = this.typeOptions
					.filter((e) => e.name == event.target.dataset.dsaType)
					.pop();

				this.toggleTypeRadio();

				if (
					this.userSelection.dsaFormat &&
					btnOption.formats.filter(
						(f) => f.value == this.userSelection.dsaFormat
					).length
				) {
					this.toggleFormatSelection();
					this.togglePlaceholder();
				}

				this.toggleSwitchVisibility();
				btnOption.popconfirm.popconfirmBody.replaceChildren(pop);
			});

			radioBtn.appendChild(svgs[i]);
			option.node = radioBtn;

			let notch = document.createElement('div');
			notch.setAttribute(
				'class',
				'hidden pointer-events-none absolute flex justify-center items-center normal-case right-0 bottom-0 w-full h-[15px] text-[10px]'
			);
			let notchText = document.createElement('span');
			notchText.id = `format-btn-text-${option.name}`;
			notchText.setAttribute(
				'class',
				'font-light subpixel-antialiased normal-case text-ellipsis text-slate-400'
			);
			let notchIcon = document.createElement('div');
			notchIcon.setAttribute(
				'class',
				'text-primary absolute bottom-0 right-0 w-[15px] h-[15px]'
			);
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

const UI: UserInput = new UserInput();

export { UI };
