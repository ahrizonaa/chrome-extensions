import { Background } from './Backgrounds';

class AppTheme {
  CanvasBgColor: string = '#313131';
  EdgeColor: string = '#EEEEEE';
  NodeColor: string = '#d1d1d1';
  NodeFontSize: string = '0.66rem';
  NodeFontFamily: string = 'monospace';
  NodeFontColor: string = '#212121';
  ArrowheadSize: number = 10;
  CanvasBackground!: HTMLImageElement;
  imageCache: any = {};
  fileid: number = 1;
  basepath: string = './assets/canvas-backgrounds/600/';
  fileprefix: string = 'blueprint_paper-';
  filesuffix: string = 'x600.jpg';

  constructor() {
    const img = new Image(300, 300);
    img.src = this.Path(this.fileid);
    this.imageCache[this.fileid] = img;
    this.CanvasBackground = img;
  }

  ChangeBackground(bg: Background) {
    this.fileid = bg.fileid;

    if (this.imageCache[this.fileid] !== undefined) {
      this.CanvasBackground = this.imageCache[this.fileid];
    } else {
      const img = new Image(300, 300);
      img.src = this.Path(this.fileid);
      this.imageCache[this.fileid] = img;
      this.CanvasBackground = img;
    }
    console.log(this.CanvasBackground);
  }

  Path(fileid: number) {
    return this.basepath + this.fileprefix + String(fileid) + this.filesuffix;
  }
}

const Theme = new AppTheme();

export { Theme };
