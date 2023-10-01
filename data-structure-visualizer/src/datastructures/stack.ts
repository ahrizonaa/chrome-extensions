import { RelativePoint } from '../utility/math-functions';
import { DataStructure, Edge, EdgeSegment } from './base-datastructures';

class Stack extends DataStructure {
	ctx: CanvasRenderingContext2D;
	canvas: HTMLCanvasElement;
	datasetCache: any[];
	dataset: any[];
	stackWidth: number = 100;
	stackHeight: number;
	boxWidth: number = 90;
	boxHeight: number = 40;
	steps: number = 25;
	edges: any[] = [];
	current_edge: number = 0;
	animation_frame_id: number = NaN;
	maxHeight: number = 50;
	prev: RelativePoint = new RelativePoint(0, 0, 0, 0);

	constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
		super();
		this.ctx = ctx;
		this.canvas = canvas;
	}

	Parse(input: number[]) {
		this.dataset = input.slice(0, 6);

		this.stackHeight = this.canvas.height - 100;
		console.log('parsed');
	}

	Plot() {
		console.log('plot');
		this.ctx.fillStyle = this.canvasBgColor;
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
		this.Draw();
	}

	Draw() {
		console.log('draw');
		this.DrawStack();
		this.DrawBoxes();
		this.AnimateStackPush.bind(this);
		this.AnimateStackPush();
		// this.DrawEdges();
		// this.AnimateEdges.bind(this);
		// this.AnimateEdges();
	}

	DrawStack() {
		let x = this.canvas.width / 2 - 50;
		let y = 50;
		this.ctx.strokeStyle = '#CCC';

		this.ctx.beginPath();
		this.ctx.moveTo(x, y);
		this.ctx.lineTo(x, this.stackHeight + 50);
		this.ctx.moveTo(x, this.stackHeight + 50);
		this.ctx.lineTo(x + this.stackWidth, this.stackHeight + 50);
		this.ctx.moveTo(x + this.stackWidth, this.stackHeight + 50);
		this.ctx.lineTo(x + this.stackWidth, 50);
		this.ctx.stroke();
		this.ctx.closePath();
	}

	DrawBoxes() {
		for (let i = 0; i < this.dataset.length; i++) {
			let x = this.canvas.width / 2 - 45;
			let y = this.canvas.height - (50 + (i + 1) * (this.boxHeight + 2));

			let steps = 0.02;
			let p0 = { x: 10, y: 10 };
			let p1 = { x: this.canvas.width / 2 - 45, y: 10 + (y - 10) / 4 };
			let p2 = { x: this.canvas.width / 2 - 45, y: y - (y - 10) / 4 };
			let p3 = {
				x: this.canvas.width / 2 - 45,
				y: this.canvas.height - (50 + (i + 1) * (this.boxHeight + 4)) + 2
			};

			let points: RelativePoint[] = [];

			this.ctx.moveTo(p0.x, p0.y);
			for (var j = 0; j < 1; j += steps) {
				var p = this.Bezier(j, p0, p1, p2, p3);
				points.push(
					new RelativePoint(p.x, p.y, this.canvas.width, this.canvas.height)
				);
			}

			this.edges.push(Edge.bind(this)(points));
		}
	}

	Push() {
		this.dataset.push('');

		let i = this.dataset.length - 1;

		let x = this.canvas.width / 2 - 45;
		let y = this.canvas.height - (50 + (i + 1) * (this.boxHeight + 2));

		let steps = 0.02;
		let p0 = { x: 10, y: 10 };
		let p1 = { x: this.canvas.width / 2 - 45, y: 10 + (y - 10) / 4 };
		let p2 = { x: this.canvas.width / 2 - 45, y: y - (y - 10) / 4 };
		let p3 = {
			x: this.canvas.width / 2 - 45,
			y: this.canvas.height - (50 + (i + 1) * (this.boxHeight + 4)) + 2
		};

		let points: RelativePoint[] = [];

		this.ctx.moveTo(p0.x, p0.y);
		for (var j = 0; j < 1; j += steps) {
			var p = this.Bezier(j, p0, p1, p2, p3);
			points.push(
				new RelativePoint(p.x, p.y, this.canvas.width, this.canvas.height)
			);
		}

		this.edges.push(Edge.bind(this)(points));

		this.AnimateStackPush();
	}

	Pop() {
		this.dataset.pop();
	}
	AnimateStackPush() {
		let res: { done: boolean; value: EdgeSegment } =
			this.edges[this.current_edge].next();

		if (res.done == false) {
			let { curr, next } = res.value;
			this.animation_frame_id = requestAnimationFrame(
				this.AnimateStackPush.bind(this)
			);

			this.ctx.beginPath();

			this.ctx.fillStyle = this.canvasBgColor;
			this.ctx.fillRect(
				this.prev.x - 1,
				this.prev.y - 1,
				this.boxWidth + 2,
				this.boxHeight + 2
			);

			let x = this.canvas.width / 2 - 50;
			let y = 50;
			if (true) {
				this.ctx.strokeStyle = '#CCC';

				this.ctx.beginPath();
				this.ctx.moveTo(x, y);
				this.ctx.lineTo(x, this.stackHeight + 50);
				this.ctx.stroke();
			}

			this.ctx.fillStyle = '#bad989';
			this.ctx.fillRect(curr.x, curr.y, this.boxWidth, this.boxHeight);
			this.prev = curr;

			this.ctx.closePath();
		} else if (res.done == true) {
			let { first, last } = res.value;
			cancelAnimationFrame(this.animation_frame_id);
			this.ctx.beginPath();
			this.current_edge += 1;

			this.ctx.fillStyle = this.canvasBgColor;
			this.ctx.fillRect(
				this.prev.x - 1,
				this.prev.y - 1,
				this.boxWidth + 2,
				this.boxHeight + 2
			);
			this.prev = new RelativePoint(0, 0, 0, 0);

			this.ctx.fillStyle = '#bad989';
			this.ctx.fillRect(last.x, last.y, this.boxWidth + 2, this.boxHeight + 2);

			this.ctx.beginPath();
			this.ctx.fillStyle = 'black';
			this.ctx.font = '10px monospace';
			this.ctx.textAlign = 'center';
			this.ctx.fillText(
				this.dataset[this.current_edge - 1],
				last.x + this.boxWidth / 2 - 2,
				last.y + this.boxHeight / 2 + 3
			);
			this.ctx.closePath();

			this.ctx.closePath();

			if (this.current_edge < this.edges.length) {
				this.animation_frame_id = requestAnimationFrame(
					this.AnimateStackPush.bind(this)
				);
			}
			return;
		}
	}

	Bezier(t, p0, p1, p2, p3) {
		var cX = 3 * (p1.x - p0.x),
			bX = 3 * (p2.x - p1.x) - cX,
			aX = p3.x - p0.x - cX - bX;

		var cY = 3 * (p1.y - p0.y),
			bY = 3 * (p2.y - p1.y) - cY,
			aY = p3.y - p0.y - cY - bY;

		var x = aX * Math.pow(t, 3) + bX * Math.pow(t, 2) + cX * t + p0.x;
		var y = aY * Math.pow(t, 3) + bY * Math.pow(t, 2) + cY * t + p0.y;

		return { x: x, y: y };
	}
}

export { Stack };
