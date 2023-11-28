import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Repository } from 'typeorm';
import { AppModule } from '../app.module';
import { Film } from './films.entity';

const filmsToCreate: Omit<Film, 'filmId'>[] = [
  {
    title: 'The Godfather',
    description: 'Mock description',
    releaseYear: 1972,
    rentalRate: 10,
    inventories: [],
  },
  {
    title: 'The Dark Knight',
    description: 'Mock description',
    releaseYear: 2008,
    rentalRate: 9,
    inventories: [],
  },
];

const createdFilms: Film[] = [];

describe('FilmsController', () => {
  let app: NestFastifyApplication;
  let filmRepository: Repository<Film>;

  const prepareMockData = async () => {
    await Promise.all(
      filmsToCreate.map(async (film) => {
        const createdFilm = await filmRepository.save(film);

        createdFilms.push(createdFilm);
      }),
    );
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    app.useGlobalPipes(new ValidationPipe());

    await app.init();
    await app.getHttpAdapter().getInstance().ready();

    filmRepository = app.get(getRepositoryToken(Film));

    await prepareMockData();
  });

  describe('/films/:filmId (GET)', () => {
    it('should return the requested film', async () => {
      const [{ inventories, ...film }] = createdFilms;

      const response = await app.inject({
        path: `films/${film.filmId}`,
      });

      expect(response.json()).toEqual(film);
    });

    it('should response with 404 if the film does not exists', async () => {
      const notExistingFilmId = 0;

      const response = await app.inject({
        path: `films/${notExistingFilmId}`,
      });

      expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
      expect(response.json()).toEqual({
        error: 'Not Found',
        message: `Film not found by: {"filmId":\"${notExistingFilmId}\"}.`,
        statusCode: HttpStatus.NOT_FOUND,
      });
    });

    it('should response with 400 if the film id is invalid', async () => {
      const invalidFilmId = 'text';

      const response = await app.inject({
        path: `films/${invalidFilmId}`,
      });

      expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
      expect(response.json()).toEqual({
        error: 'Bad Request',
        message: [
          'filmId must be a number conforming to the specified constraints',
        ],
        statusCode: HttpStatus.BAD_REQUEST,
      });
    });
  });

  afterAll(() => app.close());
});
