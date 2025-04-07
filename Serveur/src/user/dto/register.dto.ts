import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Unique } from 'typeorm';

export class RegisterDto {
  
  @IsString()
  @IsNotEmpty()
  @MaxLength(30,{message : 'username must have maximum 30 characters'})
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @MinLength(8,{message : 'password must have atleast 8 characters'})
  @MaxLength(20,{message : 'password must have maximum 20 characters'})
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @MaxLength(20,{message : 'username must have maximum 30 characters'})

  firstname: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @MaxLength(30,{message : 'username must have maximum 30 characters'})
  lastname: string;
}
