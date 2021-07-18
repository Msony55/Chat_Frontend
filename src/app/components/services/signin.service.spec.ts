import { TestBed } from '@angular/core/testing';

import { SigninServices } from './signin.service';

describe('AuthService', () => {
  let service: SigninServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SigninServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
