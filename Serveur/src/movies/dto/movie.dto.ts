import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { SearchDto } from './search.dto';

export class MovieDto {
  @ApiProperty()
  @IsNotEmpty()
  pagination: number;

  @ApiProperty()
  @IsOptional()
  search?: SearchDto;
}

