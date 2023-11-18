import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tab-view',
  templateUrl: './tab-view.html',
  styleUrls: ['./tab-view.css'],
})
export class TabView implements OnInit {
  tabs: any[] = [];

  constructor() {}

  ngOnInit() {
    this.tabs = [
      {
        title: 'Graph',
        options: {},
        examples: [],
      },
      {
        title: 'Tree',
        options: {},
        examples: [],
      },
      {
        title: 'Stack',
        options: {},
        examples: [],
      },
      {
        title: 'Queue',
        options: {},
        examples: [],
      },
      {
        title: 'LinkedList',
        options: {},
        examples: [],
      },
    ];
  }
}
