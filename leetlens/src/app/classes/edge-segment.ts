import { RelativePoint } from './relative-point';

export class EdgeSegment {
  curr!: RelativePoint;
  next!: RelativePoint;
  first?: RelativePoint;
  last?: RelativePoint;
  done?: boolean;
}
