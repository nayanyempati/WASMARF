import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWeaknessComponent } from './add-weakness.component';

describe('AddWeaknessComponent', () => {
  let component: AddWeaknessComponent;
  let fixture: ComponentFixture<AddWeaknessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddWeaknessComponent]
    });
    fixture = TestBed.createComponent(AddWeaknessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
