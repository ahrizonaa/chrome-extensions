class TreeNode {
	constructor(val, x = 0, y = 0, r = 0) {
		this.val = val;
		this.x = x;
		this.y = y;
		this.r = r;
		this.neighbors = [];
	}
}

function* Edge(arr) {
	this.edge = arr;

	for (let curr = 0; curr < this.edge.length - 1; curr++) {
		yield {
			p1: this.edge[curr],
			p2: this.edge[curr + 1],
			i: curr
		};
	}
	return { value: null, done: true };
}

export { TreeNode, Edge };
