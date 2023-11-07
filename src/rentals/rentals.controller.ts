import { Controller } from '@nestjs/common';

@Controller('films/:filmId/inventories/:inventoryId/rentals')
export class RentalsController {
  constructor() {}
}
