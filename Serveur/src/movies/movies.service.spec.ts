import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { HttpService, HttpModule } from '@nestjs/axios'; // Ajout de HttpModule
import { of } from 'rxjs';
import { ResponseDto } from './dto/response.dto';
import { AxiosResponse } from 'axios';  

describe('MoviesService', () => {
  let service: MoviesService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should successfully get movies and return a response', async () => {
    const mockResponse: ResponseDto = {
      page: 1,
      results: [
        {
          adult: false,
          backdrop_path: '/path/to/image.jpg',
          genre_ids: [28, 12],
          id: 12345,
          original_language: 'en',
          original_title: 'Avengers: Endgame',
          overview: 'The Avengers attempt to save the world.',
          popularity: 100.5,
          poster_path: '/path/to/poster.jpg',
          release_date: '2019-04-26',
          title: 'Avengers: Endgame',
          video: false,
          vote_average: 8.4,
          vote_count: 12000,
        },
      ],
      total_pages: 100,
      total_results: 2000,
    };

    jest.spyOn(httpService, 'get').mockReturnValue(of({
      data: mockResponse, 
    } as AxiosResponse<ResponseDto>));

    const movieDto = {
      pagination: 1,
    };

    const result = await service.getMovies(movieDto).toPromise();

    expect(result?.page).toBe(1);
    expect(result?.results.length).toBeGreaterThan(0);
    expect(result?.results[0].title).toBe('Avengers: Endgame');
    expect(result?.results[0].genre_ids).toContain(28);
  });
});
