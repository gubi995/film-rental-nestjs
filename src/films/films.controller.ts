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
  get(@Query() query: GetFilmRequest) {
    return this.filmService.get(query);
  }

  @Get(':filmId')
  getOne(@Param() { filmId }: GetOneFilmRequest) {
    return this.filmService.getOne(filmId);
  }

  @Get(':filmId/detailed')
  getOneDetailed(@Param() { filmId }: GetOneFilmRequest) {
    return this.filmService.getOneDetailed(filmId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  crete(@Body() body: CreateFilmRequest) {
    return this.filmService.create(body);
  }

  @Delete(':filmId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() { filmId }: DeleteFilmRequest) {
    const film = await this.filmService.getOne(filmId);

    return this.filmService.remove(film);
  }
}
