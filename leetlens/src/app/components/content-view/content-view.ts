import { Component, Input } from '@angular/core';
import { Example } from 'src/app/types/Example';
import { Options } from 'src/app/types/Options';

@Component({
  selector: 'content-view',
  templateUrl: './content-view.html',
  styleUrls: ['./content-view.css'],
})
export class ContentView {
  @Input('title') title: string = '';
  @Input('options')
  options!: Options;
  @Input('examples') examples: Example[] = [];
}
