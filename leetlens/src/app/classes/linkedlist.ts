import { Anime } from '../services/anime.service';
import { Mathematics } from '../services/mathematics.service';
import { UserInput } from '../services/user-input.service';
import { CartesianCoordinate } from '../types/Geometric';
import { BTreeNode } from './btree-node';
import { CartesianPoint } from './cartesian-point';
import { DataStructure, EdgeSegment } from './data-structure';
import { Edge } from './edge';
import { RelativePoint } from './relative-point';

class LinkedList extends DataStructure {
  datasetCache!: any[];
  dataset!: any[];
  gridWidth!: number;
  gridHeight!: number;
  gridMaxWidth: number = 4;
  cellSize!: number;
  steps: number = 15;
  radius!: number;
  nodelist: RelativePoint[] = [];
  edges: any[] = [];
  current_edge: number = 0;
  head!: BTreeNode;

  constructor(ui: any) {
    super(ui);
  }

  Plot() {
    this.cs.ctx.fillStyle = this.canvasBgColor;
    this.cs.ctx.fillRect(0, 0, this.cs.canvas.width, this.cs.canvas.height);
    this.Draw();
  }

  Draw() {
    this.ClearCanvas();
    this.DrawNodes();
    this.DrawEdges();
    this.AnimateEdges();
  }

  Parse(input: any[]) {
    input = this.TrimNulls(input);
    this.datasetCache = input;
    this.dataset = input;

    this.gridWidth = Math.min(this.gridMaxWidth, this.dataset.length);
    this.gridHeight = Math.ceil(this.dataset.length / this.gridWidth);

    this.cellSize = this.cs.canvas.width / this.gridWidth;

    this.radius = Math.max(
      Math.min(this.maxRadius, this.cellSize * 0.25),
      this.minRadius
    );
  }

  TrimNulls(input: number[]): number[] {
    let i = 0;
    while (input[i] === null && i < input.length) {
      i += 1;
    }

    let j = input.length - 1;
    while (input[j] === null && j >= 0) {
      j--;
    }
    return input.slice(i, j + 1);
  }

  DrawNodes() {
    for (let row = 0; row < this.gridHeight; row++) {
      for (let col = 0; col < this.gridWidth; col++) {
        let index = row * this.gridWidth + col;
        if (index >= this.dataset.length) {
          return;
        }
        let x = col * this.cellSize + this.cellSize / 2;
        if (row % 2 != 0) {
          x = this.cs.canvas.width - x;
        }
        let toppad =
          (this.cs.canvas.height - this.gridHeight * this.cellSize) / 2;
        let y = toppad + row * this.cellSize + this.cellSize / 2;

        this.nodelist.push(
          new RelativePoint(x, y, this.cs.canvas.width, this.cs.canvas.height)
        );

        this.cs.ctx.beginPath();
        this.cs.ctx.fillStyle = this.nodeColor;
        this.cs.ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
        this.cs.ctx.fill();
        this.cs.ctx.closePath();

        this.cs.ctx.beginPath();
        this.cs.ctx.fillStyle = this.nodeFontColor;
        this.cs.ctx.font = `${this.nodeFontSize} ${this.nodeFontFamily}`;
        this.cs.ctx.textAlign = 'center';
        this.cs.ctx.fillText(String(this.dataset[index]), x, y + 3);
        this.cs.ctx.closePath();
      }
    }
  }

  DrawEdges() {
    for (let i = 0; i + 1 < this.dataset.length; i++) {
      let node1 = this.nodelist[i];
      let node2 = this.nodelist[i + 1];
      let dist_ratio = this.math.DistanceRatio(this.radius, node1, node2);

      let pr1_edge = this.math.FindPointOnLine(node1, node2, dist_ratio);
      let pr2_edge = this.math.FindPointOnLine(node2, node1, dist_ratio);

      if (this.anime.enabled) {
        this.edges.push(
          Edge.bind(this)(this.math.SegmentLine(pr1_edge, pr2_edge, this.steps))
        );
      } else {
        this.cs.ctx.beginPath();
        this.cs.ctx.strokeStyle = this.edgeColor;
        this.cs.ctx.moveTo(pr1_edge.x, pr1_edge.y);
        this.cs.ctx.lineTo(pr2_edge.x, pr2_edge.y);
        this.cs.ctx.stroke();
      }
    }
  }

