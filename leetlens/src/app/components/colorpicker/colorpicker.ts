import { Component, Input } from '@angular/core';
import { NgxColorsComponent } from 'ngx-colors';
import { FloatingControlOptions } from 'src/app/types/FloatingControlOptions';

@Component({
  selector: 'colorpicker',
  templateUrl: './colorpicker.html',
  styleUrls: ['./colorpicker.css'],
})
export class ColorPicker {
  @Input('options') options!: FloatingControlOptions;

  color: string = '';

  colorChanged(val: string) {}
}
