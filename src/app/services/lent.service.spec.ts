import {TestBed} from '@angular/core/testing';

import {LentService} from './lent.service';

describe('LentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LentService = TestBed.get(LentService);
    expect(service).toBeTruthy();
  });
});
