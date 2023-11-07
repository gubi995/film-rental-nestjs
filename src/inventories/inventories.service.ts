import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './inventories.entity';
import { Film } from '../films/films.entity';

@Injectable()
export class InventoriesService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  create(film: Film) {
    return this.inventoryRepository.save({ film });
  }

  async get(inventoryId: number) {
    const inventory = await this.inventoryRepository.findOneBy({ inventoryId });

    if (!inventory) {
      throw new NotFoundException(`Inventory not found by id: ${inventoryId}.`);
    }

    return inventory;
  }

  async remove(inventory: Inventory) {
    await this.inventoryRepository.remove(inventory);
  }

  createInventoryToFilm(film: Film, inventory: Inventory) {
    inventory.film = film;

    return this.inventoryRepository.save(inventory);
  }

  validateIfFilmBelongsToInventory(film: Film, inventory: Inventory) {
    const isFilmBelongsToTheInventory = film.inventories.find(
      (filmInventory) => filmInventory.inventoryId === inventory.inventoryId,
    );

    if (!isFilmBelongsToTheInventory) {
      throw new BadRequestException(
        `Film with id: ${film.filmId} does not belong to the inventory.`,
      );
    }
  }
}
