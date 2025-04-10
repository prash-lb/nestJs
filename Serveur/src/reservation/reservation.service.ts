import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationDto } from './dto/reservation.dto';

const deuxheureenmilliseconde = 7200000;

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  private _reserver(
    reservation: ReservationDto,
    id_user: number,
    liste: Reservation[],
  ) {
    liste.forEach((reserver) => {
      if (
        new Date(reserver.dateDebut).getTime() ===
          new Date(reservation.dateDebut).getTime() &&
        new Date(reservation.dateFin).getTime() ===
          new Date(reserver.dateFin).getTime() &&
        reserver.id_movie === reservation.idMovie &&
        reserver.id_user === id_user
      ) {
        throw new ConflictException('Réservation déjà existante.');
      }
    });
  }
  private chevauchement_reservation(
    reservation: ReservationDto,
    liste: Reservation[],
  ) {
    liste.forEach((reserver) => {
      const Chevauchement =
        (new Date(reservation.dateDebut).getTime() >
          reserver.dateDebut.getTime() &&
          new Date(reservation.dateDebut).getTime() <
            new Date(reserver.dateFin).getTime()) ||
        (new Date(reservation.dateFin).getTime() >
          new Date(reserver.dateDebut).getTime() &&
          new Date(reservation.dateFin).getTime() <
            new Date(reserver.dateFin).getTime()) ||
        (new Date(reservation.dateDebut).getTime() <=
          new Date(reserver.dateDebut).getTime() &&
          new Date(reservation.dateFin).getTime() >=
            new Date(reserver.dateFin).getTime());

      if (Chevauchement) {
        throw new ConflictException('Chevauchement avec une autre réservation');
      }
    });
  }

  private async _verificationReservation(
    reservation: ReservationDto,
    id_user: number,
  ) {
    const reservation_user_list: Reservation[] =
      await this.reservationRepository.query(
        'SELECT * FROM reservation WHERE reservation.id_user = $1',
        [id_user],
      );
    this._reserver(reservation, id_user, reservation_user_list);
    this.chevauchement_reservation(reservation, reservation_user_list);
    if (
      new Date(reservation.dateFin).getTime() -
        new Date(reservation.dateDebut).getTime() !==
      deuxheureenmilliseconde
    ) {
      throw new BadRequestException('La durée n est pas de 2h ');
    }
  }

  async reservation(reservation: ReservationDto, id_user: number) {
    await this._verificationReservation(reservation, id_user);

    const reservationNew: Reservation = {
      id_user,
      id_movie: reservation.idMovie,
      dateDebut: reservation.dateDebut,
      dateFin: reservation.dateFin,
    };
    return await this.reservationRepository.save(reservationNew);
  }

  async recuperation(id_user: number) {
    return await this.reservationRepository.query(
      'SELECT * FROM reservation WHERE reservation.id_user = $1',
      [id_user],
    );
  }

  async deletereservation(id_movie: number, id_user: number) {
    try {
      const deleteReservation = await this.reservationRepository.delete({
        id_movie,
        id_user,
      });
      if (deleteReservation.affected === 0) {
        throw new BadRequestException(
          "L'utilisateur n'a pas réserver de séance pour ce film",
        );
      }
    } catch (err) {
      throw new BadRequestException(
        'Erreur lors de la suppression de la reservation',
      );
    }
  }
}
