import { TreeNode, Edge, DataStructure } from './base-data-structures.js';
import {
	EuclidianCoordinate,
	Maths,
	RelativeCoordinate
} from './math-functions.js';
import { InputTypes, ArrowheadSize } from './constants.js';

class Graph extends DataStructure {
	constructor(ctx, canvas, InputOptions) {
		super();
		this.ctx = ctx;
		this.canvas = canvas;
		this.dstype = null;
		this.inputtype = '';
		this.dataset = [];
		this.matrix = [];
		this.graph = {};
		this.weights = [];
		this.edgelist = [];
		this.unique_nodes = new Set();
		this.node_list = [];
		this.edges = [];
		this.radius = NaN;
		this.cell_size = NaN;
		this.grid_size = NaN;
		this.steps = 50;
		this.current_edge = 0;
		this.animation_frame_id = NaN;
		this.InputOptions = InputOptions;
	}

	parse(input_dataset, dstype, inputtype) {
		this.dataset = input_dataset;
		this.dstype = dstype;
		this.inputtype = inputtype;
		switch (this.inputtype) {
			case InputTypes.graph.adjacency_list.name:
				if (this.InputOptions.graph.weighted) {
					this.parse_weighted_adjacency_list();
				} else {
					this.parse_adjacency_list();
				}
				break;
			case InputTypes.graph.adjacency_matrix.name:
				this.parse_undirected_unweighted_adjacency_matrix();
				break;
			default:
				break;
		}

		this.cell_size = this.canvas.width / this.grid_size;
		this.radius = Math.min(this.maxRadius, this.cell_size * 0.25);
	}

	parse_adjacency_list() {
		this.unique_nodes = new Set(this.dataset.flatMap((edge) => edge));
		this.node_list = Array.from(this.unique_nodes.values()).sort(
			(a, b) => a - b
		);
		this.edgelist = this.dataset;
		this.grid_size = Math.ceil(Math.sqrt(this.unique_nodes.size));

		for (let i = 0; i < this.grid_size; i++) {
			this.matrix.push(
				this.node_list
					.slice(i * this.grid_size, i * this.grid_size + this.grid_size)
					.map((node) => new TreeNode(node))
			);
		}
	}

	parse_weighted_adjacency_list() {
		this.unique_nodes = new Set(this.dataset.flatMap((edge) => edge.slice(1)));
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
	}

	parse_undirected_unweighted_adjacency_matrix() {
		this.node_list = Array.from(Array(this.dataset.length).keys()).map(
			(n) => n + 1
		);
		this.unique_nodes = new Set(this.node_list);

		this.grid_size = Math.ceil(Math.sqrt(this.unique_nodes.size));

		for (let row = 0; row < this.dataset.length; row++) {
			for (let col = row + 1; col < this.dataset.length; col++) {
				if (this.dataset[row][col] == 1) {
					this.edgelist.push([row + 1, col + 1]);
				}
			}
		}

		for (let i = 0; i < this.grid_size; i++) {
			this.matrix.push(
				this.node_list
					.slice(i * this.grid_size, i * this.grid_size + this.grid_size)
					.map((node) => new TreeNode(node))
			);
		}
	}

	plot() {
		this.ctx.fillStyle = this.canvasBgColor;
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		switch (this.inputtype) {
			case InputTypes.graph.adjacency_list.name:
				if (this.InputOptions.graph.weighted) {
					this.plotWeightedUndirectedGraph();
				} else {
					this.plotUnweightedUndirectedGraph();
				}
				break;
			case InputTypes.graph.adjacency_matrix.name:
				this.plotUnweightedUndirectedGraph();
				break;
			default:
				break;
		}
	}

	plot_nodes() {
		for (let row = 0; row < this.matrix.length; row++) {
			for (let col = 0; col < this.matrix[row].length; col++) {
				let offset_x = Math.floor(Math.random() * (10 - -10 + 1) + -10);
				let offset_y = Math.floor(Math.random() * (10 - -10 + 1) + -10);
				let xr = this.cell_size * row + this.cell_size / 2 + offset_x;
				let yr = this.cell_size * col + this.cell_size / 2 + offset_y;

				this.matrix[row][col].point = new RelativeCoordinate(
					xr,
					yr,
					this.canvas.width,
					this.canvas.height
				);
				this.matrix[row][col].r = this.radius;
				this.graph[this.matrix[row][col].val] = this.matrix[row][col];

				this.ctx.beginPath();
				this.ctx.fillStyle = this.nodeColor;
				this.ctx.arc(xr, yr, this.radius, 0, 2 * Math.PI);
				this.ctx.fill();
				this.ctx.closePath();

				this.ctx.beginPath();
				this.ctx.fillStyle = this.nodeFontColor;
				this.ctx.font = `${this.nodeFontSize} ${this.nodeFontFamily}`;
				this.ctx.textAlign = 'center';
				this.ctx.fillText(String(this.matrix[row][col].val), xr, yr + 3);
				this.ctx.closePath();
			}
		}
	}

	plotUnweightedUndirectedGraph() {
		this.plot_nodes();

		for (let [from, to] of this.edgelist) {
			let node1 = this.graph[from];
			let node2 = this.graph[to];

			let dist_ratio = Maths.calc_dist_ratio(
				this.radius,
				node1.point,
				node2.point
			);

			let pr1_edge = Maths.calc_point_on_line(
				node1.point,
				node2.point,
				dist_ratio
			);
			let pr2_edge = Maths.calc_point_on_line(
				node2.point,
				node1.point,
				dist_ratio
			);

			this.edges.push(
				Edge.bind(this)(
					Maths.calc_points_on_line(pr1_edge, pr2_edge, this.steps)
				)
			);
		}
		this.animate_edges.bind(this);
		this.animate_edges();
	}

