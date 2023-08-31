import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComponentsComponent } from './add-components.component';

describe('AddComponentsComponent', () => {
  let component: AddComponentsComponent;
  let fixture: ComponentFixture<AddComponentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddComponentsComponent]
    });
    fixture = TestBed.createComponent(AddComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
