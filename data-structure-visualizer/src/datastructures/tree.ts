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
	depthZeroIndexed: number;
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
		this.depthZeroIndexed = Math.floor(Math.log2(this.dataset.length));
		this.gridHeight = this.depthZeroIndexed + 1;
		this.gridWidth = Math.pow(2, this.depthZeroIndexed);
		this.cellSize = this.canvas.width / this.gridWidth;

		this.radius = Math.max(
			Math.min(this.maxRadius, this.cellSize * 0.25),
			this.minRadius
		);

		for (let i = 0; i < this.dataset.length; i++) {
			this.BFS(this.root, this.dataset[i]);
		}
	}

	BFS(node: BTreeNode, val: number): void {
		if (!node) {
			node = new BTreeNode(val);
		}
	}

	Plot() {
		this.ctx.fillStyle = this.canvasBgColor;
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.Draw();
	}

	Draw(): void {
		this.DrawNodes();
		this.DrawEdges();
		console.log(this.edges, this.current_edge);
		this.AnimateEdges.bind(this);
		this.AnimateEdges();
	}

	DrawNodes(): void {
		let i = 0;
		for (
			let currDepth = 0;
			currDepth <= this.depthZeroIndexed && i < this.dataset.length;
			currDepth++
		) {
			for (
				let j = 0;
				j < Math.pow(2, currDepth) && i < this.dataset.length;
				j++, i++
			) {
				if (this.dataset[i] == null) {
					this.nodelist.push(null);
					continue;
				}

				while (
					this.dataset[Math.floor(i / 2)] == null &&
					j + 1 < Math.pow(2, currDepth) &&
					i + 1 < this.dataset.length
				) {
					i += 1;
					j += 1;
				}

				// each x has to go halfway between its respective sector
				let sector = this.canvas.width / Math.pow(2, currDepth);
				let start = j * sector;
				let end = start + sector;
				let half = start + (end - start) / 2;
				let xr = half;
				let yr =
					this.cellSize / 2 +
					(this.canvas.height / this.gridHeight) * currDepth;

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
				this.ctx.fillText(String(this.dataset[i]), xr, yr + 3);
				this.ctx.closePath();
			}
		}
	}

	DrawEdges(): void {
		console.log({ len: this.nodelist.length });
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
