import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { FloatingControlOptions } from 'src/app/types/FloatingControlOptions';
import { Theme } from 'src/app/constants/Theme';
import { ColorTheme } from 'src/app/types/ColorTheme';

@Component({
  selector: 'bgpicker',
  templateUrl: './bgpicker.html',
  styleUrls: ['./bgpicker.css'],
})
export class BgPicker implements AfterViewInit {
  @Input('options') options!: FloatingControlOptions;
  @ViewChild('bgcarousel') bgcarousel: ElementRef<HTMLDivElement>;

  color: string = '';
  bgcarouselVisible: boolean = false;
  colorThemes: ColorTheme[] = Theme.ColorThemes;

  constructor() {}

  ngAfterViewInit(): void {
    document.body.addEventListener('click', (ev: MouseEvent) => {
      let target = ev.target as HTMLElement;

      if (this.bgcarouselVisible == false) {
        return;
      }

      if (target && target.id == 'bg-btn') {
        return;
      }

      if (target && target.id != 'bgcarousel' && target.id != 'bg-btn') {
        this.bgcarouselVisible = false;
      }
    });
  }

  bgSelected(colorTheme: ColorTheme) {
    this.bgcarouselVisible = false;
    Theme.ChangeBackground(colorTheme);
  }

  bgPickerClicked(evt: MouseEvent) {
    evt.stopPropagation();
    this.bgcarouselVisible = !this.bgcarouselVisible;
  }
}
