import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'email utilisateur pour l inscription',
    example: 'test@hotmail.com',
  })
  email: string;

  @IsNotEmpty()
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

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Prénom de l utilisateur',
    example: 'prashath',
  })
  firstname: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Nom de l utilisateur',
    example: 'siva',
  })
  lastname: string;
}
