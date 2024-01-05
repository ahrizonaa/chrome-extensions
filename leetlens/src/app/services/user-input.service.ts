import { Tab } from './../types/Tab';
import { Injectable } from '@angular/core';
import { Tabs } from '../constants/Tabs';
import { Format } from '../types/Format';
import { ValidatorService } from './validator.service';
import { Graph } from '../classes/graph';
import { Tree } from '../classes/tree';
import { Stack } from '../classes/stack';
import { Queue } from '../classes/queue';
import { LinkedList } from '../classes/linkedlist';
import { Example } from '../types/Example';

@Injectable({
  providedIn: 'root',
})
export class UserInput {
  public tabs = Tabs;
  public currTab: Tab = this.tabs[0];
  public currFormat: Format = this.currTab.options.formats[0];
  public currInput: string = '';
  public autoRefreshDisabled: boolean = true;
  public refreshDisabled: boolean = false;
  public currError: string = '';
  public currDS!: Graph | Tree | Stack | Queue | LinkedList;
  public hasDrawing: boolean = false;

  constructor(public validator: ValidatorService) {
    this.tabChanged();
  }

  parse(str: string) {
    return JSON.parse(str, function (k, v) {
      return typeof v === 'object' || isNaN(v) ? v : parseInt(v, 10);
    });
  }

  tabChanged() {
    switch (this.currTab.title) {
      case 'Graph':
        this.currDS = new Graph(this);
        break;
      case 'Tree':
        this.currDS = new Tree(this);
        break;
      case 'Stack':
        this.currDS = new Stack(this);
        break;
      case 'Queue':
        this.currDS = new Queue(this);
        break;
      case 'LinkedList':
        this.currDS = new LinkedList(this);
        break;
    }
    if (this.validate()) {
      this.draw();
    }
  }

  draw() {
    let input = this.parse(this.currInput);
    if (input) {
      this.hasDrawing = true;
      this.currDS.Parse(input);
      this.currDS.Plot();
    }
  }

  formatChanged() {
    if (this.validate()) {
      this.draw();
    } else {
    }
  }

  variantChanged() {
    if (this.validate()) {
      this.draw();
    } else {
    }
  }

  exampleClicked(example: Example) {
    this.currInput = JSON.stringify(example.dataset);

    for (let option of Object.keys(example.options)) {
      this.currTab.options.toggles[option] = example.options[option];
    }
    this.currFormat = example.format;

    this.refresh();
  }

  refresh() {
    if (this.validate()) {
      this.currError = '';
      // this.draw();
      this.tabChanged();
    } else {
    }
  }

  validate(): boolean {
    let result = this.validator.isValid(this);

    if (result === true) {
      return true;
    } else {
      this.currError = result as string;
      return false;
    }
  }
}
