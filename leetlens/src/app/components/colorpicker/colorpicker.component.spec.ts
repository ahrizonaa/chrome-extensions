import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorpickerComponent } from './colorpicker.component';

describe('ColorpickerComponent', () => {
  let component: ColorpickerComponent;
  let fixture: ComponentFixture<ColorpickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColorpickerComponent]
    });
    fixture = TestBed.createComponent(ColorpickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
