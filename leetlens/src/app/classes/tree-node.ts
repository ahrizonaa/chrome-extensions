import { RelativePoint } from './relative-point';

export class TreeNode {
  val: number;
  point: RelativePoint;
  r: number;
  neighbors: any[];

  constructor(val: number) {
    this.val = val;
    this.point = null as any;
    this.r = NaN;
    this.neighbors = [];
  }
}
