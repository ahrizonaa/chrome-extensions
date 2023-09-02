import { TreeNode, Edge } from './base-data-structures.js';
import { Maths } from './math-functions.js';
import { InputTypes } from './constants.js';

class Graph {
	constructor(ctx, canvas) {
		this.ctx = ctx;
		this.canvas = canvas;
		this.type = null;
		this.dataset = [];
		this.matrix = [];
		this.graph = {};
		this.weights = [];
		this.unique_nodes = new Set();
		this.node_list = [];
		this.edges = [];
		this.radius = NaN;
		this.cell_size = NaN;
		this.grid_size = NaN;
		this.steps = 50;
		this.current_edge = 0;
		this.animation_frame_id = NaN;
	}

	parse(input_dataset, ds_type) {
		this.dataset = input_dataset;
		this.type = ds_type;
		if (this.type == InputTypes.graph.adjacency_list) {
			this.unique_nodes = new Set(this.dataset.flatMap((edge) => edge));
			this.node_list = Array.from(this.unique_nodes.values()).sort(
				(a, b) => a - b
			);
			this.grid_size = Math.ceil(Math.sqrt(this.unique_nodes.size));

			for (let i = 0; i < this.grid_size; i++) {
				this.matrix.push(
					this.node_list
						.slice(i * this.grid_size, i * this.grid_size + this.grid_size)
						.map((node) => new TreeNode(node))
				);
			}
		} else if (this.type == InputTypes.graph.weighted_adjacency_list) {
			this.unique_nodes = new Set(
				this.dataset.flatMap((edge) => edge.slice(1))
			);
			this.node_list = Array.from(this.unique_nodes.values()).sort(
				(a, b) => a - b
			);
			this.grid_size = Math.ceil(Math.sqrt(this.unique_nodes.size));

			for (let i = 0; i < this.grid_size; i++) {
				this.matrix.push(
					this.node_list
						.slice(i * this.grid_size, i * this.grid_size + this.grid_size)
						.map((node) => new TreeNode(node))
				);
			}

			for (let edge of this.dataset) {
				let key = edge[1] + '_' + edge[2];
				let key_reverse = edge[2] + '_' + edge[1];
				if (key in this.weights) {
					this.weights[key].push(edge[0]);
				} else if (key_reverse in this.weights) {
					this.weights[key_reverse].push(edge[0]);
				} else {
					this.weights[key] = [edge[0]];
				}
			}
		} else if (this.type == InputTypes.graph.adjacency_matrix) {
			// todo: implement
		}

		this.cell_size = this.canvas.height / this.grid_size;
		this.radius = this.cell_size * 0.25;
	}

