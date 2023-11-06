import {
  BadRequestException,
  ConflictException,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FilmsService } from '../films/films.service';
import {
  AddFilmToInventoryRequest,
  DeleteFilmToInventoryRequest,
  DeleteInventoryRequest,
} from './inventories.dto';
import { InventoriesService } from './inventories.service';

@Controller('inventories')
export class InventoriesController {
  constructor(
    private filmsService: FilmsService,
    private inventoriesService: InventoriesService,
  ) {}

  @Post()
  async create() {
    await this.inventoriesService.create();
  }

  @Delete(':inventoryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() { inventoryId }: DeleteInventoryRequest) {
    const inventory = await this.inventoriesService.getOne(inventoryId);

    await this.inventoriesService.remove(inventory);
  }

  @Patch('films/:filmId')
  async addFilm(@Param() { inventoryId, filmId }: AddFilmToInventoryRequest) {
    const [film, inventory] = await Promise.all([
      this.filmsService.getOne(filmId, {
        relations: { inventories: true },
      }),
      this.inventoriesService.getOne(inventoryId),
    ]);

    if (
      this.inventoriesService.checkIfFilmBelongsToInventory(film, inventory)
    ) {
      throw new ConflictException(
        `Film with id: ${film.filmId} is already belong to the inventory`,
      );
    }

    return this.inventoriesService.addFilmToInventory(film, inventory);
  }

  @Delete('films/:filmId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeFilm(
    @Param() { inventoryId, filmId }: DeleteFilmToInventoryRequest,
  ) {
    const [film, inventory] = await Promise.all([
      this.filmsService.getOne(filmId, {
        relations: { inventories: true },
      }),
      this.inventoriesService.getOne(inventoryId),
    ]);

    if (
      !this.inventoriesService.checkIfFilmBelongsToInventory(film, inventory)
    ) {
      throw new BadRequestException(
        `Film with id: ${film.filmId} does not belongs of the inventory`,
      );
    }

    await this.inventoriesService.remove(inventory);
  }
}
