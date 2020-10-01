import { TestBed } from '@angular/core/testing';

import { CanLogguedGuard } from './can-loggued.guard';

describe('CanLogguedGuard', () => {
  let guard: CanLogguedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanLogguedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
