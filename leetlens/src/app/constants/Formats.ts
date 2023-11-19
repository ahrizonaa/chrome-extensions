import { Format } from '../types/Format';
import {
  GraphListUnweighted,
  GraphMatrixUnweighted,
  LinkedListArr,
  QueueArr,
  StackArr,
  TreeArr,
} from './Placeholders';

const AdjacencyList: Format = {
  name: 'Adjacency List',
  placeholder: GraphListUnweighted,
};

const AdjacencyMatrix: Format = {
  name: 'Adjacency Matrix',
  placeholder: GraphMatrixUnweighted,
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
