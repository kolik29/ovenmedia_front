import { TestBed } from '@angular/core/testing';

import { StreamInputService } from './stream-input.service';

describe('StreamInputService', () => {
  let service: StreamInputService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StreamInputService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
