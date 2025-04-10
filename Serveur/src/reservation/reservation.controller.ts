import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReservationDto } from './dto/reservation.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ReservationService } from './reservation.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}
  @UseGuards(AuthGuard)
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Réservation créée avec succès',
    type: ReservationDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Conflit - Réservation déjà existante au chevauchement avec une autre réservation',
  })
  @ApiResponse({ status: 400, description: 'Mauvaise requête le film ne dure pas 2 heure' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiBearerAuth()
  reserver(@Body() reservation: ReservationDto, @Req() req) {
    const user = req.user.sub;
    return this.reservationService.reservation(reservation, user);
  }

  @UseGuards(AuthGuard)
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Liste des réservations récupérée avec succès',
    type: [ReservationDto],
  })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @ApiBearerAuth()
  recuperer_reservation(@Req() req) {
    const user = req.user.sub;
    return this.reservationService.recuperation(user);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'Réservation supprimée avec succès',
  })
  @ApiResponse({ status: 400, description: 'Mauvaise requête' })
  @ApiResponse({ status: 401, description: 'Non autorisé' })
  @Delete(':id')
  @ApiBearerAuth()
  delete_reservation(@Param('id') id_movie: number, @Req() req) {
    const user = req.user.sub;
    return this.reservationService.deletereservation(id_movie, user);
  }
}
