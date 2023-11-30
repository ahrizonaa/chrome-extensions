import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Subscription, debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { UserInput } from 'src/app/services/user-input.service';

@Component({
  selector: 'json-input',
  templateUrl: './json-input.html',
  styleUrls: ['./json-input.css'],
})
export class JsonInput implements AfterViewInit {
  @ViewChild('input') input!: NgModel;

  private debouncer!: Subscription;

  constructor(public ui: UserInput) {}

  ngAfterViewInit(): void {
    this.autoRefreshChanged(new MatSlideToggleChange(null as any, true));
  }

  autoRefreshChanged(evt: MatSlideToggleChange) {
    if (this.ui.autoRefreshDisabled) {
      this.debouncer = this.input.update
        .pipe(
          tap(() => {
            this.ui.refreshDisabled = true;
          }),
          debounceTime(1000),
          distinctUntilChanged()
        )
        .subscribe((value: any) => {
          this.ui.currInput = value;
          this.autoRefresh();
        });
    } else {
      this.debouncer.unsubscribe();
    }
  }

  autoRefresh() {
    if (this.ui.currInput == '') {
      this.ui.currError = '';
    } else {
      this.ui.refresh();
    }

    this.ui.refreshDisabled = false;
  }

  refreshClicked(evt: MouseEvent) {
    this.ui.refreshDisabled = true;
    this.ui.refresh();
    this.ui.refreshDisabled = false;
  }

  textareaValueChanged(value: string) {
    if (value == '') {
      this.ui.currError = '';
      this.ui.refreshDisabled = false;
    }
  }
}
