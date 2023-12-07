import { FloatingControlOptions } from '../../types/FloatingControlOptions';
import { Component } from '@angular/core';
import { UserInput } from 'src/app/services/user-input.service';

@Component({
  selector: 'canvas-view',
  templateUrl: './canvas-view.html',
  styleUrls: ['./canvas-view.css'],
})
export class CanvasView {
  nodeOptions!: FloatingControlOptions;
  edgeOptions!: FloatingControlOptions;
  bgOptions!: FloatingControlOptions;
  constructor(protected ui: UserInput) {
    this.nodeOptions = {
      title: 'Node',
    };

    this.edgeOptions = {
      title: 'Edge',
    };

    this.bgOptions = {
      title: 'Background',
    };
  }
}
