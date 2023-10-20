const examples = {
	graph: [
		{
			title: 'Connected Components',
			dataset: [
				[0, 1],
				[1, 2],
				[3, 4]
			],
			options: {
				directed: false,
				weighted: false
			}
		},
		{
			title: 'Find the Town Judge',
			dataset: [
				[1, 3],
				[2, 3],
				[3, 1]
			],
			options: {
				directed: true,
				weighted: false
			}
		},
		{
			title: 'If Path Exists',
			dataset: [
				[0, 1],
				[0, 2],
				[3, 5],
				[5, 4],
				[4, 3]
			],
			options: {
				directed: false,
				weighted: false
			}
		}
	],
	tree: [
		{
			title: 'Longest ZigZag Path',
			dataset: [
				1,
				null,
				1,
				1,
				1,
				null,
				null,
				1,
				1,
				null,
				1,
				null,
				null,
				null,
				1
			],
			options: {
				binary: false,
				minHeap: false,
				maxHeap: false
			}
		},
		{
			title: 'Diameter of Binary Tree',
			dataset: [1, 2, 3, 4, 5],
			options: {
				binary: false,
				minHeap: false,
				maxHeap: false
			}
		},
		{
			title: 'Symmetric Tree',
			dataset: [1, 2, 2, 3, 4, 4, 3],
			options: {
				binary: false,
				minHeap: false,
				maxHeap: false
			}
		}
	],
	stack: [],
	queue: [],
	linkedlist: [
		{
			title: 'Reverse Linked List',
			dataset: [1, 2, 3, 4, 5],
			options: {
				doubly: false
			}
		},
		{
			title: 'Middle of Linked List',
			dataset: [1, 2, 3, 4, 5, 6],
			options: {
				doubly: false
			}
		},
		{
			title: 'Delete Middle Node of Linked List',
			dataset: [1, 3, 4, 7, 1, 2, 6],
			options: {
				doubly: false
			}
		}
	]
};

export { examples };
