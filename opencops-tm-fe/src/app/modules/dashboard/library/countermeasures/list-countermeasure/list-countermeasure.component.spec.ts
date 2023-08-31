import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCountermeasureComponent } from './list-countermeasure.component';

describe('ListCountermeasureComponent', () => {
  let component: ListCountermeasureComponent;
  let fixture: ComponentFixture<ListCountermeasureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCountermeasureComponent]
    });
    fixture = TestBed.createComponent(ListCountermeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
