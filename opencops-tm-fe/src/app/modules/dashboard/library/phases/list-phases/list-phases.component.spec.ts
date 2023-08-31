import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPhasesComponent } from './list-phases.component';

describe('ListPhasesComponent', () => {
  let component: ListPhasesComponent;
  let fixture: ComponentFixture<ListPhasesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPhasesComponent]
    });
    fixture = TestBed.createComponent(ListPhasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
