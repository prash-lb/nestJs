import { Body, Controller, Post,  UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MovieDto } from './dto/movie.dto';
import { AuthGuard } from '../auth/auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from './dto/response.dto';

@ApiTags('Movie')
@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @UseGuards(AuthGuard)
  @Post('')
  @ApiResponse({ status: 201, description: 'Liste des films récupérée avec succès',type: ResponseDto })
  @ApiResponse({ status: 401, description: 'Utilisateur non autorisé' })
  @ApiResponse({ status: 500, description: 'Erreur serveur lors de la récupération des films' })
  @ApiBearerAuth()
  getMovies(@Body() movie: MovieDto) {
    return this.movieService.getMovies(movie);
  }
}
