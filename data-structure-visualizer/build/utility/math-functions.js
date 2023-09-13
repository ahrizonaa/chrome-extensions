class Point {
}
class RelativePoint {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    static FromCartesian(x, y, w, h) {
        if (!w || !h) {
            console.error('Cannot convert Euclidian coordiante to Relative coordiate without plane dimensions');
        }
        let xr = w / 2 + x;
        let yr = h / 2 - y;
        return new RelativePoint(xr, yr, w, h);
    }
    static FromCartesianPoint(p) {
        let xr = p.w / 2 + p.x;
        let yr = p.h / 2 - p.y;
        return new RelativePoint(xr, yr, p.w, p.h);
    }
    ToCartesian() {
        if (!this.w || !this.h) {
            console.error('Cannot convert Relative coordiante to Euclidian coordinate without plane dimensions');
            return;
        }
        let xe = (this.w / 2 - this.x) * -1;
        let ye = this.h / 2 - this.y;
        return new CartesianPoint(xe, ye, this.w, this.h);
    }
}
class CartesianPoint {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    static FromRelative(x, y, w, h) {
        if (!w || !h) {
            console.error('Cannot convert Relative coordinate to Cartesian coordinate without plane dimensions');
            return;
        }
        let xe = (w / 2 - x) * -1;
        let ye = h / 2 - y;
        return new CartesianPoint(xe, ye, w, h);
    }
    static FromRelativePoint(p) {
        let xe = p.w / 2 + p.x;
        let ye = p.h / 2 - p.y;
        return new CartesianPoint(xe, ye, p.w, p.h);
    }
    ToRelative() {
        if (!this.w || !this.h) {
            console.error('Cannot convert Cartesian coordinate to Relative coordinate without plane dimensions');
            return;
        }
        let xr = this.w / 2 + this.x;
        let yr = this.h / 2 - this.y;
        return new RelativePoint(xr, yr, this.w, this.h);
    }
}
class Maths {
}
Maths.SegmentLine = (from, to, segments) => {
    let vertices = [];
    let dx = to.x - from.x;
    let dy = to.y - from.y;
    for (let step = 0; step < segments + 1; step++) {
        vertices.push(new RelativePoint(from.x + (dx * step) / segments, from.y + (dy * step) / segments, from.w, from.h));
    }
    return vertices;
};
Maths.RelativeSlope = (p1, p2) => {
    return Math.abs((p2.x - p1.x) / (p2.y - p1.y));
};
Maths.CartesianSlope = (p1, p2) => {
    return (p2.y - p1.y) / (p2.x - p1.x);
};
Maths.DistanceRatio = (distance, p1, p2) => {
    return (distance / Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)));
};
Maths.FindPointOnLine = (from, to, dist_ratio) => {
    let x = (1 - dist_ratio) * from.x + dist_ratio * to.x;
    let y = (1 - dist_ratio) * from.y + dist_ratio * to.y;
    return new RelativePoint(x, y, from.w, from.h);
};
Maths.Midpoint = (p1, p2) => {
    return new RelativePoint((p1.x + p2.x) / 2, (p1.y + p2.y) / 2, p1.w, p1.h);
};
Maths.RelativeDirection = (slope) => {
    if (slope < 0.5) {
        // vertical
        return 'vertical';
    }
    else if (slope > 0.5 && slope < 1.5) {
        // diagonal
        return 'diagonal';
    }
    else if (slope > 3) {
        // horizontal
        return 'horizontal';
    }
};
export { RelativePoint, CartesianPoint, Maths };
//# sourceMappingURL=math-functions.js.map