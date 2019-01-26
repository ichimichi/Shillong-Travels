import { TestBed } from '@angular/core/testing';

import { AuthStatusService } from './auth-status.service';

describe('AuthStatusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthStatusService = TestBed.get(AuthStatusService);
    expect(service).toBeTruthy();
  });
});
