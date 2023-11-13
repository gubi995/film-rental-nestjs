import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rental } from './rentals.entity';
import { Repository } from 'typeorm';
import { Film } from '../films/films.entity';
import { Inventory } from '../inventories/inventories.entity';

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental) private rentalRepository: Repository<Rental>,
  ) {}

  getInventoryAvailableForRent(film: Film) {
    const inventory = film.inventories.find(
      ({ rentals }) =>
        rentals.length === 0 ||
        rentals.every(({ returnDate }) => Boolean(returnDate)),
    );

    if (!inventory) {
      throw new ConflictException(
        `Film with id: ${film.filmId} is not available for rent. All pieces are rented out currently`,
      );
    }

    return inventory;
  }

  rentFilm(inventory: Inventory) {
    const newRental = this.rentalRepository.create({
      rentalDate: new Date(),
      returnDate: null,
      inventory,
    });

    return this.rentalRepository.save(newRental);
  }

  async returnFilm(rentalId: number) {
    await this.rentalRepository.update(
      { rentalId },
      { returnDate: new Date() },
    );
  }
}