	plot() {
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height, '#212529');
		if (this.type == InputTypes.graph.weighted_adjacency_list)
			this.plotWeightedUndirectedGraph();
		else if (this.type == InputTypes.graph.adjacency_list)
			this.plotUnweightedUndirectedGraph();
	}

	plotUnweightedUndirectedGraph() {
		for (let row = 0; row < this.matrix.length; row++) {
			for (let col = 0; col < this.matrix[row].length; col++) {
				let offset_x = Math.floor(Math.random() * (10 - -10 + 1) + -10);
				let offset_y = Math.floor(Math.random() * (10 - -10 + 1) + -10);
				let x = this.cell_size * row + this.cell_size / 2 + offset_x;
				let y = this.cell_size * col + this.cell_size / 2 + offset_y;

				this.matrix[row][col].x = x;
				this.matrix[row][col].y = y;
				this.matrix[row][col].r = this.radius;
				this.graph[this.matrix[row][col].val] = this.matrix[row][col];

				this.ctx.beginPath();
				this.ctx.fillStyle = '#D2E9E9';
				this.ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
				this.ctx.fill();
				this.ctx.closePath();

				this.ctx.beginPath();
				this.ctx.fillStyle = '#010101';
				this.ctx.font = '12px monospace';
				this.ctx.textAlign = 'center';
				this.ctx.fillText(String(this.matrix[row][col].val), x, y + 3);
				this.ctx.closePath();
			}
		}

		for (let [from, to] of this.dataset) {
			let p1 = this.graph[from];
			let p2 = this.graph[to];

			let dist_ratio = Maths.calc_dist_ratio(this.radius, p1, p2);

			let p1_edge = Maths.calc_point_on_line(p1, p2, dist_ratio);
			let p2_edge = Maths.calc_point_on_line(p2, p1, dist_ratio);

			this.edges.push(
				Edge.bind(this)(Maths.calc_points_on_line(p1_edge, p2_edge, this.steps))
			);
		}
		this.animate_edges.bind(this);
		this.animate_edges();
	}

	plotWeightedUndirectedGraph() {
		for (let row = 0; row < this.matrix.length; row++) {
			for (let col = 0; col < this.matrix[row].length; col++) {
				let offset_x = Math.floor(Math.random() * (10 - -10 + 1) + -10);
				let offset_y = Math.floor(Math.random() * (10 - -10 + 1) + -10);
				let x = this.cell_size * row + this.cell_size / 2 + offset_x;
				let y = this.cell_size * col + this.cell_size / 2 + offset_y;

				this.matrix[row][col].x = x;
				this.matrix[row][col].y = y;
				this.matrix[row][col].r = this.radius;
				this.graph[this.matrix[row][col].val] = this.matrix[row][col];

				this.ctx.beginPath();
				this.ctx.fillStyle = '#D2E9E9';
				this.ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
				this.ctx.fill();
				this.ctx.closePath();

				this.ctx.beginPath();
				this.ctx.fillStyle = '#010101';
				this.ctx.font = '12px monospace';
				this.ctx.textAlign = 'center';
				this.ctx.fillText(String(this.matrix[row][col].val), x, y + 3);
				this.ctx.closePath();
			}
		}

		for (let [, from, to] of this.dataset) {
			let p1 = this.graph[from];
			let p2 = this.graph[to];
			let key_to = from + '_' + to;
			let key_from = to + '_' + from;

			if (
				this.weights[key_to].length == 0 &&
				this.weights[key_from].length == 0
			) {
				continue;
			}

			let dist_ratio = Maths.calc_dist_ratio(this.radius, p1, p2);

			let p1_edge = Maths.calc_point_on_line(p1, p2, dist_ratio);
			let p2_edge = Maths.calc_point_on_line(p2, p1, dist_ratio);

			let mid_point = Maths.calc_midpoint(p1, p2);

			let edge_label = this.format_edge_label(key_to, key_from);

			let slope = Maths.calc_slope(p1, p2);

			let [label_x_offset, label_y_offset] = this.calc_label_offsets(
				slope,
				edge_label
			);

			this.edges.push(
				Edge.bind(this)(Maths.calc_points_on_line(p1_edge, p2_edge, this.steps))
			);

			this.ctx.beginPath();
			this.ctx.fillStyle = '#CCCCCC';
			this.ctx.font = '10px monospace';
			this.ctx.textAlign = 'center';
			this.ctx.fillText(
				edge_label,
				mid_point.x + label_x_offset,
				mid_point.y + label_y_offset
			);
			this.ctx.closePath();
		}
		this.animate_edges.bind(this);
		this.animate_edges();
	}

	format_edge_label(key_to, key_from) {
		let text = '';
		if (this.weights[key_to] || this.weights[key_from]) {
			if (this.weights[key_to].length) {
				text = this.weights[key_to].sort((a, b) => a - b).join(', ');
			} else if (this.weights[key_from].length) {
				text = this.weights[key_from].sort((a, b) => b - a).join(',');
			}
			this.weights[key_to] = [];
			this.weights[key_from] = [];
		}
		return text;
	}

	calc_label_offsets(slope, edge_label) {
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

	animate_edges() {
		let { value: p, done } = this.edges[this.current_edge].next();
		if (done == true) {
			cancelAnimationFrame(this.animation_frame_id);
			this.ctx.closePath();
			this.current_edge += 1;

			if (this.current_edge < this.edges.length)
				this.animation_frame_id = requestAnimationFrame(
					this.animate_edges.bind(this)
				);
			return;
		}

		this.animation_frame_id = requestAnimationFrame(
			this.animate_edges.bind(this)
		);

		this.ctx.beginPath();
		this.ctx.strokeStyle = '#cccccc';
		this.ctx.moveTo(p.p1.x, p.p1.y);
		this.ctx.lineTo(p.p2.x, p.p2.y);
		this.ctx.stroke();
	}
}

export { Graph };
