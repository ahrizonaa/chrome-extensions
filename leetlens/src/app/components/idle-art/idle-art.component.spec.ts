import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdleArtComponent } from './idle-art.component';

describe('IdleArtComponent', () => {
  let component: IdleArtComponent;
  let fixture: ComponentFixture<IdleArtComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdleArtComponent]
    });
    fixture = TestBed.createComponent(IdleArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
