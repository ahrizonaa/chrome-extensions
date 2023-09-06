import { CanvasBgColor, EdgeColor, NodeColor, NodeFontSize, NodeFontFamily, NodeFontColor } from './options';
class TreeNode {
    constructor(val) {
        this.val = val;
        this.point = null;
        this.r = NaN;
        this.neighbors = [];
    }
}
class EdgeSegment {
}
function* Edge(arr) {
    let edge = arr;
    let first = arr[0];
    let last = arr[arr.length - 1];
    for (let curr = 0; curr < edge.length - 1; curr++) {
        let data = {
            curr: edge[curr],
            next: edge[curr + 1]
        };
        yield data;
    }
    let end = {
        first: first,
        last: last,
        done: true
    };
    return end;
}
class DataStructure {
    constructor() {
        this.canvasBgColor = CanvasBgColor;
        this.maxCellSize = 50;
        this.maxRadius = 50;
        this.edgeColor = EdgeColor;
        this.nodeColor = NodeColor;
        this.nodeFontSize = NodeFontSize;
        this.nodeFontFamily = NodeFontFamily;
        this.nodeFontColor = NodeFontColor;
    }
}
export { TreeNode, Edge, DataStructure, EdgeSegment };
