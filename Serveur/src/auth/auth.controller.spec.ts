import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/user/dto/register.dto';
import { LoginDto } from 'src/user/dto/login.dto';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    createUser: jest.fn(),
    loginUser: jest.fn(),
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  it('should register a user', async () => {
    const dto: RegisterDto = {
      email: 'test@test.com',
      password: 'securePass123',
      firstname: 'test',
      lastname: 'test'
    };

    const expectedResult = { message: 'User created' };

    mockAuthService.createUser.mockResolvedValue(expectedResult);

    const result = await authController.registerUser(dto);

    expect(mockAuthService.createUser).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResult);
  });

  it('should login a user', async () => {
    const dto: LoginDto = {
      email: 'test@test.com',
      password: 'securePass123',
    };

    const expectedResult = { token: 'fake-jwt-token' };

    mockAuthService.loginUser.mockResolvedValue(expectedResult);

    const result = await authController.loginUser(dto);

    expect(mockAuthService.loginUser).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResult);
  });
});
