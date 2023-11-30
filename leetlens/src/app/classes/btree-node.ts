import { RelativePoint } from './relative-point';

export class BTreeNode {
  val: number | null;
  point!: RelativePoint;
  r!: number;
  left!: BTreeNode | null;
  right!: BTreeNode | null;
  leftnodes: number = 0;
  rightnodes: number = 0;

  constructor(val: number | null = null) {
    this.val = val;
  }
}
