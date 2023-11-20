import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { IdleArt } from './idle-art';

@Component({
  selector: 'idle-art',
  templateUrl: './idle-art.component.html',
  styleUrls: ['./idle-art.component.css'],
})
export class IdleArtComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    setTimeout(() => {
      document.getElementById('idle-art')?.appendChild(IdleArt as any);
    }, 0);
  }
}
