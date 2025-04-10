import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class SearchDto {
    @ApiProperty({
      description: 'Filtrer les films par année de sortie',
      example: 2020,
      required: false,
    })
    @IsOptional()
    primary_release_year?:number;
    @ApiProperty({
      description: 'Filtrer les films par langue originale',
      example: 'en',
      required: false,
    })
    @IsOptional()
    with_original_language?: string ;
    @ApiProperty({
      description: 'Filtrer les films par genre',
      example: 'Action,Comedy',
      required: false,
    })
    @IsOptional()
    with_genre?: string;
    @ApiProperty({
      description: 'Filtrer les films par membre de déquipe (acteurs, réalisateurs)',
      example: 'Quentin Tarantino',
      required: false,
    })
    @IsOptional()
    with_crew?: string;
  }