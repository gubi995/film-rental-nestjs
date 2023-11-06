import { PickType } from '@nestjs/mapped-types';
import { GetOneFilmRequest } from '../films/films.dto';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class DeleteInventoryRequest {
  @IsNumber()
  @Type(() => Number)
  inventoryId: number;
}

export class AddFilmToInventoryRequest extends PickType(GetOneFilmRequest, [
  'filmId',
]) {
  @IsNumber()
  @Type(() => Number)
  inventoryId: number;
}

export class DeleteFilmToInventoryRequest extends AddFilmToInventoryRequest {}
