import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePhasesComponent } from './create-phases.component';

describe('CreatePhasesComponent', () => {
  let component: CreatePhasesComponent;
  let fixture: ComponentFixture<CreatePhasesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePhasesComponent]
    });
    fixture = TestBed.createComponent(CreatePhasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
