import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { AuthGuard } from '../auth/auth.guard';
import { ResponseDto, ResponseDetailDto } from './dto/response.dto';
import { MovieDto } from './dto/movie.dto';
import { SearchDto } from './dto/search.dto';
import { ConflictException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

jest.mock('./movies.service');

describe('MoviesController', () => {
  let moviesController: MoviesController;
  let moviesService: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({})], 
      controllers: [MoviesController],
      providers: [
        MoviesService,
        {
          provide: AuthGuard,
          useValue: jest.fn().mockReturnValue(true), 
        },
      ],
    }).compile();

    moviesController = module.get<MoviesController>(MoviesController);
    moviesService = module.get<MoviesService>(MoviesService);
  });

  describe('getMovies', () => {
    it('should successfully retrieve movies and return a response', async () => {
      const movieDto: MovieDto = {
        pagination: 1,
        search: {
          primary_release_year: 2020,
          with_original_language: 'en',
          with_genre: 'Action',
          with_crew: 'Quentin Tarantino',
        } as SearchDto,
      };

      const moviesResponse: ResponseDto = {
        page: 1,
        results: [
          {
            adult: false,
            backdrop_path: '/path/to/image.jpg',
            genre_ids: [28, 12],
            id: 12345,
            original_language: 'en',
            original_title: 'Avengers: Endgame',
            overview: 'Les Avengers tentent de sauver le monde.',
            popularity: 100.5,
            poster_path: '/path/to/poster.jpg',
            release_date: '2019-04-26',
            title: 'Avengers: Endgame',
            video: false,
            vote_average: 8.4,
            vote_count: 12000,
          } as ResponseDetailDto,
        ],
        total_pages: 100,
        total_results: 2000,
      };

      moviesService.getMovies = jest.fn().mockResolvedValue(moviesResponse);

      const result = await moviesController.getMovies(movieDto);

      expect(moviesService.getMovies).toHaveBeenCalledWith(movieDto);
      expect(result).toEqual(moviesResponse);
    });

    it('should throw an error if movies are not found', async () => {
      const movieDto: MovieDto = {
        pagination: 1,
        search: {
          primary_release_year: 2020,
          with_original_language: 'en',
          with_genre: 'Action',
          with_crew: 'Quentin Tarantino',
        } as SearchDto,
      };

      moviesService.getMovies = jest.fn().mockRejectedValue(new ConflictException('Movies not found'));

      try {
        await moviesController.getMovies(movieDto);
      } catch (error) {
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.message).toBe('Movies not found');
      }
    });

   
  });
});
