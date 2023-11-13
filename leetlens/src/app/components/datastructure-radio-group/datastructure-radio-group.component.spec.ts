import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatastructureRadioGroupComponent } from './datastructure-radio-group.component';

describe('DatastructureRadioGroupComponent', () => {
  let component: DatastructureRadioGroupComponent;
  let fixture: ComponentFixture<DatastructureRadioGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatastructureRadioGroupComponent]
    });
    fixture = TestBed.createComponent(DatastructureRadioGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
