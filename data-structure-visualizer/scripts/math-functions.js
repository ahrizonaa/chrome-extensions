class RelativeCoordinate {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

const calc_points_on_line = (from, to, steps) => {
	let vertices = [];
	let dx = to.x - from.x;
	let dy = to.y - from.y;
	for (let step = 0; step < steps + 1; step++) {
		vertices.push(
			new RelativeCoordinate(
				from.x + (dx * step) / steps,
				from.y + (dy * step) / steps
			)
		);
	}
	return vertices;
};
const calc_slope = (p1, p2) => {
	return Math.abs((p2.x - p1.x) / (p2.y - p1.y));
};

const calc_dist_ratio = (dist, p1, p2) => {
	return dist / Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

const calc_point_on_line = (from, to, dist_ratio) => {
	let x = (1 - dist_ratio) * from.x + dist_ratio * to.x;
	let y = (1 - dist_ratio) * from.y + dist_ratio * to.y;
	return new RelativeCoordinate(x, y);
};

const calc_midpoint = (p1, p2) => {
	return new RelativeCoordinate((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
};

const Maths = {
	calc_point_on_line: calc_point_on_line,
	calc_points_on_line: calc_points_on_line,
	calc_slope: calc_slope,
	calc_dist_ratio: calc_dist_ratio,
	calc_midpoint: calc_midpoint
};
export { RelativeCoordinate, Maths };
