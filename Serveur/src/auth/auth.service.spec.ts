import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from 'src/user/dto/register.dto';

jest.mock('../user/user.service');
jest.mock('@nestjs/jwt'); 
jest.mock('bcrypt');

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService, 
        JwtService,  
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('createUser', () => {
    it('should successfully create a user and return a token', async () => {
      const registerDto : RegisterDto = {
        email: 'test@example.com',
        password: 'password123',
        firstname: 'pras',
        lastname: 'siva'
      };

      const userResponse = {
        id: 1,
        email: registerDto.email,
        password: registerDto.password,
      };

      userService.createUser = jest.fn().mockResolvedValue(userResponse);

      const token = 'testToken';
      jwtService.sign = jest.fn().mockReturnValue(token);

      const result = await authService.createUser(registerDto);

      expect(result.response.message).toBe('inscription réussit');
      expect(result.access_token).toBe(token);
      expect(result.response.statusCode).toBe(200);
    });

    it('should throw a ConflictException if user already exists', async () => {
      const registerDto : RegisterDto = {
        email: 'test@example.com',
        password: 'password123',
        firstname: 'pras',
        lastname: 'siva'
      };

      userService.createUser = jest.fn().mockRejectedValue(new Error('User already exists'));

      try {
        await authService.createUser(registerDto);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
      }
    });
  });

  describe('loginUser', () => {
    // it('should successfully login and return a token', async () => {
    //   const loginDto = {
    //     email: 'test@example.com',
    //     password: 'password123',
    //   };
    
    //   const user = {
    //     id: 1,
    //     email: loginDto.email,
    //     password: 'password123',
    //   };
    
    //   userService.loginUser = jest.fn().mockResolvedValue(user);
    
    
    //   const token = 'testToken';
    //   jwtService.sign = jest.fn().mockReturnValue(token);
    
    //   const result = await authService.loginUser(loginDto);
    
    //   expect(result.response.message).toBe('connexion réussit');
    //   expect(result.access_token).toBe(token);
    //   expect(result.response.statusCode).toBe(200);
    
    // });
    

    it('should throw an UnauthorizedException if user not found', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      userService.loginUser = jest.fn().mockResolvedValue(null);

      try {
        await authService.loginUser(loginDto);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
        expect(error.message).toBe('Identifiant incorrect');
      }
    });

    it('should throw an UnauthorizedException if password is incorrect', async () => {
      const loginDto = {
        email: 'test@example.com',
        password: 'password123',
      };

      const user = {
        id: 1,
        email: loginDto.email,
        password: await bcrypt.hash('wrongPassword', 10),
      };

      userService.loginUser = jest.fn().mockResolvedValue(user);


      try {
        await authService.loginUser(loginDto);
      } catch (error) {
        expect(error).toBeInstanceOf(UnauthorizedException);
        expect(error.message).toBe('Identifiant incorrect');
      }
    });
  });
});
