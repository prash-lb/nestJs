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
  @ApiResponse({ status: 201, description: 'Inscription réussie' })
  @ApiResponse({ status: 409, description: 'Le nom utilisateur est déjà pris' })
  @ApiResponse({ status: 500, description: 'Erreur serveur' })
  async registerUser(@Body() registerDto: RegisterDto) {
    return this.authService.createUser(registerDto);
  }

  @Post('login')
  @ApiResponse({ status: 201, description: 'Connexion réussie' })
  @ApiResponse({ status: 401, description: 'Identifiants incorrects' })
  @ApiResponse({ status: 500, description: 'Erreur serveur' })
  async loginUser(@Body() loginDto: LoginDto) {
    return this.authService.loginUser(loginDto);
  }
}
