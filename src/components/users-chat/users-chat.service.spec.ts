import { Test, TestingModule } from '@nestjs/testing';
import { UsersChatService } from './users-chat.service';

describe('UsersChatService', () => {
  let service: UsersChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersChatService],
    }).compile();

    service = module.get<UsersChatService>(UsersChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