	plotWeightedUndirectedGraph() {
		this.plot_nodes();

		for (let [, from, to] of this.dataset) {
			let node1 = this.graph[from];
			let node2 = this.graph[to];
			let key_to = from + '_' + to;
			let key_from = to + '_' + from;

			if (
				this.weights[key_to].length == 0 &&
				this.weights[key_from].length == 0
			) {
				continue;
			}

			let dist_ratio = Maths.calc_dist_ratio(
				this.radius,
				node1.point,
				node2.point
			);

			let pr1_edge = Maths.calc_point_on_line(
				node1.point,
				node2.point,
				dist_ratio
			);
			let pr2_edge = Maths.calc_point_on_line(
				node2.point,
				node1.point,
				dist_ratio
			);

			let mid_point = Maths.calc_midpoint(node1.point, node2.point);

			let edge_label = this.format_edge_label(key_to, key_from);

			let slope = Maths.calc_relative_slope(node1.point, node2.point);

			let [label_x_offset, label_y_offset] = this.calc_label_offsets(
				slope,
				edge_label
			);

			this.edges.push(
				Edge.bind(this)(
					Maths.calc_points_on_line(pr1_edge, pr2_edge, this.steps)
				)
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
		let res = this.edges[this.current_edge].next();
		let pr = res.value;
		if (res.done == true) {
			let { p: pr, slope, from, to } = res.value;
			console.log({ from, to });
			cancelAnimationFrame(this.animation_frame_id);
			this.ctx.closePath();
			this.current_edge += 1;

			let pe = pr.ToE();

			let a = 150;

			let xe2 =
				pe.x + ArrowheadSize * Math.cos(Math.atan(slope) - a * (Math.PI / 180));
			let ye2 =
				pe.y + ArrowheadSize * Math.sin(Math.atan(slope) - a * (Math.PI / 180));

			console.group('euclid');
			console.log(xe2, ye2);

			let pr2 = RelativeCoordinate.from_euclidian(
				xe2,
				ye2,
				this.canvas.width,
				this.canvas.height
			);

			console.log(pr2.x, pr2.y);
			console.groupEnd();

			let xe3 =
				pe.x + ArrowheadSize * Math.cos(Math.atan(slope) + a * (Math.PI / 180));
			let ye3 =
				pe.y + ArrowheadSize * Math.sin(Math.atan(slope) + a * (Math.PI / 180));

			let pr3 = RelativeCoordinate.from_euclidian(
				xe3,
				ye3,
				this.canvas.width,
				this.canvas.height
			);

			let dist_ratio = Maths.calc_dist_ratio(ArrowheadSize, pr, pr2);

			let pr1_edge = Maths.calc_point_on_line(pr, pr2, dist_ratio);

			let pr2_edge = Maths.calc_point_on_line(pr, pr3, dist_ratio);

			let log = {
				dr: dist_ratio,
				edge: this.current_edge,
				slope: slope,
				p1: { x: pr.x, y: pr.y },
				dest1: {
					p2: { x: pr2.x, y: pr2.y },
					p3: { x: pr3.x, y: pr3.y }
				},
				dest2: {
					p2: { x: pr1_edge.x, y: pr1_edge.y },
					p3: { x: pr2_edge.x, y: pr2_edge.y }
				}
			};

			console.group('edge ' + this.current_edge);

			console.log(log);

			let dp1 = null,
				dp2 = null;

			if (to.y - from.y > 0) {
				//downwards
				console.log('down');
				// want set of points with lesser y value
				if (Math.min(pr2.y, pr3.y) < Math.min(pr1_edge.y, pr2_edge.y)) {
					console.log('chose original');
					dp1 = pr2;
					dp2 = pr3;
				} else {
					console.log('chose new');
					dp1 = pr1_edge;
					dp2 = pr2_edge;
				}
			} else if (to.y - from.y < 0) {
				// upwards
				console.log('up');
				// want set of points with greater y value
				if (Math.max(pr2.y, pr3.y) > Math.max(pr1_edge.y, pr2_edge.y)) {
					console.log('chose original');
					dp1 = pr2;
					dp2 = pr3;
				} else {
					console.log('chose new');
					dp1 = pr1_edge;
					dp2 = pr2_edge;
				}
			}

			console.log(dp1, dp2);
			console.groupEnd();

			dp1 = pr2;
			dp2 = pr3;

			this.ctx.beginPath();
			this.ctx.strokeStyle = this.edgeColor;
			this.ctx.moveTo(pr.x, pr.y);
			this.ctx.lineTo(dp1.x, dp1.y);
			this.ctx.stroke();
			this.ctx.closePath();

			this.ctx.beginPath();
			this.ctx.strokeStyle = this.edgeColor;
			this.ctx.moveTo(pr.x, pr.y);
			this.ctx.lineTo(dp2.x, dp2.y);
			this.ctx.stroke();

			if (this.current_edge < this.edges.length) {
				this.animation_frame_id = requestAnimationFrame(
					this.animate_edges.bind(this)
				);
			}
			return;
		}

		this.animation_frame_id = requestAnimationFrame(
			this.animate_edges.bind(this)
		);

		this.ctx.beginPath();
		this.ctx.strokeStyle = this.edgeColor;
		this.ctx.moveTo(pr.p1.x, pr.p1.y);
		this.ctx.lineTo(pr.p2.x, pr.p2.y);
		this.ctx.stroke();
	}
}

export { Graph };
