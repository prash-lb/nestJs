import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/user/dto/register.dto';
import { LoginDto } from 'src/user/dto/login.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentification')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  @ApiResponse({ status: 201, description: 'sign up sucess'})
  @ApiResponse({ status: 409, description: 'The username is already used'})
  async registerUser(@Body() registerDto: RegisterDto) {
    return this.authService.createUser(registerDto);
  }

  @Post('login')
  @ApiResponse({ status: 201, description: 'login sucess'})
  @ApiResponse({ status: 401, description: 'Unauthorized'})
  async loginUser(@Body() loginDto: LoginDto) {
    return this.authService.loginUser(loginDto);
  }
}
