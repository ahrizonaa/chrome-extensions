import { Parser } from '../scripts/utility-functions.js';
import { Graph } from '../scripts/graph.js';
import { InputTypes } from '../scripts/constants.js';
(() => {
	let type = 'graph_adjacency_list';
	let canvas;
	let ctx;

	function dropdownItemSelected(event) {
		if (event.target.dataset.isdropdownitem) {
			type = event.target.dataset.val;
			let dropdownLabel = document.querySelector('#ds-input-label');
			if (dropdownLabel) {
				dropdownLabel.innerText = event.target.innerText;
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
		let input = document.querySelector('input#ds-input').value;

		if (Parser.validate_input(input)) {
			let parsed_input = Parser.parse_input(input);
			if (parsed_input == null) {
				// do nothing
			} else {
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

		setInterval(() => {
			let inputform = document.querySelector('input#ds-input');

			inputform.value = Parser.sanitize_input(inputform.value);
		}, 100);
		let content_div = document.querySelector('.content');
		let input_form = document.querySelector('#ds-input-form');
		canvas = document.querySelector('canvas');
		canvas.height = content_div.clientHeight - input_form.clientHeight - 20;
		ctx = canvas.getContext('2d', { alpha: false });
		ctx.fillStyle = '#212529';
		ctx.beginPath();
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
