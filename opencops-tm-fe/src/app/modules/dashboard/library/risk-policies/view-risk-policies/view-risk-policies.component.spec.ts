import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRiskPoliciesComponent } from './view-risk-policies.component';

describe('ViewRiskPoliciesComponent', () => {
  let component: ViewRiskPoliciesComponent;
  let fixture: ComponentFixture<ViewRiskPoliciesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewRiskPoliciesComponent]
    });
    fixture = TestBed.createComponent(ViewRiskPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
