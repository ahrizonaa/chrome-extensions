import { EdgeSegment } from './edge-segment';
import { RelativePoint } from './relative-point';

export function* Edge(arr: RelativePoint[]): Generator<EdgeSegment> {
  let edge: RelativePoint[] = arr;
  let first: RelativePoint = arr[0];
  let last: RelativePoint = arr[arr.length - 1];

  for (let curr = 0; curr < edge.length - 1; curr++) {
    let data: EdgeSegment = {
      curr: edge[curr],
      next: edge[curr + 1],
    };
    yield data;
  }

  let end: EdgeSegment = {
    first: first,
    last: last,
    done: true,
  } as EdgeSegment;

  return end;
}
