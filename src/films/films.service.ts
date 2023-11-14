import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { Film } from './films.entity';
import { CreateFilmRequest, GetFilmRequest } from './films.dto';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film) private filmRepository: Repository<Film>,
  ) {}

  async list(findOptions = {} as GetFilmRequest) {
    return this.filmRepository.findBy(findOptions);
  }

  async get(
    whereClause: FindOptionsWhere<Film>,
    options?: Omit<FindOneOptions<Film>, 'where'>,
  ) {
    const film = await this.filmRepository.findOne({
      ...options,
      where: whereClause,
    });

    if (!film) {
      throw new NotFoundException(
        `Film not found by: ${JSON.stringify(whereClause)}.`,
      );
    }

    return film;
  }

  async getDetailed(
    filmId: number,
    options?: Omit<FindOneOptions<Film>, 'where'>,
  ) {
    return this.get(
      { filmId },
      {
        ...options,
        relations: { inventories: { rentals: true } },
      },
    );
  }

  async add(film: CreateFilmRequest) {
    return this.filmRepository.save(film);
  }

  async remove(film: Film) {
    await this.filmRepository.remove(film);
  }
}
