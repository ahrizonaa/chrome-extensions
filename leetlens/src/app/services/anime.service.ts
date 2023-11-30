import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Anime {
  id: number;
  enabled: boolean = true;

  constructor() {
    this.id = undefined as any;
  }

  IsActive(): boolean {
    return this.id !== undefined;
  }
  IsInactive(): boolean {
    return this.id === undefined;
  }
  Request(fn: FrameRequestCallback): void {
    this.id = window.requestAnimationFrame(fn);
  }
  Cancel(): void {
    if (this.id !== undefined)
      for (let i = this.id; i > -1; i--) {
        window.cancelAnimationFrame(i);
      }
    this.id = undefined as any;
  }
}
