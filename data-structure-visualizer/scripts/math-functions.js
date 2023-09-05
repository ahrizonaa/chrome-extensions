class RelativeCoordinate {
	constructor(xr = 0, yr = 0, w = undefined, h = undefined) {
		this.x = xr;
		this.y = yr;
		this.w = w;
		this.h = h;
	}

	static from_euclidian(xe, ye, w, h) {
		return RelativeCoordinate.euclidian_to_relative(xe, ye, w, h);
	}

	static euclidian_to_relative(xe, ye, w, h) {
		if (!w || !h) {
			console.error(
				'Cannot convert Euclidian coordiante to Relative coordiate without plane dimensions'
			);
		}
		let xr = w / 2 + xe;
		let yr = h / 2 - ye;
		return new RelativeCoordinate(xr, yr, w, h);
	}

	ToE() {
		return this.relative_to_euclidian();
	}
	relative_to_euclidian() {
		if (!this.w || !this.h) {
			console.error(
				'Cannot convert Relative coordiante to Euclidian coordinate without plane dimensions'
			);
			return;
		} else {
			return EuclidianCoordinate.from_relative(this.x, this.y, this.w, this.h);
		}
	}
}

class EuclidianCoordinate {
	constructor(xe = 0, ye = 0, w = undefined, h = undefined) {
		this.x = xe;
		this.y = ye;
		this.w = w;
		this.h = h;
	}

	static from_relative(xr, yr, w, h) {
		return EuclidianCoordinate.relative_to_euclidian(xr, yr, w, h);
	}

	static relative_to_euclidian(xr, yr, w, h) {
		if (!w || !h) {
			console.error(
				'Cannot convert Relative coordiante to Euclidian coordinate without plane dimensions'
			);
			return;
		}
		let xe = (w / 2 - xr) * -1;
		let ye = h / 2 - yr;
		return new EuclidianCoordinate(xe, ye, w, h);
	}

	ToR() {
		return this.euclidian_to_relative();
	}
	euclidian_to_relative() {
		if (!this.w || !this.h) {
			console.error(
				'Cannot convert Euclidian coordiante to Relative coordinate without plane dimensions'
			);
			return;
		} else {
			return RelativeCoordinate.from_euclidian(this.x, this.y, this.w, this.h);
		}
	}
}

class Maths {
	static calc_points_on_line = (from, to, steps) => {
		let vertices = [];
		let dx = to.x - from.x;
		let dy = to.y - from.y;
		for (let step = 0; step < steps + 1; step++) {
			vertices.push(
				new RelativeCoordinate(
					from.x + (dx * step) / steps,
					from.y + (dy * step) / steps,
					from.w,
					from.h
				)
			);
		}
		return vertices;
	};
	static calc_relative_slope = (pr1, pr2) => {
		return Math.abs((pr2.x - pr1.x) / (pr2.y - pr1.y));
	};

	static calc_euclidian_slope = (pe1, pe2) => {
		return (pe2.y - pe1.y) / (pe2.x - pe1.x);
	};

	static calc_dist_ratio = (dist, p1, p2) => {
		return (
			dist / Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
		);
	};

	static calc_point_on_line = (from, to, dist_ratio) => {
		let x = (1 - dist_ratio) * from.x + dist_ratio * to.x;
		let y = (1 - dist_ratio) * from.y + dist_ratio * to.y;
		return new RelativeCoordinate(x, y, from.w, from.h);
	};

	static calc_midpoint = (pr1, pr2) => {
		return new RelativeCoordinate(
			(pr1.x + pr2.x) / 2,
			(pr1.y + pr2.y) / 2,
			pr1.w,
			pr1.h
		);
	};

	static calc_relative_direction = (slope) => {
		if (slope < 0.5) {
			// vertical
			return 'vertical';
		} else if (slope > 0.5 && slope < 1.5) {
			// diagonal
			return 'diagonal';
		} else if (slope > 3) {
			// horizontal
			return 'horizontal';
		}
	};
}

export { RelativeCoordinate, EuclidianCoordinate, Maths };
