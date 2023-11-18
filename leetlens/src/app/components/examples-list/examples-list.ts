import { Component, Input } from '@angular/core';

@Component({
  selector: 'examples-list',
  templateUrl: './examples-list.html',
  styleUrls: ['./examples-list.css'],
})
export class ExamplesList {
  @Input('examples') examples: any[] = [];
}
