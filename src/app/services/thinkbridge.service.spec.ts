import { TestBed } from '@angular/core/testing';

import { ThinkbridgeService } from './thinkbridge.service';

describe('ThinkbridgeService', () => {
  let service: ThinkbridgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThinkbridgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
