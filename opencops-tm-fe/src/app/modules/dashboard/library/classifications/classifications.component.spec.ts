import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationsComponent } from './classifications.component';

describe('ClassificationsComponent', () => {
  let component: ClassificationsComponent;
  let fixture: ComponentFixture<ClassificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassificationsComponent]
    });
    fixture = TestBed.createComponent(ClassificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
