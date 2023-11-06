import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Film } from './films.entity';
import { CreateFilmRequest, GetFilmRequest } from './films.dto';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film) private filmRepository: Repository<Film>,
  ) {}

  async get(findOptions: GetFilmRequest) {
    return this.filmRepository.findBy(findOptions);
  }

  async getOne(filmId: number, options?: Omit<FindOneOptions<Film>, 'where'>) {
    const film = await this.filmRepository.findOne({
      ...options,
      where: { filmId },
    });

    if (!film) {
      throw new NotFoundException(`Film not found by id: ${filmId}.`);
    }

    return film;
  }

  async create(film: CreateFilmRequest) {
    return this.filmRepository.save(film);
  }

  async remove(film: Film) {
    await this.filmRepository.remove(film);
  }
}
