import { Test, TestingModule } from '@nestjs/testing';
import { ProfilePictureService } from './profile_picture.service';

describe('ProfilePictureService', () => {
  let service: ProfilePictureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfilePictureService],
    }).compile();

    service = module.get<ProfilePictureService>(ProfilePictureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
