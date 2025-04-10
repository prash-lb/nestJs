import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MovieDto } from './dto/movie.dto';
import { ResponseDto } from './dto/response.dto';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';

const API = 'https://api.themoviedb.org/3/';
const ListAPI = 'discover/movie';
const SEARCH_PERSON_APi = 'search/person';

//le id des différents genres
const genreDico = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Music: 10402,
  Mystery: 9648,
  Romance: 10749,
  'Science Fiction': 878,
  'TV Movie': 10770,
  Thriller: 53,
  War: 10752,
  Western: 37,
};
@Injectable()
export class MoviesService {
  constructor(private readonly httpService: HttpService) {}
  //on cherche ici led id des personne donner dans with_crew pour apres donner cette info a l'appel de l'api pour qu'il nous renvoi les film filtre avec ces id
  private fetchIdPerson(name: string) {
    const headers = {
      Authorization: `Bearer ${process.env.JETON_READING_API}`,
    };
    return this.httpService
      .get<ResponseDto>(API + SEARCH_PERSON_APi, {
        headers,
        params: { query: name },
      })
      .pipe(
        map((data) => {
          const list_id: number[] = [];
          data.data.results.forEach((detail) => {
            list_id.push(detail.id);
          });
          return list_id;
        }),
      );
  }
  getMovies(movies: MovieDto): Observable<ResponseDto> {
    const params = {
      page: movies.pagination || 1,
      ...movies.search,
    };
    const headers = {
      Authorization: `Bearer ${process.env.JETON_READING_API}`,
    };

    if (movies.search?.with_genre) {
      const listId: number[] = [];
      movies.search.with_genre.split(',').forEach((genre) => {
        const id = genreDico[genre];
        listId.push(id);
      });
      if (listId.length > 0) {
        params['with_genres'] = listId.join(',');
      }
    }

    if (movies.search?.with_crew) {
      return this.fetchIdPerson(movies.search.with_crew).pipe(
        switchMap((id) => {
          params['with_crew'] = id.join('|');
          return this.httpService
            .get<ResponseDto>(API + ListAPI, {
              params: params,
              headers: headers,
            })
            .pipe(
              map((data) => data.data),
              catchError((_) => {
                return throwError(
                  () =>
                    new InternalServerErrorException(
                      'Erreur lors de la récupération de la liste des film.',
                    ),
                );
              }),
            );
        }),
      );
    }
    return this.httpService
      .get<ResponseDto>(API + ListAPI, { params: params, headers: headers })
      .pipe(
        map((data) => data.data),
        catchError((_) => {
          return throwError(
            () =>
              new InternalServerErrorException(
                'Erreur lors de la récupération de la liste des film.',
              ),
          );
        }),
      );
  }
}
