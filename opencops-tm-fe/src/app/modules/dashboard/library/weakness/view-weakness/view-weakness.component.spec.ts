import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWeaknessComponent } from './view-weakness.component';

describe('ViewWeaknessComponent', () => {
  let component: ViewWeaknessComponent;
  let fixture: ComponentFixture<ViewWeaknessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewWeaknessComponent]
    });
    fixture = TestBed.createComponent(ViewWeaknessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
