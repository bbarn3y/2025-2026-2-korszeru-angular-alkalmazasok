import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { privateGuard } from './private-guard';

describe('privateGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => privateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
