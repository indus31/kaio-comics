import { TestBed } from '@angular/core/testing';

import { PostpictureService } from './postpicture.service';

describe('PostpictureService', () => {
  let service: PostpictureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostpictureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
