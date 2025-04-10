import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class ReservationDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'ID du film à réserver', example: 123 })
  idMovie: number;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    description: 'Date et heure du début de la réservation',
    example: '2023-05-01T14:00:00Z',
  })
  dateDebut: Date;

  @IsNotEmpty()
  @IsDateString()
  @ApiProperty({
    description: 'Date et heure de la fin de la réservation',
    example: '2023-05-01T16:00:00Z',
  })
  dateFin: Date;
}
