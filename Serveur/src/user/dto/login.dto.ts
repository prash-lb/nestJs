import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsNotEmpty()
  @MinLength(8,{message : 'password must have atleast 8 characters'})
  @MaxLength(20,{message : 'password must have maximum 8 characters'})
  @ApiProperty()
  password: string;

}
