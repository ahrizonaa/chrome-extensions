import { Component, Input } from '@angular/core';

@Component({
  selector: 'variants-panel',
  templateUrl: './variants-panel.html',
  styleUrls: ['./variants-panel.css'],
})
export class VariantsPanel {
  @Input('options') options: any;
}
