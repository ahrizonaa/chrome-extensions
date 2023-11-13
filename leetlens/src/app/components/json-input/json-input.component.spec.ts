import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonInputComponent } from './json-input.component';

describe('JsonInputComponent', () => {
  let component: JsonInputComponent;
  let fixture: ComponentFixture<JsonInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JsonInputComponent]
    });
    fixture = TestBed.createComponent(JsonInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
