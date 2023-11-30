import { Tab } from '../types/Tab';
import {
  AdjacencyList,
  AdjacencyMatrix,
  LinkedListArray,
  QueueArray,
  StackArray,
  TreeArray,
} from 'src/app/constants/Formats';
import {
  LinkedListArr,
  QueueArr,
  StackArr,
  TreeArr,
} from 'src/app/constants/Placeholders';

export const Tabs: Tab[] = [
  {
    title: 'Graph',
    options: {
      formats: [AdjacencyList, AdjacencyMatrix],
      toggles: {
        directed: false,
        weighted: false,
      },
    },
    examples: [
      {
        title: 'Connected Components',
        dataset: [
          [0, 1],
          [1, 2],
          [3, 4],
        ],
        options: {
          directed: false,
          weighted: false,
        },
        format: AdjacencyList,
      },
      {
        title: 'Find the Town Judge',
        dataset: [
          [1, 3],
          [2, 3],
          [3, 1],
        ],
        options: {
          directed: true,
          weighted: false,
        },
        format: AdjacencyList,
      },
      {
        title: 'If Path Exists',
        dataset: [
          [0, 1],
          [0, 2],
          [3, 5],
          [5, 4],
          [4, 3],
        ],
        options: {
          directed: false,
          weighted: false,
        },
        format: AdjacencyList,
      },
    ],
  },
  {
    title: 'Tree',
    options: {
      formats: [TreeArray],
      toggles: {
        BST: false,
        maxheap: false,
        minheap: false,
      },
    },
    examples: [
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
          1,
        ],
        options: {
          binary: false,
          minHeap: false,
          maxHeap: false,
        },
        format: TreeArray,
      },
      {
        title: 'Diameter of Binary Tree',
        dataset: [1, 2, 3, 4, 5],
        options: {
          binary: false,
          minHeap: false,
          maxHeap: false,
        },
        format: TreeArray,
      },
      {
        title: 'Symmetric Tree',
        dataset: [1, 2, 2, 3, 4, 4, 3],
        options: {
          binary: false,
          minHeap: false,
          maxHeap: false,
        },
        format: TreeArray,
      },
    ],
  },
  {
    title: 'Stack',
    options: {
      formats: [StackArray],
      toggles: {},
    },
    examples: [],
  },
  {
    title: 'Queue',
    options: {
      formats: [QueueArray],
      toggles: {},
    },
    examples: [],
  },
  {
    title: 'LinkedList',
    options: {
      formats: [LinkedListArray],
      toggles: {
        doubly: false,
      },
    },
    examples: [
      {
        title: 'Reverse Linked List',
        dataset: [1, 2, 3, 4, 5],
        options: {
          doubly: false,
        },
        format: LinkedListArray,
      },
      {
        title: 'Middle of Linked List',
        dataset: [1, 2, 3, 4, 5, 6],
        options: {
          doubly: false,
        },
        format: LinkedListArray,
      },
      {
        title: 'Delete Middle Node of Linked List',
        dataset: [1, 3, 4, 7, 1, 2, 6],
        options: {
          doubly: false,
        },
        format: LinkedListArray,
      },
    ],
  },
];
