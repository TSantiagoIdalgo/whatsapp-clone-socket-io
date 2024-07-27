import { Test, TestingModule } from '@nestjs/testing';
import { UsersChatController } from './users-chat.controller';
import { UsersChatService } from './users-chat.service';

describe('UsersChatController', () => {
  let controller: UsersChatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersChatController],
      providers: [UsersChatService],
    }).compile();

    controller = module.get<UsersChatController>(UsersChatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
