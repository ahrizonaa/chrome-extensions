import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { FloatingControlOptions } from 'src/app/types/FloatingControlOptions';

@Component({
  selector: 'bgpicker',
  templateUrl: './bgpicker.html',
  styleUrls: ['./bgpicker.css'],
})
export class BgPicker implements AfterViewInit {
  @Input('options') options!: FloatingControlOptions;
  @ViewChild('bgselector') bgselector: ElementRef<HTMLDivElement>;

  color: string = '';
  bgSelectorVisible: boolean = false;
  backgrounds: { name: string; url: string }[];

  constructor() {
    this.backgrounds = [
      {
        name: 'Steel',
        url: '../../../assets/canvas-backgrounds/300/blueprint_paper-1x300.jpg',
      },
      {
        name: 'Grey',
        url: '../../../assets/canvas-backgrounds/300/blueprint_paper-2x300.jpg',
      },
      {
        name: 'Dark',
        url: '../../../assets/canvas-backgrounds/300/blueprint_paper-3x300.jpg',
      },
      {
        name: 'Cement',
        url: '../../../assets/canvas-backgrounds/300/blueprint_paper-4x300.jpg',
      },
      {
        name: 'Urban',
        url: '../../../assets/canvas-backgrounds/300/blueprint_paper-5x300.jpg',
      },
      {
        name: 'Vinny',
        url: '../../../assets/canvas-backgrounds/300/blueprint_paper-6x300.jpg',
      },
    ];
  }

  ngAfterViewInit(): void {
    document.body.addEventListener('click', (ev: MouseEvent) => {
      let element = ev.target as HTMLElement;

      if (element.id == 'bgselector') {
        console.log('exiting');
        return;
      }
      if (element && element.id != 'bgselector') {
        console.log('hiding');
        this.bgSelectorVisible = false;
      }
    });
  }

  bgSelected(evt: MouseEvent, bg: any) {
    console.log(bg);
    this.bgSelectorVisible = false;
  }

  bgPickerClicked(evt: MouseEvent) {
    this.bgSelectorVisible = !this.bgSelectorVisible;
  }
}
