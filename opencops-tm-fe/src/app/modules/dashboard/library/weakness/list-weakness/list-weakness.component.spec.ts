import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWeaknessComponent } from './list-weakness.component';

describe('ListWeaknessComponent', () => {
  let component: ListWeaknessComponent;
  let fixture: ComponentFixture<ListWeaknessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListWeaknessComponent]
    });
    fixture = TestBed.createComponent(ListWeaknessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
