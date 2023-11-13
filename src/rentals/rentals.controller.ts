import {
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentFilmRequest, ReturnFilmRequest } from './rentals.dto';
import { FilmsService } from '../films/films.service';

@Controller('films/:filmId/rentals')
export class RentalsController {
  constructor(
    private filmsService: FilmsService,
    private rentalsService: RentalsService,
  ) {}

  @Post()
  async rentFilm(@Param() { filmId }: RentFilmRequest) {
    const film = await this.filmsService.get(
      { filmId },
      {
        relations: { inventories: { rentals: true } },
      },
    );

    const inventory = this.rentalsService.getInventoryAvailableForRent(film);

    const { rentalId } = await this.rentalsService.rentFilm(inventory);

    return { rentalId };
  }

  @Patch(':rentalId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async returnFilm(@Param() { filmId, rentalId }: ReturnFilmRequest) {
    await this.filmsService.get(
      { filmId, inventories: { rentals: { rentalId } } },
      {
        relations: { inventories: { rentals: true } },
      },
    );

    await this.rentalsService.returnFilm(rentalId);
  }
}
