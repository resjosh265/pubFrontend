import { TestBed } from '@angular/core/testing';

import { HomepageresolveService } from './homepageresolve.service';

describe('HomepageresolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomepageresolveService = TestBed.get(HomepageresolveService);
    expect(service).toBeTruthy();
  });
});
