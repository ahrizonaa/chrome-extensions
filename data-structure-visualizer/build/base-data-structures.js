import { Aesthetics } from './dsa-metadata';
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
        this.canvasBgColor = Aesthetics.CanvasBgColor;
        this.maxCellSize = 50;
        this.maxRadius = 50;
        this.edgeColor = Aesthetics.EdgeColor;
        this.nodeColor = Aesthetics.NodeColor;
        this.nodeFontSize = Aesthetics.NodeFontSize;
        this.nodeFontFamily = Aesthetics.NodeFontFamily;
        this.nodeFontColor = Aesthetics.NodeFontColor;
    }
}
export { TreeNode, Edge, DataStructure, EdgeSegment };
