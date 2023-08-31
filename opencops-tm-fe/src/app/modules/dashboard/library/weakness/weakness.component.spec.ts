import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaknessComponent } from './weakness.component';

describe('WeaknessComponent', () => {
  let component: WeaknessComponent;
  let fixture: ComponentFixture<WeaknessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeaknessComponent]
    });
    fixture = TestBed.createComponent(WeaknessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
