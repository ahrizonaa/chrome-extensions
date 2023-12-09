import { UserInput } from './../../services/user-input.service';
import { Background, Backgrounds } from './../../constants/Backgrounds';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { CanvasService } from 'src/app/services/canvas.service';
import { FloatingControlOptions } from 'src/app/types/FloatingControlOptions';
import { Theme } from 'src/app/constants/Theme';

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
  backgrounds: Background[] = Backgrounds;

  constructor(private ui: UserInput, private cs: CanvasService) {}

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

  bgSelected(evt: MouseEvent, bg: any) {
    this.bgcarouselVisible = false;
    Theme.ChangeBackground(bg);
    this.ui.currDS.ResetBackground();
    this.ui.currDS.Draw();
  }

  bgPickerClicked(evt: MouseEvent) {
    evt.stopPropagation();
    this.bgcarouselVisible = !this.bgcarouselVisible;
  }
}
