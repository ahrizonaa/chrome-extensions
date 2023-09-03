const InputTypes = {
	graph: {
		adjacency_list: 'graph_adjacency_list',
		weighted_adjacency_list: 'graph_weighted_adjacency_list',
		adjacency_matrix: 'graph_adjacency_matrix',
		tree_array: 'tree_array',
		stack_array: 'stack_array',
		queue_array: 'queue_array',
		linkedlist_array: 'linkedlist_array'
	}
};

const t = '\xA0\xA0\xA0\xA0';
const n = '\x0A';
const d0 = '\u2080';
const d1 = '\u2081';
const d2 = '\u2082';
const nsub = '\u2099';
const msub = '\u208B';

const InputPlaceholders = {
	graph_adjacency_list: `List of node, neighbor${n + n}e.g.,${n}[${
		n + t
	}[1, 2]${n + t}[2, 3]${n + t}[4, 2]${n}]`,
	graph_weighted_adjacency_list: `List of weight, node, neighbor${
		n + n
	}e.g.,${n}[${n + t}[2, 1, 2]${n + t}[4, 2, 3]${n + t}[1, 4, 2]${n}]`,
	graph_adjacency_matrix: `N x N matrix denoting edges between nodes${
		n + n
	}e.g.,${n}[${n + t}[0, 1, 0, 1]${n + t}[0, 1, 1, 0]${n + t}[1, 0, 0, 0]${n}]`,
	tree_array: `1D array where elements are sorted in level order traversal d${d0},d${d1},d${d1},d${d2},d${d2},d${d2},d${d2}${
		n + n
	}e.g.,${n + n}[0, 1, 1, 2, 2, 2, 2]`,
	stack_array: `1D array of length n where i${d0} is the stack bottom and i${
		nsub + msub + d1
	} is the stack top${n + n}e.g.,${n + n}[6, 5, 4, 3 ,2, 1]`,
	queue_array: `1D array of length n where i${d0} is the queue front and i${
		nsub + msub + d1
	} is the queue back${n + n}e.g.,${n + n}[1, 2, 3, 4, 5, 6]`,
	linkedlist_array: `1D array of length n where i${d0} is the list head and i${
		nsub + msub + d1
	} is the list tail${n + n}e.g.,${n + n}[0, 2, 4, 6, 8, 10]`
};

const CanvasBgColor = '#212529';
const EdgeColor = '#EEEEEE';
const NodeColor = '#141824';
const NodeFontSize = '16px';
const NodeFontFamily = 'monospace';
const NodeFontColor = '#EEEEEE';

export {
	InputTypes,
	InputPlaceholders,
	CanvasBgColor,
	EdgeColor,
	NodeColor,
	NodeFontSize,
	NodeFontFamily,
	NodeFontColor
};

// [[1,2],[3,4],[6,1]]
