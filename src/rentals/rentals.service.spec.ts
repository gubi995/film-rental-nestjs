import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { FILMS } from '../mocks/film';
import { INVENTORIES } from '../mocks/inventory';
import { Rental } from './rentals.entity';

const [INVENTORY] = INVENTORIES;

describe('RentalsService', () => {
  let rentalsService: RentalsService;
  const rentalRepository = {
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RentalsService,
        { provide: getRepositoryToken(Rental), useValue: rentalRepository },
      ],
    }).compile();

    rentalsService = module.get<RentalsService>(RentalsService);
  });

  describe('getInventoryAvailableForRent', () => {
    describe('when there is inventory available for rent', () => {
      describe('and it did not get rented yet', () => {
        it('should return the inventory', () => {
          const [film] = structuredClone(FILMS);
          const [inventory] = structuredClone(INVENTORIES);
          film.inventories.push(inventory);

          rentalsService.getInventoryAvailableForRent(film);
        });
      });

      describe('and it was rented already but returned back', () => {
        it('should return the inventory', () => {
          const [film] = structuredClone(FILMS);
          const [inventory] = structuredClone(INVENTORIES);
          inventory.rentals.push({
            inventory,
            rentalDate: new Date(),
            returnDate: new Date(),
            rentalId: 1,
          });
          film.inventories.push(inventory);

          rentalsService.getInventoryAvailableForRent(film);
        });
      });
    });

    describe('when there is NO inventory available for rent', () => {
      it('should throw a ConflictException error', () => {
        const [film] = structuredClone(FILMS);
        const [inventory] = structuredClone(INVENTORIES);
        inventory.rentals.push({
          inventory,
          rentalDate: new Date(),
          returnDate: null,
          rentalId: 1,
        });
        film.inventories.push(inventory);

        expect(() =>
          rentalsService.getInventoryAvailableForRent(film),
        ).toThrowError(ConflictException);
      });
    });
  });

  describe('rentFilm', () => {
    it('should call the rental repository with the correct arguments and return the rental', async () => {
      jest
        .spyOn(global, 'Date')
        .mockImplementationOnce(() => '2023-11-15T08:59:06.686Z' as any);
      const rental = {
        rentalDate: new Date(),
        returnDate: null,
        inventory: INVENTORY,
      };
      rentalRepository.save.mockImplementation(() => rental);

      const newRental = await rentalsService.rentFilm(INVENTORY);

      expect(newRental).toBe(rental);
      expect(rentalRepository.save).toHaveBeenCalledWith(rental);
    });
  });

  describe('returnFilm', () => {
    it('should call the rental repository with the correct arguments', async () => {
      const dateSpy = jest.spyOn(global, 'Date');
      const rentalId = 1;
      rentalRepository.update.mockImplementation(() => {});

      await rentalsService.returnFilm(rentalId);

      const [returnDate] = dateSpy.mock.instances;
      expect(rentalRepository.update).toHaveBeenCalledWith(
        { rentalId },
        { returnDate },
      );
    });
  });
});
