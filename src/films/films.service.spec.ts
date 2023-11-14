import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { FilmsService } from './films.service';
import { Film } from './films.entity';
import { FILMS } from '../mocks/film';

const [FILM] = FILMS;

describe('FilmsService', () => {
  let filmService: FilmsService;
  const filmRepository = {
    findBy: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: getRepositoryToken(Film),
          useValue: filmRepository,
        },
      ],
    }).compile();

    filmService = module.get<FilmsService>(FilmsService);
  });

  // Given - What we are testing right now
  describe('get', () => {
    // When - What are the circumstances
    describe('when a film is found in the repository', () => {
      // Then - What is the expectation
      it('should return it back', async () => {
        // Arrange - Setup all prerequisites that is needed to run our code under test
        filmRepository.findOne.mockImplementation(() => FILM);

        // Act - Trigger the code under test. (E.g. call a function on a service).
        const film = await filmService.get({ filmId: FILM.filmId });

        // Assert - Check if we receive the expected result
        expect(film).toBe(FILM);
      });
    });

    describe('when a film does NOT found in the repository', () => {
      it('should throw a NotFoundException', async () => {
        filmRepository.findOne.mockImplementation(() => null);

        const getFilm = filmService.get({ filmId: FILM.filmId });

        expect(getFilm).rejects.toThrowError(NotFoundException);
      });
    });
  });

  describe('getDetailed', () => {
    describe('when a film is found in the repository', () => {
      it('should return it back', async () => {
        filmRepository.findOne.mockImplementation(() => FILM);

        const film = await filmService.getDetailed(FILM.filmId);

        expect(film).toBe(FILM);
      });
    });

    describe('when a film is NOT found in the repository', () => {
      it('should throw a NotFoundException', async () => {
        filmRepository.findOne.mockImplementation(() => null);

        const getFilm = filmService.getDetailed(FILM.filmId);

        expect(getFilm).rejects.toThrowError(NotFoundException);
      });
    });
  });

  describe('list', () => {
    it('should return the films from the repository', async () => {
      filmRepository.findBy.mockImplementation(() => FILMS);

      const films = await filmService.list();

      expect(films).toBe(FILMS);
    });
  });

  describe('add', () => {
    it('should call the film repository with the correct arguments and return the film', async () => {
      const { title, description, releaseYear } = FILM;
      const filmToAdd = {
        title,
        description,
        releaseYear,
      };
      filmRepository.save.mockImplementation(() => FILMS[0]);

      const newFilm = await filmService.add(filmToAdd);

      expect(newFilm).toBe(FILM);
      expect(filmRepository.save).toHaveBeenCalledWith(filmToAdd);
    });
  });

  describe('remove', () => {
    it('should call the film repository with the correct arguments', async () => {
      filmRepository.remove.mockImplementation(() => {});

      await filmService.remove(FILMS[0]);

      expect(filmRepository.remove).toHaveBeenCalledWith(FILMS[0]);
    });
  });
});
