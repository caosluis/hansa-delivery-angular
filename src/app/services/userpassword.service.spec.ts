import { TestBed } from '@angular/core/testing';

import { UserpasswordService } from './userpassword.service';

describe('UserpasswordService', () => {
  let service: UserpasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserpasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
