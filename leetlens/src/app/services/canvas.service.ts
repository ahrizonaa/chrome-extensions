import { Injectable } from '@angular/core';
import { Theme } from '../constants/Theme';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  public canvas: HTMLCanvasElement = undefined as any;
  public ctx: CanvasRenderingContext2D = undefined as any;

  private intervalID!: any;

  constructor() {
    this.intervalID = setInterval(() => {
      let result: HTMLElement | null = document.getElementById('canvas-main');
      if (result && result.tagName == 'CANVAS') {
        clearInterval(this.intervalID);
        this.canvas = result as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
      }
    }, 100);
  }

  ClearCanvas() {
    this.ctx.clearRect(0, 0, 300, 300);
  }
}
