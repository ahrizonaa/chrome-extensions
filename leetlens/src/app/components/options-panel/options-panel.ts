import { Component, Input } from '@angular/core';

@Component({
  selector: 'options-panel',
  templateUrl: './options-panel.html',
  styleUrls: ['./options-panel.css'],
})
export class OptionsPanel {
  @Input('options') options: any;
}
