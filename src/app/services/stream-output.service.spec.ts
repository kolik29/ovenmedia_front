import { TestBed } from '@angular/core/testing';

import { StreamOutputService } from './stream-output.service';

describe('StreamOutputService', () => {
  let service: StreamOutputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StreamOutputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
