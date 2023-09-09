import { Parser } from './parser';
import { Graph } from './graph';
import { Ripple, Dropdown, Input, Validation, Collapse, initTE } from '../node_modules/tw-elements/dist/js/tw-elements.es.min.js';
initTE({ Dropdown, Ripple, Input, Validation, Collapse });
import { Aesthetics, DSA } from './dsa-metadata';
import { UI } from './userinput.service';
import { DatastructureDropdown } from './datastructure-dropdown';
let canvas;
let ctx;
let goBtn;
let canvasOverlay;
function goClicked() {
    if (UI.dsaFormat) {
        visualize();
    }
}
function visualize() {
    let input = UI.textarea.value;
    let parsed_input = JSON.parse(input);
    localStorage.setItem('dsa-input', input);
    canvasOverlay.style.display = 'none';
    clearCanvas();
    let ds = null;
    switch (UI.dsaFormat) {
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
    let content = document.querySelector('.content');
    let form = document.querySelector('.form-container');
    canvas = document.querySelector('canvas');
    canvas.width = content.clientWidth - form.clientWidth - 20;
    canvas.height = canvas.width;
    ctx = canvas.getContext('2d', { alpha: false });
    clearCanvas();
}
function restoreCache() {
    let cachedInput = localStorage.getItem('dsa-input');
    let cachedType = localStorage.getItem('dsa-type');
    let cachedFormat = localStorage.getItem('dsa-format');
    if (cachedType != null && cachedFormat != null) {
        let opt = document.querySelector(`a.dropdown-item[dsa-type=${cachedType}][dsa-format=${cachedFormat}]`);
        if (opt) {
            opt.click();
        }
    }
    if (cachedInput != null) {
        UI.textarea.value = cachedInput;
        UI.textarea.focus();
        UI.textarea.classList.toggle('active', true);
        UI.goBtn.click();
    }
}
function setupFormValidation() {
    let val = new Validation(UI.form, {
        customErrorMessages: {
            isValid: ''
        },
        customRules: {
            isValid: Parser.isValid
        }
    });
}
function init() {
    UI.goBtn.addEventListener('click', goClicked.bind(this));
    canvasOverlay = document.getElementById('idle-canvas-overlay');
    DatastructureDropdown.Create();
    setupFormValidation();
    setupCanvas();
    restoreCache();
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
