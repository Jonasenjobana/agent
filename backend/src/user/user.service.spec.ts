import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  const userRepository = {
    save: jest.fn(),
  };

  beforeEach(async () => {
    userRepository.save.mockReset();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: userRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('saves a registered user and returns it', async () => {
    const createUserDto = {
      name: '测试用户',
      email: 'test@example.com',
      password: '123456',
    };
    const savedUser = {
      id: 'user-id',
      ...createUserDto,
    };
    userRepository.save.mockResolvedValue(savedUser);

    await expect(service.register(createUserDto)).resolves.toEqual(savedUser);
    expect(userRepository.save).toHaveBeenCalledWith(createUserDto);
  });
});
