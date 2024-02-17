import { TestBed } from '@angular/core/testing';

import { GithubUsersServiceService } from './github-users-service.service';

describe('GithubUsersServiceService', () => {
  let service: GithubUsersServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GithubUsersServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
