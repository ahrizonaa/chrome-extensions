import { Format } from '../types/Format';
import {
  GraphListUnWeighted,
  GraphMatrixUnWeighted,
  LinkedListArr,
  QueueArr,
  StackArr,
  TreeArr,
} from './Placeholders';

const AdjacencyList: Format = {
  name: 'Adjacency List',
  placeholder: GraphListUnWeighted,
};

const AdjacencyMatrix: Format = {
  name: 'Adjacency Matrix',
  placeholder: GraphMatrixUnWeighted,
};

const TreeArray: Format = {
  name: 'Tree Array',
  placeholder: TreeArr,
};

const StackArray: Format = {
  name: 'Stack Array',
  placeholder: StackArr,
};

const QueueArray: Format = {
  name: 'Queue Array',
  placeholder: QueueArr,
};

const LinkedListArray: Format = {
  name: 'LinkedList Array',
  placeholder: LinkedListArr,
};

export {
  AdjacencyList,
  AdjacencyMatrix,
  TreeArray,
  StackArray,
  QueueArray,
  LinkedListArray,
};
