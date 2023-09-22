import { Parser } from './utility/parser';
import { Graph } from './datastructures/graph';

import {
	Ripple,
	Collapse,
	Popconfirm,
	Input,
	Validation,
	initTE
} from '../node_modules/tw-elements/dist/js/tw-elements.es.min.js';
initTE({ Input, Validation, Ripple, Collapse, Popconfirm });
import { Aesthetics, DSA } from './utility/dsa-metadata';
import { UI } from './ui.service';
import { IdleSvg } from './idle-svg/idle-svg';
import { Tree } from './datastructures/tree';

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
	console.log(parsed_input);
	console.log(UI);
	switch (UI.userSelection.dsaType) {
		case null:
			return;
		case 'graph':
			ds = new Graph(ctx, canvas);
			break;
		case 'tree':
			ds = new Tree(ctx, canvas);
			break;
		default:
			return;
	}

	ds.Parse(parsed_input);
	ds.Plot();
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

	document.getElementById('idle-overlay').appendChild(IdleSvg);
	canvasOverlay = document.querySelector(
		'#idle-overlay > svg'
	)! as HTMLImageElement;
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
	UI.submitBtn.addEventListener('click', goClicked.bind(this));

	setupCanvas();

	UI.createRadio();

	restoreCache();
}

init();
