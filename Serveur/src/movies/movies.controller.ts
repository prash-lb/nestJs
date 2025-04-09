import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MovieDto } from './dto/movie.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Movie')
@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @UseGuards(AuthGuard)
  @Post('movies')
  @ApiResponse({ status: 201, description: 'Success' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Error Server' })
  @ApiBearerAuth()
  getMovies(@Body() movie: MovieDto) {
    return this.movieService.getMovies(movie);
  }
}
