import {
  ConflictException,
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

  create() {
    return this.inventoryRepository.save({});
  }

  async getOne(inventoryId: number) {
    const inventory = await this.inventoryRepository.findOneBy({ inventoryId });

    if (!inventory) {
      throw new NotFoundException(`Inventory not found by id: ${inventoryId}.`);
    }

    return inventory;
  }

  async remove(inventory: Inventory) {
    await this.inventoryRepository.remove(inventory);
  }

  addFilmToInventory(film: Film, inventory: Inventory) {
    inventory.film = film;

    return this.inventoryRepository.save(inventory);
  }

  checkIfFilmBelongsToInventory(film: Film, inventory: Inventory) {
    const isPartOfTheInventory = film.inventories.find(
      (filmInventory) => filmInventory.inventoryId === inventory.inventoryId,
    );

    return isPartOfTheInventory;
  }
}
