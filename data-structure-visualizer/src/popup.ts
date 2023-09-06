import { Parser } from './parser';
import { Graph } from './graph';
import Collapse from '../scripts/external/bootstrap.bundle.min.js';
import {
	Types,
	Options,
	CanvasBgColor,
	DataStructureOptions,
	DataStructureRepresentations
} from './options';
declare const bootstrap;

(() => {
	let dstype: string = 'graph';
	let dsinputtype: string = 'adjacency_list';
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let input_options_panel: Collapse;
	let graph_opts, tree_opts, linkedlist_opts;
	let textarea: HTMLTextAreaElement;
	let weighted_switch: HTMLInputElement;
	let InputOptions: DataStructureOptions = Options;
	let InputTypes: DataStructureRepresentations = Types;

	function bind_inputs() {}

	function dropdownItemSelected(event) {
		if (event.target.hasAttribute('dsinputtypeoption')) {
			dstype = event.target.getAttribute('dstype');
			dsinputtype = event.target.getAttribute('dsinputtype');
			localStorage.setItem('dstype', dstype);
			localStorage.setItem('dsinputtype', dsinputtype);
			let dropdown_text: HTMLElement = document.querySelector(
				'.dataset-dropdown-text'
			)!;
			if (dropdown_text) {
				dropdown_text.innerText = event.target.innerText;
			}

			let placeholder = parse_input_options();

			if (textarea) {
				textarea.setAttribute('placeholder', placeholder);
			}
		}
	}

	function parse_linkedlist_options() {
		tree_opts.classList.toggle('hide-opts-panel', true);
		graph_opts.classList.toggle('hide-opts-panel', true);
		linkedlist_opts.classList.toggle('hide-opts-panel', false);

		input_options_panel.show();

		let doubly_switch: HTMLInputElement = document.getElementById(
			'doubly_switch'
		) as HTMLInputElement;
		InputOptions.linkedlist.doubly = doubly_switch.checked;
	}

	function parse_tree_options() {
		graph_opts.classList.toggle('hide-opts-panel', true);
		linkedlist_opts.classList.toggle('hide-opts-panel', true);
		tree_opts.classList.toggle('hide-opts-panel', false);

		input_options_panel.show();

		setTimeout(() => {
			let bst_switch = document.getElementById(
				'bst_switch'
			) as HTMLInputElement;
			let nary_switch = document.getElementById(
				'nary-switch'
			) as HTMLInputElement;
			let nulls_switch = document.getElementById(
				'nulls-switch'
			) as HTMLInputElement;
			InputOptions.tree.binary = bst_switch.checked;
			InputOptions.tree.nulls = nulls_switch.checked;
			InputOptions.tree.nary = nary_switch.checked;
		}, 200);
	}

	function parse_graph_options() {
		tree_opts.classList.toggle('hide-opts-panel', true);
		linkedlist_opts.classList.toggle('hide-opts-panel', true);
		graph_opts.classList.toggle('hide-opts-panel', false);

		input_options_panel.show();

		let weighted_switch = document.getElementById(
			'weighted_switch'
		) as HTMLInputElement;
		let directed_switch = document.getElementById(
			'directed-switch'
		) as HTMLInputElement;

		InputOptions.graph.weighted = weighted_switch.checked;
		InputOptions.graph.directed = directed_switch.checked;
	}

	function get_graph_placeholder() {
		if (dsinputtype == 'adjacency_list') {
			if (weighted_switch.checked) {
				return InputTypes.graph.adjacency_list.placeholder2;
			} else {
				return InputTypes.graph.adjacency_list.placeholder;
			}
		} else if (dsinputtype == 'adjacency_matrix') {
			return InputTypes.graph.adjacency_matrix.placeholder;
		}
	}

	function parse_input_options() {
		switch (dstype) {
			case 'graph':
				parse_graph_options();
				return get_graph_placeholder();
			case 'tree':
				parse_tree_options();
				break;
			case 'stack':
				input_options_panel.hide();
				break;
			case 'queue':
				input_options_panel.hide();
				break;
			case 'linkedlist':
				parse_linkedlist_options();
				break;
			default:
				break;
		}

		return InputTypes[dstype][dsinputtype].placeholder;
	}

	function goClicked() {
		if (dsinputtype) {
			visualize();
		}
	}

	function visualize() {
		let input = textarea.value;

		if (Parser.validate_input(input)) {
			let parsed_input = Parser.parse_input(
				input,
				dstype,
				dsinputtype,
				InputOptions
			);
			if (parsed_input == null) {
				// do nothing
			} else {
				// cache input
				localStorage.setItem('ds-input', input);

				let canvas_overlay = document.getElementById('idle-canvas-overlay')!;
				canvas_overlay.style.display = 'none';
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				let ds: any = null;
				switch (dsinputtype) {
					case null:
						return;
					case InputTypes.graph.adjacency_list.name:
					case InputTypes.graph.adjacency_matrix.name:
						ds = new Graph(ctx, canvas, InputTypes, InputOptions);
						break;
					default:
						return;
				}
				ds.parse(parsed_input, dstype, dsinputtype);
				ds.plot();
			}
		}
	}

	function construct_dropdown_options() {
		let elements: HTMLElement[] = [];

		for (let datastructure in InputTypes) {
			let header = document.createElement('li');
			let h6 = document.createElement('h6');
			h6.innerText =
				datastructure.slice(0, 1).toUpperCase() + datastructure.slice(1);
			h6.className = 'dropdown-header';
			let hr = document.createElement('hr');
			hr.className = 'dropdown-divider';
			header.appendChild(h6);
			elements.push(header);

			for (let inputtype in InputTypes[datastructure]) {
				let li = document.createElement('li');
				let a = document.createElement('a');
				a.className = 'dropdown-item';
				a.href = '#';
				a.innerText = InputTypes[datastructure][inputtype].desc;
				a.setAttribute('dstype', datastructure);
				a.setAttribute('dsinputtypeoption', '');
				a.setAttribute('dsinputtype', inputtype);
				li.appendChild(a);
				elements.push(li);
			}
			elements.push(hr);
		}

		let dropdownMenu = document.querySelector('.dropdown-menu')!;
		for (let item of elements) dropdownMenu.appendChild(item);
	}

	function init() {
		textarea = document.getElementById(
			'dataset-textarea'
		) as HTMLTextAreaElement;
		construct_dropdown_options();

		input_options_panel = new bootstrap.Collapse('#ds-collapse-panel', {
			toggle: false
		});

		graph_opts = document.getElementById('graph-options-panel');
		tree_opts = document.getElementById('tree-options-panel');
		linkedlist_opts = document.getElementById('linkedlist-options-panel');

		weighted_switch = document.getElementById(
			'weighted_switch'
		) as HTMLInputElement;
		weighted_switch.addEventListener('click', (event: any) => {
			if (dsinputtype != 'adjacency_list') return;
			InputOptions.graph.weighted = event.target.checked;
			if (InputOptions.graph.weighted) {
				textarea.setAttribute(
					'placeholder',
					InputTypes.graph.adjacency_list.placeholder2
				);
			} else {
				textarea.setAttribute(
					'placeholder',
					InputTypes.graph.adjacency_list.placeholder
				);
			}
		});

		document
			.querySelector('.dropdown-menu')!
			.addEventListener('click', dropdownItemSelected);

		document.querySelector('#go-btn')!.addEventListener('click', goClicked);

		let content_div = document.querySelector('.content')!;
		let input_form = document.querySelector('.form-container')!;
		canvas = document.querySelector('canvas');
		canvas.width = content_div.clientWidth - input_form.clientWidth - 20;
		canvas.height = canvas.width;
		ctx = canvas.getContext('2d', { alpha: false });
		ctx.fillStyle = CanvasBgColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		let cacheInput = localStorage.getItem('ds-input');
		let cache_dstype = localStorage.getItem('dstype');
		let cache_dsinputtype = localStorage.getItem('dsinputtype');

		if (cacheInput != null) {
			textarea.value = cacheInput;
		}

		if (cache_dstype != null && cache_dsinputtype != null) {
			let opt = document.querySelector(
				`a.dropdown-item[dstype=${cache_dstype}][dsinputtype=${cache_dsinputtype}]`
			) as HTMLAnchorElement;
			if (opt) {
				opt.click();
			}
		}
	}

	let weighted_edges = [
		[3, 1, 2],
		[3, 2, 3],
		[1, 1, 3],
		[1, 2, 4],
		[1, 1, 2],
		[2, 3, 4]
	];

	let adjacency_list = [
		[0, 1],
		[1, 2],
		[2, 3],
		[2, 4],
		[5, 6],
		[5, 7]
	];

	init();
})();
