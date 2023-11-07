import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { FilmsService } from './films.service';
import {
  CreateFilmRequest,
  DeleteFilmRequest,
  GetFilmRequest,
  GetOneFilmRequest,
} from './films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmService: FilmsService) {}

  @Get()
  listFilms(@Query() query: GetFilmRequest) {
    return this.filmService.list(query);
  }

  @Get(':filmId')
  getFilm(@Param() { filmId }: GetOneFilmRequest) {
    return this.filmService.get(filmId);
  }

  @Get(':filmId/detailed')
  getDetailedFilm(@Param() { filmId }: GetOneFilmRequest) {
    return this.filmService.getDetailed(filmId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  addFilm(@Body() body: CreateFilmRequest) {
    return this.filmService.add(body);
  }

  @Delete(':filmId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeFilm(@Param() { filmId }: DeleteFilmRequest) {
    const film = await this.filmService.get(filmId);

    return this.filmService.remove(film);
  }
}
