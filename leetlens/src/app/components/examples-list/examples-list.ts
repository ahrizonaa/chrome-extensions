import { Component, Input } from '@angular/core';
import { UserInput } from 'src/app/services/user-input.service';
import { Example } from 'src/app/types/Example';

@Component({
  selector: 'examples-list',
  templateUrl: './examples-list.html',
  styleUrls: ['./examples-list.css'],
})
export class ExamplesList {
  @Input('examples') examples!: Example[];

  constructor(private ui: UserInput) {}

  exampleClicked(example: Example) {
    this.ui.exampleClicked(example);
  }
}
