import { Parser } from './parser';
import { Graph } from './graph';
import { Aesthetics, DSA } from './dsa-metadata';
import { UI } from './userinput.service';
let dstype = 'graph';
let dsinputtype = 'adjacency_list';
let canvas;
let ctx;
function goClicked() {
    if (this.UI.dsaFormat) {
        visualize();
    }
}
function visualize() {
    let input = UI.textarea.value;
    if (Parser.validate_input(input)) {
        let parsed_input = Parser.parse_input(input);
        if (parsed_input == null) {
            // do nothing
        }
        else {
            // cache input
            localStorage.setItem('dsa-input', input);
            let canvas_overlay = document.getElementById('idle-canvas-overlay');
            canvas_overlay.style.display = 'none';
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let ds = null;
            switch (dsinputtype) {
                case null:
                    return;
                case DSA.graph.adjacency_list.name:
                case DSA.graph.adjacency_matrix.name:
                    ds = new Graph(ctx, canvas);
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
    let elements = [];
    for (let datastructure in DSA) {
        let header = document.createElement('li');
        let h6 = document.createElement('h6');
        h6.innerText =
            datastructure.slice(0, 1).toUpperCase() + datastructure.slice(1);
        h6.className = 'dropdown-header';
        let hr = document.createElement('hr');
        hr.className = 'dropdown-divider';
        header.appendChild(h6);
        elements.push(header);
        for (let inputtype in DSA[datastructure]) {
            let li = document.createElement('li');
            let a = document.createElement('a');
            a.className = 'dropdown-item';
            a.href = '#';
            a.innerText = DSA[datastructure][inputtype].desc;
            a.setAttribute('dstype', datastructure);
            a.setAttribute('dsinputtypeoption', '');
            a.setAttribute('dsinputtype', inputtype);
            li.appendChild(a);
            elements.push(li);
        }
        elements.push(hr);
    }
    let dropdownMenu = document.querySelector('.dropdown-menu');
    for (let item of elements)
        dropdownMenu.appendChild(item);
}
function init() {
    document.querySelector('#go-btn').addEventListener('click', goClicked);
    construct_dropdown_options();
    let content = document.querySelector('.content');
    let form = document.querySelector('.form-container');
    canvas = document.querySelector('canvas');
    canvas.width = content.clientWidth - form.clientWidth - 20;
    canvas.height = canvas.width;
    ctx = canvas.getContext('2d', { alpha: false });
    ctx.fillStyle = Aesthetics.CanvasBgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    let cacheInput = localStorage.getItem('dsa-input');
    let cache_dstype = localStorage.getItem('dsa');
    let cache_dsinputtype = localStorage.getItem('dsa-format');
    if (cacheInput != null) {
        UI.textarea.value = cacheInput;
    }
    if (cache_dstype != null && cache_dsinputtype != null) {
        let opt = document.querySelector(`a.dropdown-item[dstype=${cache_dstype}][dsinputtype=${cache_dsinputtype}]`);
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
