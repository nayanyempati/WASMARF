import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClassificationsComponent } from './list-classifications.component';

describe('ListClassificationsComponent', () => {
  let component: ListClassificationsComponent;
  let fixture: ComponentFixture<ListClassificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListClassificationsComponent]
    });
    fixture = TestBed.createComponent(ListClassificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
