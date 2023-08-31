import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRiskPoliciesComponent } from './list-risk-policies.component';

describe('ListRiskPoliciesComponent', () => {
  let component: ListRiskPoliciesComponent;
  let fixture: ComponentFixture<ListRiskPoliciesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRiskPoliciesComponent]
    });
    fixture = TestBed.createComponent(ListRiskPoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
