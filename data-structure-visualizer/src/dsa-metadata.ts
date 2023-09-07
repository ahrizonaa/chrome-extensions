import {
	g_al_uw,
	g_al_w,
	g_am_uw,
	l_a,
	q_a,
	s_a,
	t_a
} from './dsa-input-description';

class DataStructureRepresentation {
	name: string;
	desc: string;
	placeholder: string;
	placeholder2?: string;

	constructor(
		name: string,
		desc: string,
		placeholder: string,
		placeholder2: string = undefined
	) {
		this.name = name;
		this.desc = desc;
		this.placeholder = placeholder;
		this.placeholder2 = placeholder2;
	}

	findPlaceholder(weighted: boolean | undefined): string {
		return weighted
			? this.placeholder2
				? this.placeholder2
				: this.placeholder
			: this.placeholder;
	}
}

class DataStructureRepresentations {
	graph: {
		adjacency_list: DataStructureRepresentation;
		adjacency_matrix: DataStructureRepresentation;
	};
	tree: {
		tree_array: DataStructureRepresentation;
	};
	stack: {
		stack_array: DataStructureRepresentation;
	};
	queue: {
		queue_array: DataStructureRepresentation;
	};
	linkedlist: {
		linkedlist_array: DataStructureRepresentation;
	};

	constructor() {
		this.setDefaults();
	}

	setDefaults(): void {
		this.graph = {
			adjacency_list: new DataStructureRepresentation(
				'adjacency_list',
				'Adjacency List',
				g_al_uw,
				g_al_w
			),
			adjacency_matrix: new DataStructureRepresentation(
				'adjacency_matrix',
				'Adjacency Matrix',
				g_am_uw
			)
		};
		this.tree = {
			tree_array: new DataStructureRepresentation('tree_array', 'Array', t_a)
		};
		this.stack = {
			stack_array: new DataStructureRepresentation('stack_array', 'Array', s_a)
		};
		this.queue = {
			queue_array: new DataStructureRepresentation('queue_array', 'Array', q_a)
		};
		this.linkedlist = {
			linkedlist_array: new DataStructureRepresentation(
				'linkedlist_array',
				'Array',
				l_a
			)
		};
	}
}

class GraphOptions {
	directed: boolean;
	weighted: boolean;
}
class TreeOptions {
	binary: boolean;
	nary: boolean;
	nulls: boolean;
}
class StackOptions {}
class QueueOptions {}
class LinkedListOptions {
	doubly: boolean;
}

class DataStructureOptions {
	graph: GraphOptions;
	tree: TreeOptions;
	stack: StackOptions;
	queue: QueueOptions;
	linkedlist: LinkedListOptions;
}

class CanvasAesthetics {
	CanvasBgColor: string = '#212529';
	EdgeColor: string = '#EEEEEE';
	NodeColor: string = '#141824';
	NodeFontSize: string = '16px';
	NodeFontFamily: string = 'monospace';
	NodeFontColor: string = '#EEEEEE';
	ArrowheadSize: number = 10;

	constructor() {}
}

const DSA: DataStructureRepresentations = new DataStructureRepresentations();
const Aesthetics: CanvasAesthetics = new CanvasAesthetics();

export { DSA, Aesthetics, DataStructureOptions, DataStructureRepresentations };

// [[1,2],[3,4],[6,1]]