  AnimateEdges() {
    if (this.edges.length == 0) return;
    let res: { done: boolean; value: EdgeSegment } =
      this.edges[this.current_edge].next();

    if (res.done == false) {
      let { curr, next } = res.value;
      this.anime.Request(this.AnimateEdges.bind(this));

      this.cs.ctx.strokeStyle = this.edgeColor;
      this.cs.ctx.moveTo(curr.x, curr.y);
      this.cs.ctx.lineTo(next.x, next.y);
      this.cs.ctx.stroke();
    } else if (res.done == true) {
      let { first, last } = res.value;
      this.anime.Cancel();
      this.cs.ctx.closePath();
      this.current_edge += 1;

      this.PlotArrowHead(last as any, first as any);

      if (this.current_edge < this.edges.length) {
        this.anime.Request(this.AnimateEdges.bind(this));
      }
      return;
    }
  }

  PlotArrowHead(last: RelativePoint, first: RelativePoint) {
    let centerPoint: CartesianPoint = last.ToCartesian();

    let a = 30;

    let direction: string;
    if (last.x - first.x > 0) {
      direction = 'ltr';
    } else if (last.x - first.x < 0) {
      direction = 'rtl';
    } else {
      direction = 'down';
    }

    let x1: CartesianCoordinate;
    let y1: CartesianCoordinate;
    let x2: CartesianCoordinate;
    let y2: CartesianCoordinate;
    let blen = 8.66025;
    let alen = 5;
    if (direction == 'ltr') {
      x1 = centerPoint.x - blen;
      y1 = centerPoint.y + alen;
      x2 = x1;
      y2 = centerPoint.y - alen;
    } else if (direction == 'rtl') {
      x1 = centerPoint.x + blen;
      y1 = centerPoint.y + alen;
      x2 = x1;
      y2 = centerPoint.y - alen;
    } else if (direction == 'down') {
      x1 = centerPoint.x - alen;
      y1 = centerPoint.y + blen;
      x2 = centerPoint.x + alen;
      y2 = y1;
    }

    let leftWingPoint: RelativePoint = RelativePoint.FromCartesian(
      x1!,
      y1!,
      last.w,
      last.h
    );

    let rightWingPoint: RelativePoint = RelativePoint.FromCartesian(
      x2!,
      y2!,
      last.w,
      last.h
    );

    if (this.ui.currTab.options.toggles.Doubly) {
      // draw reverse arrow
      let centerPrev = first.ToCartesian();
      let x3, y3, x4, y4;
      if (direction == 'ltr') {
        x3 = centerPrev.x + blen;
        y3 = centerPrev.y + alen;
        x4 = x3;
        y4 = centerPrev.y - alen;
      } else if (direction == 'rtl') {
        x3 = centerPrev.x - blen;
        y3 = centerPrev.y + alen;
        x4 = x3;
        y4 = centerPrev.y - alen;
      } else if (direction == 'down') {
        x3 = centerPrev.x - alen;
        y3 = centerPrev.y - blen;
        x4 = centerPrev.x + alen;
        y4 = y3;
      }
      let start = centerPrev.ToRelative();
      let L = RelativePoint.FromCartesian(
        x3 as any,
        y3 as any,
        this.cs.canvas.width,
        this.cs.canvas.height
      );
      let R = RelativePoint.FromCartesian(
        x4 as any,
        y4 as any,
        this.cs.canvas.width,
        this.cs.canvas.height
      );
      // this.cs.ctx.beginPath();
      this.cs.ctx.strokeStyle = this.edgeColor;
      this.cs.ctx.moveTo(start.x, start.y);
      this.cs.ctx.lineTo(L.x, L.y);
      this.cs.ctx.moveTo(start.x, start.y);
      this.cs.ctx.lineTo(R.x, R.y);
      this.cs.ctx.stroke();
    }

    this.cs.ctx.strokeStyle = this.edgeColor;
    this.cs.ctx.moveTo(last.x, last.y);
    this.cs.ctx.lineTo(leftWingPoint.x, leftWingPoint.y);
    this.cs.ctx.moveTo(last.x, last.y);
    this.cs.ctx.lineTo(rightWingPoint.x, rightWingPoint.y);
    this.cs.ctx.stroke();
    this.cs.ctx.closePath();
  }
}

export { LinkedList };
