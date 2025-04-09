import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class SearchDto {
    @ApiProperty()
    @IsOptional()
    primary_release_year?:number;
    @ApiProperty()
    @IsOptional()
    with_original_language?: string ;
    @ApiProperty()
    @IsOptional()
    with_genre?: string;
    @ApiProperty()
    @IsOptional()
    with_crew?: string;
  }