import { TestBed } from '@angular/core/testing';

import { WeaknessService } from './weakness.service';

describe('WeaknessService', () => {
  let service: WeaknessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeaknessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
