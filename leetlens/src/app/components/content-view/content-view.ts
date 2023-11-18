import { Component, Input } from '@angular/core';

@Component({
  selector: 'content-view',
  templateUrl: './content-view.html',
  styleUrls: ['./content-view.css'],
})
export class ContentView {
  @Input('title') title: string = '';
  @Input('options') options!: any;
  @Input('examples') examples: any[] = [];
}
