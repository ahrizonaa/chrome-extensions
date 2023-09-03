import { Parser } from '../scripts/utility-functions.js';
import { Graph } from '../scripts/graph.js';
import {
	InputTypes,
	InputPlaceholders,
	CanvasBgColor
} from '../scripts/constants.js';

(() => {
	let type = 'graph_adjacency_list';
	let canvas;
	let ctx;

	function dropdownItemSelected(event) {
		if (event.target.dataset.isdropdownitem) {
			type = event.target.dataset.val;
			let dropdown_text = document.querySelector('.dataset-dropdown-text');
			if (dropdown_text) {
				dropdown_text.innerText = event.target.innerText;
			}
			let textarea = document.getElementById('dataset-textarea');
			if (textarea) {
				console.log(InputPlaceholders[type]);
				textarea.setAttribute('placeholder', `${InputPlaceholders[type]}`);
			}
			visualize();
		}
	}

	function goClicked() {
		if (type) {
			visualize();
		}
	}

	function visualize() {
		let input = document.querySelector('#dataset-textarea').value;

		if (Parser.validate_input(input)) {
			let parsed_input = Parser.parse_input(input);
			if (parsed_input == null) {
				// do nothing
			} else {
				let canvas_overlay = document.getElementById('idle-canvas-overlay');
				canvas_overlay.style.display = 'none';
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				let ds = null;
				switch (type) {
					case null:
						return;
					case InputTypes.graph.adjacency_list:
					case InputTypes.graph.weighted_adjacency_list:
					case InputTypes.graph.adjacency_matrix:
						ds = new Graph(ctx, canvas);
						break;
					default:
						return;
				}
				ds.parse(parsed_input, type);
				ds.plot();
			}
		}
	}

	function init() {
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
