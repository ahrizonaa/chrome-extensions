import { CartesianCoordinate, RelativeCoordinate } from '../types/Geometric';
import { CartesianPoint } from './cartesian-point';
import { Point } from './point';

export class RelativePoint implements Point {
  x: RelativeCoordinate;
  y: RelativeCoordinate;
  w: number;
  h: number;
  constructor(
    x: RelativeCoordinate,
    y: RelativeCoordinate,
    w: number,
    h: number
  ) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  static FromCartesian(
    x: CartesianCoordinate,
    y: CartesianCoordinate,
    w: number,
    h: number
  ): RelativePoint {
    if (!w || !h) {
      console.error(
        'Cannot convert Euclidian coordiante to Relative coordiate without plane dimensions'
      );
    }
    let xr = w / 2 + x;
    let yr = h / 2 - y;
    return new RelativePoint(xr, yr, w, h);
  }
  static FromCartesianPoint(p: CartesianPoint): RelativePoint {
    let xr = p.w / 2 + p.x;
    let yr = p.h / 2 - p.y;
    return new RelativePoint(xr, yr, p.w, p.h);
  }

  ToCartesian(): CartesianPoint {
    if (!this.w || !this.h) {
      console.error(
        'Cannot convert Relative coordiante to Euclidian coordinate without plane dimensions'
      );
      return undefined as any;
    }
    let xe = (this.w / 2 - this.x) * -1;
    let ye = this.h / 2 - this.y;
    return new CartesianPoint(xe, ye, this.w, this.h);
  }
}
