import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariantsPanelComponent } from './variants-panel.component';

describe('VariantsPanelComponent', () => {
  let component: VariantsPanelComponent;
  let fixture: ComponentFixture<VariantsPanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VariantsPanelComponent]
    });
    fixture = TestBed.createComponent(VariantsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
