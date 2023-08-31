import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRiskPoliciesComponent } from './create-risk-policies.component';

describe('CreateRiskPoliciesComponent', () => {
  let component: CreateRiskPoliciesComponent;
  let fixture: ComponentFixture<CreateRiskPoliciesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRiskPoliciesComponent]
    });
    fixture = TestBed.createComponent(CreateRiskPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
