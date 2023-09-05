import {
	CanvasBgColor,
	EdgeColor,
	NodeColor,
	NodeFontSize,
	NodeFontFamily,
	NodeFontColor
} from './constants.js';
import { Maths } from './math-functions.js';

class TreeNode {
	constructor(val) {
		this.val = val;
		this.point = null;
		this.r = NaN;
		this.neighbors = [];
	}
}

function* Edge(arr) {
	this.edge = arr;
	this.from = arr[0];
	this.to = arr[arr.length - 1];
	this.slope = Maths.calc_euclidian_slope(this.from.ToE(), this.to.ToE());

	for (let curr = 0; curr < this.edge.length - 1; curr++) {
		yield {
			p1: this.edge[curr],
			p2: this.edge[curr + 1],
			i: curr
		};
	}
	return {
		p: this.edge[this.edge.length - 1],
		slope: this.slope,
		from: this.from,
		to: this.to,
		done: true
	};
}

class DataStructure {
	canvasBgColor = CanvasBgColor;
	maxCellSize = 50;
	maxRadius = 50;
	edgeColor = EdgeColor;
	nodeColor = NodeColor;
	nodeFontSize = NodeFontSize;
	nodeFontFamily = NodeFontFamily;
	nodeFontColor = NodeFontColor;
}

export { TreeNode, Edge, DataStructure };
