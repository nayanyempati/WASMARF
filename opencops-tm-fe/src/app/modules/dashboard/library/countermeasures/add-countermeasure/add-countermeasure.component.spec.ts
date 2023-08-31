import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCountermeasureComponent } from './add-countermeasure.component';

describe('AddCountermeasureComponent', () => {
  let component: AddCountermeasureComponent;
  let fixture: ComponentFixture<AddCountermeasureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCountermeasureComponent]
    });
    fixture = TestBed.createComponent(AddCountermeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
