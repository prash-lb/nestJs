import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from 'src/user/dto/register.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/user/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private UserService: UserService,
    private jwtService: JwtService,
  ) {}

  async createUser(register: RegisterDto): Promise<{
    response: {
      message: string;
      error: string;
      statusCode: number;
    };
    access_token: string;
  }> {
    try {
      const response = await this.UserService.createUser(register);
      const payload = { sub: response.id, username: response.email };
      const token = this.jwtService.sign(payload);
      return {
        response: {
          message: 'inscription réussit',
          error: '',
          statusCode: 200,
        },
        access_token: token,
      };
    } catch (err) {
      throw new ConflictException();
    }
  }

  async loginUser(login: LoginDto): Promise<{
    response: {
      message: string;
      error: string;
      statusCode: number;
    };
    access_token: string;
  }> {
    const { password } = login;

    const user = await this.UserService.loginUser(login);

    if (!user) {
      throw new UnauthorizedException('Identifiant incorrect');
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new UnauthorizedException('Identifiant incorrect');
    }
    const payload = { sub: user.id, username: user.email };
    const token = this.jwtService.sign(payload);

    return {
      response: {
        message: 'connexion réussit',
        error: '',
        statusCode: 200,
      },
      access_token: token,
    };
  }
}
