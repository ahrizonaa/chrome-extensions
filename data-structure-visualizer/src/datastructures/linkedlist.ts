import { UI } from '../ui.service';
import { Maths, RelativePoint } from '../utility/math-functions';
import {
	BTreeNode,
	DataStructure,
	Edge,
	EdgeSegment
} from './base-datastructures';

class LinkedList extends DataStructure {
	ctx: CanvasRenderingContext2D;
	canvas: HTMLCanvasElement;
	datasetCache: any[];
	dataset: any[];
	gridWidth: number;
	gridHeight: number;
	gridMaxWidth: number = 5;
	cellSize: number;
	steps: number = 25;
	radius: number;
	nodelist: RelativePoint[] = [];
	edges: any[] = [];
	current_edge: number = 0;
	animation_frame_id: number = NaN;
	head: BTreeNode;

	constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
		super();
		this.ctx = ctx;
		this.canvas = canvas;
	}

	Plot() {
		this.ctx.fillStyle = this.canvasBgColor;
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.Draw();
	}

	Draw(): void {
		this.DrawNodes();
		// this.DrawEdges();
		// this.AnimateEdges.bind(this);
		// this.AnimateEdges();
	}

	Parse(input: any[]) {
		input = this.TrimNulls(input);
		this.datasetCache = input;
		this.dataset = input;

		// this.head = this.ConstructTree(this.dataset);

		this.gridWidth = Math.min(this.gridMaxWidth, this.dataset.length);
		this.gridHeight = Math.ceil(this.dataset.length / this.gridWidth);

		this.cellSize = this.canvas.width / this.gridWidth;

		this.radius = Math.max(
			Math.min(this.maxRadius, this.cellSize * 0.25),
			this.minRadius
		);
	}

	TrimNulls(input: number[]): number[] {
		let i = 0;
		while (input[i] === null && i < input.length) {
			i += 1;
		}

		let j = input.length - 1;
		while (input[j] === null && j >= 0) {
			j--;
		}
		return input.slice(i, j + 1);
	}

	DrawNodes() {
		for (let row = 0; row < this.gridHeight; row++) {
			for (let col = 0; col < this.gridWidth; col++) {
				let x = col * this.cellSize + this.cellSize / 2;
				let toppad = (this.canvas.height - this.gridHeight * this.cellSize) / 2;
				let y = toppad + row * this.cellSize + this.cellSize / 2;

				console.log(x, y);

				this.nodelist.push(
					new RelativePoint(x, y, this.canvas.width, this.canvas.height)
				);

				this.ctx.beginPath();
				this.ctx.fillStyle = this.nodeColor;
				this.ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
				this.ctx.fill();
				this.ctx.closePath();

				this.ctx.beginPath();
				this.ctx.fillStyle = this.nodeFontColor;
				this.ctx.font = `${this.nodeFontSize} ${this.nodeFontFamily}`;
				this.ctx.textAlign = 'center';
				this.ctx.fillText(
					String(this.dataset[row * this.gridWidth + col]),
					x,
					y + 3
				);
				this.ctx.closePath();
			}
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

export { LinkedList };
