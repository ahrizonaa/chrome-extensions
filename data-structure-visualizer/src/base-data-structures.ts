import { Aesthetics } from './dsa-metadata';
import { RelativePoint } from './math-functions';

class TreeNode {
	val: number;
	point: RelativePoint;
	r: number;
	neighbors: any[];

	constructor(val: number) {
		this.val = val;
		this.point = null;
		this.r = NaN;
		this.neighbors = [];
	}
}

class EdgeSegment {
	curr: RelativePoint;
	next: RelativePoint;
	first?: RelativePoint;
	last?: RelativePoint;
	done?: boolean;
}

function* Edge(arr: RelativePoint[]): Generator<EdgeSegment> {
	let edge: RelativePoint[] = arr;
	let first: RelativePoint = arr[0];
	let last: RelativePoint = arr[arr.length - 1];

	for (let curr = 0; curr < edge.length - 1; curr++) {
		let data: EdgeSegment = {
			curr: edge[curr],
			next: edge[curr + 1]
		};
		yield data;
	}

	let end: EdgeSegment = {
		first: first,
		last: last,
		done: true
	} as EdgeSegment;

	return end;
}

class DataStructure {
	canvasBgColor = Aesthetics.CanvasBgColor;
	maxCellSize = 50;
	maxRadius = 50;
	edgeColor = Aesthetics.EdgeColor;
	nodeColor = Aesthetics.NodeColor;
	nodeFontSize = Aesthetics.NodeFontSize;
	nodeFontFamily = Aesthetics.NodeFontFamily;
	nodeFontColor = Aesthetics.NodeFontColor;
}

export { TreeNode, Edge, DataStructure, EdgeSegment };
