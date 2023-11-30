import { UserInput } from './../../services/user-input.service';
import { Component, Input } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Format } from 'src/app/types/Format';
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

  constructor(public ui: UserInput) {}

  keys(obj: any) {
    if (!obj) {
      return [];
    }
    return Object.keys(obj);
  }

  formatSelected(evt: MatSelectChange) {
    this.ui.currFormat = this.ui.currTab.options.formats.filter(
      (format: Format) => format.name == evt.value
    )[0];

    this.ui.formatChanged();
  }

  toggleChanged(evt: MatSlideToggleChange, key: string) {
    this.ui.variantChanged();
  }
}
