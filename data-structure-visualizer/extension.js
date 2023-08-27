let lines_drawn = 0;
let curr_anim_id = 0;
let steps = 50;
let lines = [];

class Node {
	constructor(val, x = 0, y = 0, r = 0) {
		this.val = val;
		this.x = x;
		this.y = y;
		this.r = r;
	}
}

class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

function* Line(arr) {
	this.line = arr;

	for (let curr = 0; curr < this.line.length - 1; curr++) {
		yield {
			p1: this.line[curr],
			p2: this.line[curr + 1],
			i: curr,
		};
	}
	return { value: null, done: true };
}

function generate_points_along_line(from, to) {
	let vertices = [];
	let dx = to.x - from.x;
	let dy = to.y - from.y;
	for (let step = 0; step < steps + 1; step++) {
		vertices.push(
			new Point(from.x + (dx * step) / steps, from.y + (dy * step) / steps)
		);
	}
	return vertices;
}

function anim() {
	let { value: p, done } = lines[lines_drawn].next();
	if (done == true) {
		lines_drawn += 1;
		cancelAnimationFrame(curr_anim_id);
		ctx.closePath();
		if (lines_drawn < lines.length) curr_anim_id = requestAnimationFrame(anim);
		return;
	}

	curr_anim_id = requestAnimationFrame(anim);

	ctx.beginPath();
	ctx.strokeStyle = '#cccccc';
	ctx.moveTo(p.p1.x, p.p1.y);
	ctx.lineTo(p.p2.x, p.p2.y);
	ctx.stroke();
}

function calc_slope(p1, p2) {
	return Math.abs((p2.x - p1.x) / (p2.y - p1.y));
}

function format_edge_label(weights, key_to, key_from) {
	let text = '';
	if (weights[key_to] || weights[key_from]) {
		if (weights[key_to].length) {
			text = weights[key_to].sort((a, b) => a - b).join(', ');
		} else if (weights[key_from].length) {
			text = weights[key_from].sort((a, b) => b - a).join(',');
		}
		weights[key_to] = [];
		weights[key_from] = [];
	}
	return text;
}

function calc_label_offsets(slope, edge_label) {
	let text_x_offset = 0;
	let text_y_offset = 0;
	if (slope < 0.5) {
		// vertical
		text_x_offset = edge_label.length > 1 ? -(edge_label.length + 10) : -6;
	} else if (slope > 0.5 && slope < 1.5) {
		// diagonal
		text_x_offset = edge_label.length > 1 ? -(edge_label.length + 10) : -6;
	} else if (slope > 3) {
		// horizontal
		text_y_offset = -3;
	}

	return [text_x_offset, text_y_offset];
}

function calc_dist_ratio(dist, p1, p2) {
	return dist / Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function calc_point_on_line(from, to, dist_ratio) {
	let x = (1 - dist_ratio) * from.x + dist_ratio * to.x;
	let y = (1 - dist_ratio) * from.y + dist_ratio * to.y;
	return new Point(x, y);
}

function calc_midpoint(p1, p2) {
	return new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
}

function parse_weighted_adjancency_list(weighted_adjacency_list) {
	let matrix = [];
	let graph = {};
	let weights = {};
	let unique_nodes = new Set(
		weighted_adjacency_list.flatMap((edge) => edge.slice(1))
	);
	let node_list = Array.from(unique_nodes.values()).sort((a, b) => a - b);
	let canvas_width = Math.ceil(Math.sqrt(unique_nodes.size));

	for (let i = 0; i < canvas_width; i++) {
		matrix.push(
			node_list
				.slice(i * canvas_width, i * canvas_width + canvas_width)
				.map((node) => new Node(node))
		);
	}

	for (let edge of weighted_adjacency_list) {
		let key = edge[1] + '_' + edge[2];
		let key_reverse = edge[2] + '_' + edge[1];
		if (key in weights) {
			weights[key].push(edge[0]);
		} else if (key_reverse in weights) {
			weights[key_reverse].push(edge[0]);
		} else {
			weights[key] = [edge[0]];
		}
	}

	return [matrix, graph, weights, canvas_width];
}

function parse_input(input, data_structure) {
	if (data_structure == 'WEIGHTED_ADJACENCY_LIST') {
		return parse_weighted_adjancency_list(input);
	}
}

function draw_weighted_undirected_graph(
	ctx,
	radius,
	matrix,
	graph,
	weighted_edges,
	weights
) {
	for (let row = 0; row < matrix.length; row++) {
		for (let col = 0; col < matrix[row].length; col++) {
			let offset_x = Math.floor(Math.random() * (10 - -10 + 1) + -10);
			let offset_y = Math.floor(Math.random() * (10 - -10 + 1) + -10);
			let x = 100 * row + 50 + offset_x;
			let y = 100 * col + 50 + offset_y;

			matrix[row][col].x = x;
			matrix[row][col].y = y;
			matrix[row][col].r = 30;
			graph[matrix[row][col].val] = matrix[row][col];

			ctx.beginPath();
			ctx.fillStyle = '#D2E9E9';
			ctx.arc(x, y, radius, 0, 2 * Math.PI);
			ctx.fill();
			ctx.closePath();

			ctx.beginPath();
			ctx.fillStyle = '#010101';
			ctx.font = '12px monospace';
			ctx.textAlign = 'center';
			ctx.fillText(String(matrix[row][col].val), x, y + 3);
			ctx.closePath();
		}
	}

	for (let [weight, from, to] of weighted_edges) {
		let p1 = graph[from];
		let p2 = graph[to];
		let key_to = from + '_' + to;
		let key_from = to + '_' + from;

		if (weights[key_to].length == 0 && weights[key_from].length == 0) {
			continue;
		}

		let dist_ratio = calc_dist_ratio(radius, p1, p2);

		let p1_edge = calc_point_on_line(p1, p2, dist_ratio);
		let p2_edge = calc_point_on_line(p2, p1, dist_ratio);

		let mid_point = calc_midpoint(p1, p2);

		let edge_label = format_edge_label(weights, key_to, key_from);

		let slope = calc_slope(p1, p2);

		let [label_x_offset, label_y_offset] = calc_label_offsets(
			slope,
			edge_label
		);

		lines.push(Line(generate_points_along_line(p1_edge, p2_edge)));

		ctx.beginPath();
		ctx.fillStyle = '#CCCCCC';
		ctx.font = '10px monospace';
		ctx.textAlign = 'center';
		ctx.fillText(
			edge_label,
			mid_point.x + label_x_offset,
			mid_point.y + label_y_offset
		);
		ctx.closePath();
	}
}

let radius = 30;

let weighted_edges = [
	[3, 1, 2],
	[3, 2, 3],
	[1, 1, 3],
	[1, 2, 4],
	[1, 1, 2],
	[2, 3, 4],
];
let data_structure = 'WEIGHTED_ADJACENCY_LIST';

let [matrix, graph, weights, canvas_width] = parse_input(
	weighted_edges,
	data_structure
);

let canvas = document.createElement('canvas');
canvas.width = canvas_width * 100;
canvas.height = canvas_width * 100;

let ctx = canvas.getContext('2d', { alpha: false });
ctx.fillStyle = '#101010';
ctx.fillRect(0,0,canvas.width, canvas.height);

document.body.appendChild(canvas);

if (data_structure == 'WEIGHTED_ADJACENCY_LIST') {
	draw_weighted_undirected_graph(
		ctx,
		radius,
		matrix,
		graph,
		weighted_edges,
		weights
	);

	anim();
}
