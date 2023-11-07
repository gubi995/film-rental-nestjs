import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FilmsService } from '../films/films.service';
import {
  AddFilmToInventoryRequest,
  DeleteFilmToInventoryRequest,
} from './inventories.dto';
import { InventoriesService } from './inventories.service';

@Controller('films/:filmId/inventories')
export class InventoriesController {
  constructor(
    private filmsService: FilmsService,
    private inventoriesService: InventoriesService,
  ) {}

  @Post()
  async create(@Param() { filmId }: AddFilmToInventoryRequest) {
    const film = await this.filmsService.getOne(filmId, {
      relations: { inventories: true },
    });
    const { inventoryId } = await this.inventoriesService.create(film);

    return { inventoryId };
  }

  @Delete(':inventoryId')
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

    this.inventoriesService.validateIfFilmBelongsToInventory(film, inventory);

    await this.inventoriesService.remove(inventory);
  }
}
