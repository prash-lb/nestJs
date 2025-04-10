import { ApiProperty } from '@nestjs/swagger';


export class ResponseDetailDto {
  @ApiProperty({
    description: 'Indique si le film est adulte ou non',
    example: false,
  })
  adult: boolean;

  @ApiProperty({
    description: 'Chemin de l image d arrière-plan',
    example: '/path/to/image.jpg',
  })
  backdrop_path: string;

  @ApiProperty({
    description: 'Liste des genres du film',
    example: [28, 12],
  })
  genre_ids: number[];

  @ApiProperty({
    description: 'Identifiant unique du film',
    example: 12345,
  })
  id: number;

  @ApiProperty({
    description: 'Langue originale du film',
    example: 'en',
  })
  original_language: string;

  @ApiProperty({
    description: 'Titre original du film',
    example: 'Avengers: Endgame',
  })
  original_title: string;

  @ApiProperty({
    description: 'Résumé du film',
    example: 'Les Avengers tentent de sauver le monde.',
  })
  overview: string;

  @ApiProperty({
    description: 'Popularité du film',
    example: 100.5,
  })
  popularity: number;

  @ApiProperty({
    description: 'Chemin de l affiche du film',
    example: '/path/to/poster.jpg',
  })
  poster_path: string;

  @ApiProperty({
    description: 'Date de sortie du film',
    example: '2019-04-26',
  })
  release_date: string;

  @ApiProperty({
    description: 'Titre du film',
    example: 'Avengers: Endgame',
  })
  title: string;

  @ApiProperty({
    description: 'Indique si une vidéo est associée au film',
    example: false,
  })
  video: boolean;

  @ApiProperty({
    description: 'Moyenne des votes du film',
    example: 8.4,
  })
  vote_average: number;

  @ApiProperty({
    description: 'Nombre de votes du film',
    example: 12000,
  })
  vote_count: number;
}

export class ResponseDto {
  @ApiProperty({
    description: 'Page actuelle des résultats',
    example: 1,
  })
  page: number;

  @ApiProperty({
    description: 'Liste des films récupérés',
    type: [ResponseDetailDto],
  })
  results: ResponseDetailDto[];

  @ApiProperty({
    description: 'Nombre total de pages disponibles',
    example: 100,
  })
  total_pages: number;

  @ApiProperty({
    description: 'Nombre total de résultats',
    example: 2000,
  })
  total_results: number;
}