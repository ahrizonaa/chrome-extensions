import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatastructureRadioDropdownComponent } from './datastructure-radio-dropdown.component';

describe('DatastructureRadioDropdownComponent', () => {
  let component: DatastructureRadioDropdownComponent;
  let fixture: ComponentFixture<DatastructureRadioDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatastructureRadioDropdownComponent]
    });
    fixture = TestBed.createComponent(DatastructureRadioDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
