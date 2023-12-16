import { ColorTheme } from '../types/ColorTheme';
import { MEDIUM } from './color-themes';

class AppTheme {
  EdgeColor: string = '#EEEEEE';
  NodeColor: string = '#D1D1D1';
  NodeFontSize: string = '0.66rem';
  NodeFontFamily: string = 'monospace';
  NodeFontColor: string = '#212121';
  ArrowheadSize: number = 10;

  readonly Lighter: string = '#E0FBFC';
  readonly Light: string = '#C2DFE3';
  readonly Medium: string = '#9DB4C0';
  readonly Dark: string = '#5C6B73';
  readonly Darker: string = '#253237';

  readonly LighterEdge: string = '#C1C1C1';
  readonly LightEdge: string = '#A1A1A1';
  readonly MediumEdge: string = '#717171';
  readonly DarkEdge: string = '#414141';
  readonly DarkerEdge: string = '#515151';

  readonly LighterVertice: string = '#A1A1A1';
  readonly LightVertice: string = '#818181';
  readonly MediumVertice: string = '#616161';
  readonly DarkVertice: string = '#313131';
  readonly DarkerVertice: string = '#616161';

  readonly FontDark: string = '#000000';
  readonly TabsFontDark: string = '#00000099';
  readonly FontLight: string = '#FFFFFF';
  readonly TabsFontLight: string = '#FFFFFF99';
  readonly UIDark: string = '#515151';
  readonly UILight: string = '#FFFFFF';

  ColorThemes: ColorTheme[] = [
    {
      name: 'Lighter',
      bgColor: this.Lighter,
      edgeColor: this.LighterEdge,
      verticeColor: this.LighterVertice,
      url: '/assets/canvas-backgrounds/lighter.jpg',
    },
    {
      name: 'Light',
      bgColor: this.Light,
      edgeColor: this.LightEdge,
      verticeColor: this.LightVertice,
      url: '/assets/canvas-backgrounds/light.jpg',
    },
    {
      name: 'Medium',
      bgColor: this.Medium,
      edgeColor: this.MediumEdge,
      verticeColor: this.MediumVertice,
      url: '/assets/canvas-backgrounds/medium.jpg',
    },
    {
      name: 'Dark',
      bgColor: this.Dark,
      edgeColor: this.DarkEdge,
      verticeColor: this.DarkVertice,
      url: '/assets/canvas-backgrounds/dark.jpg',
    },
    {
      name: 'Darker',
      bgColor: this.Darker,
      edgeColor: this.DarkerEdge,
      verticeColor: this.DarkerVertice,
      url: '/assets/canvas-backgrounds/darker.jpg',
    },
  ];

  root: HTMLElement;

  constructor() {
    this.root = document.querySelector(':root') as HTMLHtmlElement;
    this.ChangeBackground(this.ColorThemes[MEDIUM]);
  }

  ChangeBackground(theme: ColorTheme) {
    this.root.style.setProperty('--bg-background', theme.bgColor);
    this.root.style.setProperty('--bg-edges', theme.edgeColor);
    this.root.style.setProperty('--bg-vertices', theme.verticeColor);

    if (['Lighter', 'Light', 'Medium'].includes(theme.name)) {
      this.root.style.setProperty('--theme-font', this.FontDark);
      this.root.style.setProperty('--theme-tabs-font', this.TabsFontDark);
      this.root.style.setProperty('--theme-ui', this.UILight);
    } else {
      this.root.style.setProperty('--theme-font', this.FontLight);
      this.root.style.setProperty('--theme-tabs-font', this.TabsFontLight);
      this.root.style.setProperty('--theme-ui', this.UIDark);
    }
  }
}

const Theme = new AppTheme();

export { Theme };
