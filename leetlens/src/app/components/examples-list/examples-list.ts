import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'examples-list',
  templateUrl: './examples-list.html',
  styleUrls: ['./examples-list.css'],
})
export class ExamplesList implements OnInit, AfterViewInit {
  @Input('examples') examples!: any[];

  ngOnInit() {
    console.log(this.examples);
  }

  ngAfterViewInit() {
    console.log(this.examples);
  }
}
