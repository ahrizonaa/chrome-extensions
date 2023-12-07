class AppTheme {
  CanvasBgColor: string = '#313131';
  EdgeColor: string = '#EEEEEE';
  NodeColor: string = '#d1d1d1';
  NodeFontSize: string = '0.66rem';
  NodeFontFamily: string = 'monospace';
  NodeFontColor: string = '#212121';
  ArrowheadSize: number = 10;
  CanvasBackground!: HTMLImageElement;

  constructor() {
    this.CanvasBackground = new Image(300, 300);
    this.CanvasBackground.src =
      './assets/canvas-backgrounds/600/blueprint_paper-2x600.jpg';
  }
}

const Theme = new AppTheme();

export { Theme };
