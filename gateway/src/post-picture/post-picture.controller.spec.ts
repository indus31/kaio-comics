import { Test, TestingModule } from '@nestjs/testing';
import { PostPictureController } from './post-picture.controller';
import { PostPictureService } from './post-picture.service';

describe('PostPictureController', () => {
  let controller: PostPictureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostPictureController],
      providers: [PostPictureService],
    }).compile();

    controller = module.get<PostPictureController>(PostPictureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
