import { Component, Input } from '@angular/core';
import { FloatingControlOptions } from 'src/app/types/FloatingControlOptions';

@Component({
  selector: 'bgpicker',
  templateUrl: './bgpicker.html',
  styleUrls: ['./bgpicker.css'],
})
export class BgPicker {
  @Input('options') options!: FloatingControlOptions;
  color: string = '';

  colorChanged(val: string) {
    console.log(val);
  }
}
