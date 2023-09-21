import { DataStructure } from './base-datastructures';

class Tree extends DataStructure {
	ctx: CanvasRenderingContext2D;
	canvas: HTMLCanvasElement;
	dataset: any[];
	gridWidth: number;
	gridHeight: number;
	depthZeroIndexed: number;
	cellSize: number;
	radius: number;
	constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
		super();
		this.ctx = ctx;
		this.canvas = canvas;
	}

	parse(input: any[]) {
		this.dataset = input;
		this.depthZeroIndexed = Math.floor(Math.log2(this.dataset.length));
		this.gridHeight = this.depthZeroIndexed + 1;
		this.gridWidth = Math.pow(2, this.depthZeroIndexed);
		this.cellSize = this.canvas.width / this.gridWidth;

		this.radius = Math.min(this.maxRadius, this.cellSize * 0.25);
	}

	plot() {
		let currDepth = 0;

		while (currDepth <= this.depthZeroIndexed) {}
	}
}

export { Tree };
