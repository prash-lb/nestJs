import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { SearchDto } from './search.dto';

export class MovieDto {
  @ApiProperty({ description: 'Page de résultats de films à récupérer',
    example: 1,})
  @IsNotEmpty()
  pagination: number;

  @ApiProperty({ description: 'Paramètres de recherche optionnels pour le filtre',
    type: SearchDto,
    required: false,})
  @IsOptional()
  search?: SearchDto;
}

