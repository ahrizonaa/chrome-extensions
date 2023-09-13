import { Parser } from './utility/parser';
import { Graph } from './datastructures/graph';

import {
	Ripple,
	Collapse,
	Popconfirm,
	Input,
	initTE
} from '../node_modules/tw-elements/dist/js/tw-elements.es.min.js';
initTE({ Input, Ripple, Collapse, Popconfirm });
import { Aesthetics, DSA } from './utility/dsa-metadata';
import { UI } from './ui.service';

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let canvasOverlay: HTMLImageElement;

function goClicked(): void {
	if (UI.formValid === true) {
		visualize();
	}
}

function visualize() {
	let input = UI.textarea.value;
	let parsed_input = JSON.parse(input);
	localStorage.setItem('user-input', input);
	canvasOverlay.style.display = 'none';
	clearCanvas();
	let ds: any = null;
	switch (UI.userSelection.dsaFormat) {
		case null:
			return;
		case DSA.graph.adjacency_list.name:
		case DSA.graph.adjacency_matrix.name:
			ds = new Graph(ctx, canvas);
			break;
		default:
			return;
	}
	ds.parse(parsed_input);
	ds.plot();
}

function clearCanvas() {
	ctx.fillStyle = Aesthetics.CanvasBgColor;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function setupCanvas() {
	let content = document.getElementById('content')!;
	let form = document.getElementById('form-wrapper')!;
	canvas = document.querySelector('canvas');
	canvas.width = content.clientWidth - form.clientWidth - 20;
	canvas.height = canvas.width;
	ctx = canvas.getContext('2d', { alpha: false });
	clearCanvas();
}

function restoreCache() {
	let cachedInput = localStorage.getItem('user-input');
	let userSelection = localStorage.getItem('user-selection');
	let userOptions = localStorage.getItem('user-options');
	if (userSelection) {
		UI.userSelection = JSON.parse(userSelection);
	}
	if (userOptions) {
		UI.userOptions = JSON.parse(userOptions);
	}

	if (cachedInput != null) {
		UI.textarea.value = cachedInput;
	}

	UI.toggleAll();
}

function init() {
	UI.goBtn.addEventListener('click', goClicked.bind(this));

	canvasOverlay = document.getElementById(
		'canvas-overlay'
	)! as HTMLImageElement;

	setupCanvas();

	UI.createRadio();

	restoreCache();
}

init();
