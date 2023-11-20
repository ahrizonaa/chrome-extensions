import { Component, Input } from '@angular/core';
import { Options } from 'src/app/types/Options';

@Component({
  selector: 'toggle-panel',
  templateUrl: './toggle-panel.html',
  styleUrls: ['./toggle-panel.css'],
})
export class TogglePanel {
  @Input('options') options: Options = {
    formats: [],
    toggles: {},
  };

  keys(obj: any) {
    if (!obj) {
      return [];
    }
    return Object.keys(obj);
  }
}
