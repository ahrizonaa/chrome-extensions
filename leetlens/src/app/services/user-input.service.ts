import { Tab } from './../types/Tab';
import { Injectable, OnInit } from '@angular/core';
import { Tabs } from '../constants/Tabs';
import { Format } from '../types/Format';
import { ValidatorService } from './validator.service';
import { DataStructure } from '../classes/data-structure';
import { Graph } from '../classes/graph';
import { Tree } from '../classes/tree';
import { Stack } from '../classes/stack';
import { Queue } from '../classes/queue';
import { LinkedList } from '../classes/linkedlist';

@Injectable({
  providedIn: 'root',
})
export class UserInput implements OnInit {
  public tabs = Tabs;
  public currTab: Tab = this.tabs[0];
  public currFormat: Format = this.currTab.options.formats[0];
  public currInput: string = '';
  public autoRefreshDisabled: boolean = true;
  public refreshDisabled: boolean = false;
  public currError: string = '';
  public currDataStructure!: Graph | Tree | Stack | Queue | LinkedList;

  constructor(public validator: ValidatorService) {}

  ngOnInit(): void {
    this.anyInputChanged();
  }

  anyInputChanged() {}

  formatChanged() {}

  variantChanged() {
    let result = this.validate();

    if (result === true) {
    }
  }

  refreshClicked() {}

  refresh() {
    this.validate();
  }

  validate(): boolean {
    let result = this.validator.isValid(this);

    if (result === true) {
      // input is valid
      return true;
    } else {
      // result = validation error message
      this.currError = result as string;
      return false;
    }
  }
}
