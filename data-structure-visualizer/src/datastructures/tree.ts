import { Maths, RelativePoint } from '../utility/math-functions';
import {
	BTreeNode,
	DataStructure,
	Edge,
	EdgeSegment
} from './base-datastructures';

class Tree extends DataStructure {
	ctx: CanvasRenderingContext2D;
	canvas: HTMLCanvasElement;
	dataset: any[];
	gridWidth: number;
	gridHeight: number;
	depthZeroIndexed: number = 0;
	cellSize: number;
	steps: number = 25;
	radius: number;
	nodelist: RelativePoint[] = [];
	edges: any[] = [];
	current_edge: number = 0;
	animation_frame_id: number = NaN;
	root: BTreeNode;

	constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
		super();
		this.ctx = ctx;
		this.canvas = canvas;
	}

	Parse(input: any[]) {
		this.dataset = input;

		if (this.dataset.length > 0) {
			this.root = new BTreeNode(this.dataset[0]);
		}

		let i = 1;

		while (i < this.dataset.length) {
			let next = this.dataset[i];
			this.AppendNode(next);
			i += 1;
		}

		this.gridHeight = this.depthZeroIndexed + 1;
		this.gridWidth = Math.pow(2, this.depthZeroIndexed);
		this.cellSize = this.canvas.width / this.gridWidth;

		this.radius = Math.max(
			Math.min(this.maxRadius, this.cellSize * 0.25),
			this.minRadius
		);
	}

	AppendNode(val: number): void {
		let queue = [this.root];
		let depth = 0;
		while (queue.length) {
			let size = queue.length;
			for (let i = 0; i < size; i++) {
				let node = queue.shift();
				if (!node) {
					continue;
				}

				if (node.left === undefined) {
					if (val === null) node.left = null;
					else {
						node.left = new BTreeNode(val);
						this.depthZeroIndexed = Math.max(depth + 1, this.depthZeroIndexed);
					}
					return;
				}
				if (node.right === undefined) {
					if (val === null) node.right = null;
					else {
						node.right = new BTreeNode(val);
						this.depthZeroIndexed = Math.max(depth + 1, this.depthZeroIndexed);
					}
					return;
				}
				queue.push(node.left);
				queue.push(node.right);
			}
			depth += 1;
		}
	}

	Plot() {
		this.ctx.fillStyle = this.canvasBgColor;
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.Draw();
	}

	Draw(): void {
		this.DrawNodesBFS();
		this.DrawEdges();
		this.AnimateEdges.bind(this);
		this.AnimateEdges();
	}

	DrawNodesBFS() {
		let queue = [this.root];
		let depth = 0;
		while (queue.length && depth <= this.depthZeroIndexed) {
			let size = queue.length;
			for (let j = 0; j < size; j++) {
				let node = queue.shift();
				if (node == null) {
					this.nodelist.push(null);
					queue.push(null);
					queue.push(null);
				} else {
					queue.push(node.left);
					queue.push(node.right);

					// plot node
					// each x has to go halfway between its respective sector
					let cell = this.canvas.width / Math.pow(2, depth);
					let start = j * cell;
					let half = start + cell / 2;
					let xr = half;
					let yr =
						this.cellSize / 2 + (this.canvas.height / this.gridHeight) * depth;

					this.nodelist.push(
						new RelativePoint(xr, yr, this.canvas.width, this.canvas.height)
					);

					this.ctx.beginPath();
					this.ctx.fillStyle = this.nodeColor;
					this.ctx.arc(xr, yr, this.radius, 0, 2 * Math.PI);
					this.ctx.fill();
					this.ctx.closePath();

					this.ctx.beginPath();
					this.ctx.fillStyle = this.nodeFontColor;
					this.ctx.font = `${this.nodeFontSize} ${this.nodeFontFamily}`;
					this.ctx.textAlign = 'center';
					this.ctx.fillText(String(node.val), xr, yr + 3);
					this.ctx.closePath();
				}
			}

			depth += 1;
		}
	}

	DrawEdges(): void {
		for (let i = 0; i < this.nodelist.length; i++) {
			if (this.nodelist[i] == null) {
				continue;
			}
			if (
				2 * i + 1 < this.nodelist.length &&
				this.nodelist[2 * i + 1] != null
			) {
				// draw left child edge
				let distRatio = Maths.DistanceRatio(
					this.radius,
					this.nodelist[i],
					this.nodelist[2 * i + 1]
				);

				let pr1_edge = Maths.FindPointOnLine(
					this.nodelist[i],
					this.nodelist[2 * i + 1],
					distRatio
				);
				let pr2_edge = Maths.FindPointOnLine(
					this.nodelist[2 * i + 1],
					this.nodelist[i],
					distRatio
				);

				this.edges.push(
					Edge.bind(this)(Maths.SegmentLine(pr1_edge, pr2_edge, this.steps))
				);
			}
			if (
				2 * i + 2 < this.nodelist.length &&
				this.nodelist[2 * i + 2] != null
			) {
				// draw right child edge
				let distRatio = Maths.DistanceRatio(
					this.radius,
					this.nodelist[i],
					this.nodelist[2 * i + 2]
				);

				let pr1_edge = Maths.FindPointOnLine(
					this.nodelist[i],
					this.nodelist[2 * i + 2],
					distRatio
				);
				let pr2_edge = Maths.FindPointOnLine(
					this.nodelist[2 * i + 2],
					this.nodelist[i],
					distRatio
				);

				this.edges.push(
					Edge.bind(this)(Maths.SegmentLine(pr1_edge, pr2_edge, this.steps))
				);
			}
		}
	}

	AnimateEdges(): void {
		let res: { done: boolean; value: EdgeSegment } =
			this.edges[this.current_edge].next();

		if (res.done == false) {
			let { curr, next } = res.value;
			this.animation_frame_id = requestAnimationFrame(
				this.AnimateEdges.bind(this)
			);

			this.ctx.beginPath();
			this.ctx.strokeStyle = this.edgeColor;
			this.ctx.moveTo(curr.x, curr.y);
			this.ctx.lineTo(next.x, next.y);
			this.ctx.stroke();
		} else if (res.done == true) {
			let { first, last } = res.value;
			cancelAnimationFrame(this.animation_frame_id);
			this.ctx.closePath();
			this.current_edge += 1;

			// if (UI.userOptions.graph.directed) {
			// 	this.plotArrowHead(last, first);
			// }

			if (this.current_edge < this.edges.length) {
				this.animation_frame_id = requestAnimationFrame(
					this.AnimateEdges.bind(this)
				);
			}
			return;
		}
	}
}

export { Tree };
