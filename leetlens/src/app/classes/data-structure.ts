import { inject } from '@angular/core';
import { Theme } from '../constants/Theme';
import { EdgeSegment } from './edge-segment';
import { UserInput } from '../services/user-input.service';
import { Mathematics } from '../services/mathematics.service';
import { Anime } from '../services/anime.service';
import { CanvasService } from '../services/canvas.service';

class DataStructure {
  public ui!: UserInput;
  public math: Mathematics = inject(Mathematics);
  public anime: Anime = inject(Anime);
  public cs: CanvasService = inject(CanvasService);
  canvasBgColor = Theme.CanvasBgColor;
  maxCellSize = 50;
  maxRadius = 50;
  minRadius = 11;
  edgeColor = Theme.EdgeColor;
  nodeColor = Theme.NodeColor;
  nodeFontSize = Theme.NodeFontSize;
  nodeFontFamily = Theme.NodeFontFamily;
  nodeFontColor = Theme.NodeFontColor;

  constructor(ui: any) {
    this.ui = ui as UserInput;
  }
}

export { DataStructure, EdgeSegment };
