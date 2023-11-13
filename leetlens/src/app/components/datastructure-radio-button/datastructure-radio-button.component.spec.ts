import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatastructureRadioButtonComponent } from './datastructure-radio-button.component';

describe('DatastructureRadioButtonComponent', () => {
  let component: DatastructureRadioButtonComponent;
  let fixture: ComponentFixture<DatastructureRadioButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatastructureRadioButtonComponent]
    });
    fixture = TestBed.createComponent(DatastructureRadioButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
