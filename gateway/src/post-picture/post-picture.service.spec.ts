import { Test, TestingModule } from '@nestjs/testing';
import { PostPictureService } from './post-picture.service';

describe('PostPictureService', () => {
  let service: PostPictureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostPictureService],
    }).compile();

    service = module.get<PostPictureService>(PostPictureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
