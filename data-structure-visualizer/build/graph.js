import { TreeNode, Edge, DataStructure } from './base-datastructures';
import { Maths, RelativePoint } from './math-functions.js';
import { DSA, Aesthetics } from './dsa-metadata';
import { UI } from './ui.service';
class Graph extends DataStructure {
    constructor(ctx, canvas) {
        super();
        this.dataset = [];
        this.matrix = [];
        this.graph = {};
        this.weights = [];
        this.edgelist = [];
        this.unique_nodes = new Set();
        this.node_list = [];
        this.edges = [];
        this.radius = NaN;
        this.cell_size = NaN;
        this.grid_size = NaN;
        this.steps = 50;
        this.current_edge = 0;
        this.animation_frame_id = NaN;
        this.ctx = ctx;
        this.canvas = canvas;
    }
    parse(input_dataset) {
        this.dataset = input_dataset;
        switch (UI.userSelection.dsaFormat) {
            case DSA.graph.adjacency_list.name:
                if (UI.userOptions.graph.weighted) {
                    this.parse_weighted_adjacency_list();
                }
                else {
                    this.parse_adjacency_list();
                }
                break;
            case DSA.graph.adjacency_matrix.name:
                this.parse_undirected_unweighted_adjacency_matrix();
                break;
            default:
                break;
        }
        this.cell_size = this.canvas.width / this.grid_size;
        this.radius = Math.min(this.maxRadius, this.cell_size * 0.25);
    }
    parse_adjacency_list() {
        this.unique_nodes = new Set(this.dataset.flatMap((edge) => edge));
        this.node_list = Array.from(this.unique_nodes.values()).sort((a, b) => a - b);
        this.edgelist = this.dataset;
        this.grid_size = Math.ceil(Math.sqrt(this.unique_nodes.size));
        for (let i = 0; i < this.grid_size; i++) {
            this.matrix.push(this.node_list
                .slice(i * this.grid_size, i * this.grid_size + this.grid_size)
                .map((node) => new TreeNode(node)));
        }
    }
    parse_weighted_adjacency_list() {
        this.unique_nodes = new Set(this.dataset.flatMap((edge) => edge.slice(1)));
        this.node_list = Array.from(this.unique_nodes.values()).sort((a, b) => a - b);
        this.grid_size = Math.ceil(Math.sqrt(this.unique_nodes.size));
        for (let i = 0; i < this.grid_size; i++) {
            this.matrix.push(this.node_list
                .slice(i * this.grid_size, i * this.grid_size + this.grid_size)
                .map((node) => new TreeNode(node)));
        }
        for (let edge of this.dataset) {
            let key = edge[1] + '_' + edge[2];
            let key_reverse = edge[2] + '_' + edge[1];
            if (key in this.weights) {
                this.weights[key].push(edge[0]);
            }
            else if (key_reverse in this.weights) {
                this.weights[key_reverse].push(edge[0]);
            }
            else {
                this.weights[key] = [edge[0]];
            }
        }
    }
    parse_undirected_unweighted_adjacency_matrix() {
        this.node_list = Array.from(Array(this.dataset.length).keys()).map((n) => n + 1);
        this.unique_nodes = new Set(this.node_list);
        this.grid_size = Math.ceil(Math.sqrt(this.unique_nodes.size));
        for (let row = 0; row < this.dataset.length; row++) {
            for (let col = row + 1; col < this.dataset.length; col++) {
                if (this.dataset[row][col] == 1) {
                    this.edgelist.push([row + 1, col + 1]);
                }
            }
        }
        for (let i = 0; i < this.grid_size; i++) {
            this.matrix.push(this.node_list
                .slice(i * this.grid_size, i * this.grid_size + this.grid_size)
                .map((node) => new TreeNode(node)));
        }
    }
    plot() {
        this.ctx.fillStyle = this.canvasBgColor;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.plotGraph();
    }
    plotNodes() {
        for (let row = 0; row < this.matrix.length; row++) {
            for (let col = 0; col < this.matrix[row].length; col++) {
                let offset_x = Math.floor(Math.random() * (10 - -10 + 1) + -10);
                let offset_y = Math.floor(Math.random() * (10 - -10 + 1) + -10);
                let xr = this.cell_size * row + this.cell_size / 2 + offset_x;
                let yr = this.cell_size * col + this.cell_size / 2 + offset_y;
                this.matrix[row][col].point = new RelativePoint(xr, yr, this.canvas.width, this.canvas.height);
                this.matrix[row][col].r = this.radius;
                this.graph[this.matrix[row][col].val] = this.matrix[row][col];
                this.ctx.beginPath();
                this.ctx.fillStyle = this.nodeColor;
                this.ctx.arc(xr, yr, this.radius, 0, 2 * Math.PI);
                this.ctx.fill();
                this.ctx.closePath();
                this.ctx.beginPath();
                this.ctx.fillStyle = this.nodeFontColor;
                this.ctx.font = `${this.nodeFontSize} ${this.nodeFontFamily}`;
                this.ctx.textAlign = 'center';
                this.ctx.fillText(String(this.matrix[row][col].val), xr, yr + 3);
                this.ctx.closePath();
            }
        }
    }
    plotEdges() {
        let edgelist = UI.userOptions.graph.weighted
            ? this.dataset.map((edge) => edge.slice(1))
            : this.dataset;
        for (let [from, to] of edgelist) {
            let node1 = this.graph[from];
            let node2 = this.graph[to];
            let key_to = from + '_' + to;
            let key_from = to + '_' + from;
            if (UI.userOptions.graph.weighted &&
                this.weights[key_to].length == 0 &&
                this.weights[key_from].length == 0) {
                continue;
            }
            let dist_ratio = Maths.DistanceRatio(this.radius, node1.point, node2.point);
            let pr1_edge = Maths.FindPointOnLine(node1.point, node2.point, dist_ratio);
            let pr2_edge = Maths.FindPointOnLine(node2.point, node1.point, dist_ratio);
            this.edges.push(Edge.bind(this)(Maths.SegmentLine(pr1_edge, pr2_edge, this.steps)));
            if (UI.userOptions.graph.weighted) {
                this.plotEdgeLabel(node1, node2, key_from, key_to);
            }
        }
    }
    plotEdgeLabel(node1, node2, key_from, key_to) {
        let mid_point = Maths.Midpoint(node1.point, node2.point);
        let edge_label = this.format_edge_label(key_to, key_from);
        let slope = Maths.RelativeSlope(node1.point, node2.point);
        let [label_x_offset, label_y_offset] = this.calc_label_offsets(slope, edge_label);
        this.ctx.beginPath();
        this.ctx.fillStyle = '#CCCCCC';
        this.ctx.font = '10px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(edge_label, mid_point.x + label_x_offset, mid_point.y + label_y_offset);
        this.ctx.closePath();
    }
    plotGraph() {
        this.plotNodes();
        this.plotEdges();
        this.animate_edges.bind(this);
        this.animate_edges();
    }
    format_edge_label(key_to, key_from) {
        let text = '';
        if (this.weights[key_to] || this.weights[key_from]) {
            if (this.weights[key_to].length) {
                text = this.weights[key_to].sort((a, b) => a - b).join(', ');
            }
            else if (this.weights[key_from].length) {
                text = this.weights[key_from].sort((a, b) => b - a).join(',');
            }
            this.weights[key_to] = [];
            this.weights[key_from] = [];
        }
        return text;
    }
    calc_label_offsets(slope, edge_label) {
        let text_x_offset = 0;
        let text_y_offset = 0;
        if (slope < 0.5) {
            // vertical
            text_x_offset = edge_label.length > 1 ? -(edge_label.length + 10) : -6;
        }
        else if (slope > 0.5 && slope < 1.5) {
            // diagonal
            text_x_offset = edge_label.length > 1 ? -(edge_label.length + 10) : -6;
        }
        else if (slope > 3) {
            // horizontal
            text_y_offset = -3;
        }
        return [text_x_offset, text_y_offset];
    }
    animate_edges() {
        let res = this.edges[this.current_edge].next();
        if (res.done == false) {
            let { curr, next } = res.value;
            this.animation_frame_id = requestAnimationFrame(this.animate_edges.bind(this));
            this.ctx.beginPath();
            this.ctx.strokeStyle = this.edgeColor;
            this.ctx.moveTo(curr.x, curr.y);
            this.ctx.lineTo(next.x, next.y);
            this.ctx.stroke();
        }
        else if (res.done == true) {
            let { first, last } = res.value;
            cancelAnimationFrame(this.animation_frame_id);
            this.ctx.closePath();
            this.current_edge += 1;
            if (UI.userOptions.graph.directed) {
                this.plotArrowHead(last, first);
            }
            if (this.current_edge < this.edges.length) {
                this.animation_frame_id = requestAnimationFrame(this.animate_edges.bind(this));
            }
            return;
        }
    }
    plotArrowHead(last, first) {
        let centerPoint = last.ToCartesian();
        let a = 30;
        let slope = Maths.CartesianSlope(first.ToCartesian(), last.ToCartesian());
        let xt1 = centerPoint.x +
            Aesthetics.ArrowheadSize *
                Math.cos(Math.atan(slope) - a * (Math.PI / 180));
        let yt1 = centerPoint.y +
            Aesthetics.ArrowheadSize *
                Math.sin(Math.atan(slope) - a * (Math.PI / 180));
        let targetPoint1 = RelativePoint.FromCartesian(xt1, yt1, last.w, last.h);
        let xt2 = centerPoint.x +
            Aesthetics.ArrowheadSize *
                Math.cos(Math.atan(slope) + a * (Math.PI / 180));
        let yt2 = centerPoint.y +
            Aesthetics.ArrowheadSize *
                Math.sin(Math.atan(slope) + a * (Math.PI / 180));
        let targetPoint2 = RelativePoint.FromCartesian(xt2, yt2, last.w, last.h);
        let distRatio = Maths.DistanceRatio(Aesthetics.ArrowheadSize, last, targetPoint1);
        let pr1_edge = Maths.FindPointOnLine(last, targetPoint1, distRatio);
        let pr2_edge = Maths.FindPointOnLine(last, targetPoint2, distRatio);
        let vx = centerPoint.x - pr1_edge.ToCartesian().x;
        let vy = centerPoint.y - pr1_edge.ToCartesian().y;
        let len = Math.sqrt(vx * vx + vy * vy);
        let cx = (vx / len) * Aesthetics.ArrowheadSize + centerPoint.x;
        let cy = (vy / len) * Aesthetics.ArrowheadSize + centerPoint.y;
        let vx2 = centerPoint.x - pr2_edge.ToCartesian().x;
        let vy2 = centerPoint.y - pr2_edge.ToCartesian().y;
        let len2 = Math.sqrt(vx2 * vx2 + vy2 * vy2);
        let cx2 = (vx2 / len2) * Aesthetics.ArrowheadSize + centerPoint.x;
        let cy2 = (vy2 / len2) * Aesthetics.ArrowheadSize + centerPoint.y;
        let cr1 = RelativePoint.FromCartesian(cx, cy, this.canvas.width, this.canvas.height);
        let cr2 = RelativePoint.FromCartesian(cx2, cy2, this.canvas.width, this.canvas.height);
        let dp1 = null, dp2 = null;
        if (last.y - first.y > 0) {
            //downwards
            if (Math.min(cr1.y, cr2.y) < Math.min(pr1_edge.y, pr2_edge.y)) {
                dp1 = cr1;
                dp2 = cr2;
            }
            else {
                dp1 = pr1_edge;
                dp2 = pr2_edge;
            }
        }
        else if (last.y - first.y < 0) {
            // upwards
            if (Math.max(cr1.y, cr2.y) > Math.max(pr1_edge.y, pr2_edge.y)) {
                dp1 = cr1;
                dp2 = cr2;
            }
            else {
                dp1 = pr1_edge;
                dp2 = pr2_edge;
            }
        }
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.edgeColor;
        this.ctx.moveTo(last.x, last.y);
        this.ctx.lineTo(dp1.x, dp1.y);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.edgeColor;
        this.ctx.moveTo(last.x, last.y);
        this.ctx.lineTo(dp2.x, dp2.y);
        this.ctx.stroke();
    }
}
export { Graph };
