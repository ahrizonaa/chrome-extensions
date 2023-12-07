import { Injectable } from '@angular/core';
import { UserInput } from './user-input.service';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  constructor() {}

  isValid(ui: UserInput): string | boolean {
    let obj: any = this.deserialize(ui.currInput);
    if (obj == null) {
      return 'Malformed JSON';
    }
    if (Array.isArray(obj) == false) {
      return 'Expected JSON array';
    }

    if (ui.currTab.title == 'Graph' && ui.currFormat.name == 'Adjacency List') {
      for (let row of obj) {
        if (Array.isArray(row) == false) {
          return 'Expected 2D array';
        }
      }
      let rowsize = ui.currTab.options.toggles.Weighted ? 3 : 2;
      for (let row of obj) {
        if (row.length != rowsize) {
          return `Expected N x ${rowsize} matrix`;
        }
      }
    } else if (
      ui.currTab.title == 'Graph' &&
      ui.currFormat.name == 'Adjacency Matrix'
    ) {
      for (let row of obj) {
        if (Array.isArray(row) == false) {
          return 'Expected 2D array';
        }
      }
      let rowsize = obj.length;
      for (let row of obj) {
        if (row.length != rowsize) {
          return 'Expected N x N array';
        }
      }
    }
    return true;
  }

  deserialize(str: string): any {
    str = str.replace(/null/gi, 'null');
    try {
      return JSON.parse(str);
    } catch {
      return null;
    }
  }

  stripInput(input_dirty: string): string {
    return input_dirty.replace(/[\n\t\s;]/g, '');
  }
}
