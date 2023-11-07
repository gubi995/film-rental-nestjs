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

  async list(findOptions: GetFilmRequest) {
    return this.filmRepository.findBy(findOptions);
  }

  async get(filmId: number, options?: Omit<FindOneOptions<Film>, 'where'>) {
    const film = await this.filmRepository.findOne({
      ...options,
      where: { filmId },
    });

    if (!film) {
      throw new NotFoundException(`Film not found by id: ${filmId}.`);
    }

    return film;
  }

  async getDetailed(
    filmId: number,
    options?: Omit<FindOneOptions<Film>, 'where'>,
  ) {
    return this.get(filmId, {
      ...options,
      relations: { inventories: true },
    });
  }

  async add(film: CreateFilmRequest) {
    return this.filmRepository.save(film);
  }

  async remove(film: Film) {
    await this.filmRepository.remove(film);
  }
}
