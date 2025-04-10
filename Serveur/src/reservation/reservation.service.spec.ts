import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService } from './reservation.service';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { ReservationDto } from './dto/reservation.dto';

describe('ReservationService', () => {
  let service: ReservationService;
  let reservationRepository: Repository<Reservation>;

  beforeEach(async () => {
    const mockReservationRepository = {
      save: jest.fn(),
      query: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: getRepositoryToken(Reservation),
          useValue: mockReservationRepository,
        },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    reservationRepository = module.get<Repository<Reservation>>(
      getRepositoryToken(Reservation),
    );
  });

  describe('reservation', () => {
    it('should create a reservation successfully', async () => {
      const reservationDto: ReservationDto = {
        idMovie: 1,
        dateDebut: new Date('2025-04-10T14:00:00Z'),
        dateFin: new Date('2025-04-10T16:00:00Z'),
      };

      const userId = 123;

      const mockSavedReservation = {
        id_user: userId,
        id_movie : reservationDto.idMovie,
        dateDebut: reservationDto.dateDebut,
        dateFin: reservationDto.dateFin
      };

      reservationRepository.query = jest.fn().mockResolvedValue([]); // No existing reservations
      reservationRepository.save = jest.fn().mockResolvedValue(mockSavedReservation);

      const result = await service.reservation(reservationDto, userId);

      expect(result).toEqual(mockSavedReservation);
      expect(reservationRepository.save).toHaveBeenCalledWith(mockSavedReservation);
    });

    it('should throw ConflictException if reservation already exists', async () => {
      const reservationDto: ReservationDto = {
        idMovie: 1,
        dateDebut: new Date('2025-04-10T14:00:00Z'),
        dateFin: new Date('2025-04-10T16:00:00Z'),
      };

      const userId = 123;
      const existingReservations = [
        {
          id_movie: 1,
          id_user: userId,
          dateDebut: new Date('2025-04-10T14:00:00Z'),
          dateFin: new Date('2025-04-10T16:00:00Z'),
        },
      ];

      reservationRepository.query = jest.fn().mockResolvedValue(existingReservations);

      try {
        await service.reservation(reservationDto, userId);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.message).toBe('Réservation déjà existante.');
      }
    });

    it('should throw ConflictException if there is a time overlap', async () => {
      const reservationDto: ReservationDto = {
        idMovie: 1,
        dateDebut: new Date('2025-04-10T14:00:00Z'),
        dateFin: new Date('2025-04-10T16:00:00Z'),
      };

      const userId = 123;
      const existingReservations = [
        {
          id_movie: 1,
          id_user: userId,
          dateDebut: new Date('2025-04-10T13:00:00Z'),
          dateFin: new Date('2025-04-10T15:00:00Z'),
        },
      ];

      reservationRepository.query = jest.fn().mockResolvedValue(existingReservations);

      try {
        await service.reservation(reservationDto, userId);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.message).toBe('Chevauchement avec une autre réservation');
      }
    });

    it('should throw BadRequestException if reservation duration is not 2 hours', async () => {
      const reservationDto: ReservationDto = {
        idMovie: 1,
        dateDebut: new Date('2025-04-10T14:00:00Z'),
        dateFin: new Date('2025-04-10T15:30:00Z'),
      };

      const userId = 123;

      reservationRepository.query = jest.fn().mockResolvedValue([]);

      try {
        await service.reservation(reservationDto, userId);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('La durée n est pas de 2h ');
      }
    });
  });

  describe('recuperation', () => {
    it('should retrieve all reservations for a user', async () => {
      const userId = 123;
      const mockReservations = [
        {
          id_movie: 1,
          id_user: userId,
          dateDebut: new Date('2025-04-10T14:00:00Z'),
          dateFin: new Date('2025-04-10T16:00:00Z'),
        },
      ];

      reservationRepository.query = jest.fn().mockResolvedValue(mockReservations);

      const result = await service.recuperation(userId);

      expect(result).toEqual(mockReservations);
      expect(reservationRepository.query).toHaveBeenCalledWith(
        'SELECT * FROM reservation WHERE reservation.id_user = $1',
        [userId],
      );
    });
  });

  describe('deletereservation', () => {
    it('should delete a reservation successfully', async () => {
      const userId = 123;
      const movieId = 1;

      reservationRepository.delete = jest.fn().mockResolvedValue({ affected: 1 });

      await service.deletereservation(movieId, userId);

      expect(reservationRepository.delete).toHaveBeenCalledWith({
        id_movie: movieId,
        id_user: userId,
      });
    });

    it('should throw BadRequestException if no reservation found', async () => {
      const userId = 123;
      const movieId = 1;

      reservationRepository.delete = jest.fn().mockResolvedValue({ affected: 0 });

      try {
        await service.deletereservation(movieId, userId);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe(
          "Erreur lors de la suppression de la reservation",
        );
      }
    });

    it('should throw BadRequestException if there is an error during deletion', async () => {
      const userId = 123;
      const movieId = 1;

      reservationRepository.delete = jest.fn().mockRejectedValue(new Error());

      try {
        await service.deletereservation(movieId, userId);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Erreur lors de la suppression de la reservation');
      }
    });
  });
});
