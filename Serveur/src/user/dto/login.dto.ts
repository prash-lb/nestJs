import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  isEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Mail utilisateur pour l inscription',
    example: 'test@hotmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8, {
    message: 'Le mot de passe doit comporter au moins 8 caractères',
  })
  @MaxLength(20, {
    message: 'Le mot de passe ne doit pas dépasser 20 caractères',
  })
  @ApiProperty({
    description: 'Mot de passe',
    example: 'password',
  })
  password: string;
}
