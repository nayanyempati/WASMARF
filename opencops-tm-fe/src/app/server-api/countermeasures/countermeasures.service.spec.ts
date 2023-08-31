import { TestBed } from '@angular/core/testing';

import { CountermeasuresService } from './countermeasures.service';

describe('CountermeasuresService', () => {
  let service: CountermeasuresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountermeasuresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
