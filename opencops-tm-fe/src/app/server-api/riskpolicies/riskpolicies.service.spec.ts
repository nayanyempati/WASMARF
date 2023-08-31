import { TestBed } from '@angular/core/testing';

import { RiskpoliciesService } from './riskpolicies.service';

describe('RiskpoliciesService', () => {
  let service: RiskpoliciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RiskpoliciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
