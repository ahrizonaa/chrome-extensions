import { Parser } from '../scripts/utility-functions.js';
import { Graph } from '../scripts/graph.js';
import {
	InputTypes,
	InputOptions,
	CanvasBgColor
} from '../scripts/constants.js';

(() => {
	let dstype = 'graph';
	let inputtype = 'adjacency_list';
	let canvas;
	let ctx;
	let input_options_panel;

	function dropdownItemSelected(event) {
		if (event.target.hasAttribute('dsinputtypeoption')) {
			dstype = event.target.getAttribute('dstype');
			inputtype = event.target.getAttribute('dsinputtype');
			let dropdown_text = document.querySelector('.dataset-dropdown-text');
			if (dropdown_text) {
				dropdown_text.innerText = event.target.innerText;
			}

			let textarea = document.getElementById('dataset-textarea');
			let placeholder = parse_input_options();

			if (textarea) {
				textarea.setAttribute('placeholder', placeholder);
			}
		}
	}

	function parse_input_options() {
		if (['graph', 'tree', 'linkedlist'].includes(dstype)) {
			let graph_opts = document.getElementById('graph-options-panel');
			let tree_opts = document.getElementById('tree-options-panel');
			let linkedlist_opts = document.getElementById('linkedlist-options-panel');

			switch (dstype) {
				case 'graph':
					tree_opts.classList.toggle('hide-opts-panel', true);
					linkedlist_opts.classList.toggle('hide-opts-panel', true);
					graph_opts.classList.toggle('hide-opts-panel', false);

					input_options_panel.show();

					let weighted_switch = document.getElementById('weighted_switch');
					let directed_switch = document.getElementById('directed-switch');

					InputOptions.graph.weighted = weighted_switch.checked;
					InputOptions.graph.directed = directed_switch.checked;

					if (inputtype == 'adjacency_list') {
						if (weighted_switch.checked) {
							return InputTypes.graph.weighted_adjacency_list.placeholder;
						} else {
							return InputTypes.graph.adjacency_list.placeholder;
						}
					}
					break;
				case 'tree':
					graph_opts.classList.toggle('hide-opts-panel', true);
					linkedlist_opts.classList.toggle('hide-opts-panel', true);
					tree_opts.classList.toggle('hide-opts-panel', false);

					input_options_panel.show();

					setTimeout(() => {
						let bst_switch = document.getElementById('bst_switch');
						let nary_switch = document.getElementById('nary-switch');
						let nulls_switch = document.getElementById('nulls-switch');
						InputOptions.binary_tree.bst = bst_switch.checked;
						InputOptions.binary_tree.nulls = nulls_switch.checked;
						InputOptions.binary_tree.nary = nary_switch.checked;
					}, 200);
					break;
				case 'linkedlist':
					tree_opts.classList.toggle('hide-opts-panel', true);
					graph_opts.classList.toggle('hide-opts-panel', true);
					linkedlist_opts.classList.toggle('hide-opts-panel', false);

					input_options_panel.show();

					let doubly_switch = document.getElementById('doubly_switch');
					InputOptions.linkedlist.doubly = doubly_switch.checked;
					break;
				default:
					break;
			}
		}

		return InputTypes[dstype][inputtype].placeholder;
	}

	function goClicked() {
		if (inputtype) {
			visualize();
		}
	}

	function visualize() {
		let input = document.querySelector('#dataset-textarea').value;

		if (Parser.validate_input(input)) {
			let parsed_input = Parser.parse_input(input, dstype, inputtype);
			if (parsed_input == null) {
				// do nothing
			} else {
				let canvas_overlay = document.getElementById('idle-canvas-overlay');
				canvas_overlay.style.display = 'none';
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				let ds = null;
				switch (inputtype) {
					case null:
						return;
					case InputTypes.graph.adjacency_list.name:
					case InputTypes.graph.weighted_adjacency_list.name:
					case InputTypes.graph.adjacency_matrix.name:
						ds = new Graph(ctx, canvas);
						break;
					default:
						return;
				}
				ds.parse(parsed_input, dstype, inputtype);
				ds.plot();
			}
		}
	}

	function construct_dropdown_options() {
		let elements = [];

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

		let dropdownMenu = document.querySelector('.dropdown-menu');
		for (let item of elements) dropdownMenu.appendChild(item);
	}

	function init() {
		construct_dropdown_options();

		input_options_panel = new bootstrap.Collapse('#ds-collapse-panel', {
			toggle: false
		});

		let weighted_switch = document.getElementById('weighted_switch');
		weighted_switch.addEventListener('click', (event) => {
			if (inputtype != 'adjacency_list') return;
			let textarea = document.getElementById('dataset-textarea');

			if (event.target.checked) {
				textarea.setAttribute(
					'placeholder',
					InputTypes.graph.weighted_adjacency_list.placeholder
				);
			} else {
				textarea.setAttribute(
					'placeholder',
					InputTypes.graph.adjacency_list.placeholder
				);
			}
		});

		document
			.querySelector('.dropdown-menu')
			.addEventListener('click', dropdownItemSelected);

		document.querySelector('#go-btn').addEventListener('click', goClicked);

		// setInterval(() => {
		// 	let inputform = document.querySelector('#dataset-textarea');

		// 	inputform.value = Parser.sanitize_input(inputform.value);
		// }, 100);

		let content_div = document.querySelector('.content');
		let input_form = document.querySelector('.form-container');
		canvas = document.querySelector('canvas');
		canvas.width = content_div.clientWidth - input_form.clientWidth - 20;
		canvas.height = canvas.width;
		ctx = canvas.getContext('2d', { alpha: false });
		ctx.fillStyle = CanvasBgColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
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
