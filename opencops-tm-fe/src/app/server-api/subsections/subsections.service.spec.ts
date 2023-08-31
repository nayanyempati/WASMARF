import { TestBed } from '@angular/core/testing';

import { SubsectionsService } from './subsections.service';

describe('SubsectionsService', () => {
  let service: SubsectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubsectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
