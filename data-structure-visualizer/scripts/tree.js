class Tree {
	constructor(dataset) {
		this.dataset = dataset;
	}

	calcNodeDepth(node, arr) {
		if (node == -1) return 0;
		else
			return (
				1 + max(calcNodeDepth(arr[node], node), calcNodeDepth(arr[node], node))
			);
	}
}
