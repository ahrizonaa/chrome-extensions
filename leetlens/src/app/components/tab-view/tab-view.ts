import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Tabs } from 'src/app/constants/Tabs';
import { UserInput } from 'src/app/services/user-input.service';
import { Tab } from 'src/app/types/Tab';

@Component({
  selector: 'tab-view',
  templateUrl: './tab-view.html',
  styleUrls: ['./tab-view.css'],
})
export class TabView implements OnInit {
  constructor(public ui: UserInput) {}

  ngOnInit() {}

  tabSelected(evt: MatTabChangeEvent) {
    this.ui.currTab = Tabs.filter(
      (tab: Tab) => tab.title == evt.tab.textLabel
    )[0];
    this.ui.currFormat = this.ui.currTab.options.formats[0];
    this.ui.tabChanged();
  }
}
