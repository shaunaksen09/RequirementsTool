import { TestBed } from '@angular/core/testing';

import { RequirementformService } from './requirementform.service';

describe('RequirementformService', () => {
  let service: RequirementformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequirementformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
