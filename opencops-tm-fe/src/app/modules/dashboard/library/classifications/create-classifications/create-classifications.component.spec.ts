import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClassificationsComponent } from './create-classifications.component';

describe('CreateClassificationsComponent', () => {
  let component: CreateClassificationsComponent;
  let fixture: ComponentFixture<CreateClassificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateClassificationsComponent]
    });
    fixture = TestBed.createComponent(CreateClassificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
