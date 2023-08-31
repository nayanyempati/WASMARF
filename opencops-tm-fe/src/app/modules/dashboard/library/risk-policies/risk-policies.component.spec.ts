import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskPoliciesComponent } from './risk-policies.component';

describe('RiskPoliciesComponent', () => {
  let component: RiskPoliciesComponent;
  let fixture: ComponentFixture<RiskPoliciesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RiskPoliciesComponent]
    });
    fixture = TestBed.createComponent(RiskPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
