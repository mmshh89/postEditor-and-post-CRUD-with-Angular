import { TestBed } from '@angular/core/testing';

import { ThePostService } from './the-post.service';

describe('ThePostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThePostService = TestBed.get(ThePostService);
    expect(service).toBeTruthy();
  });
});
