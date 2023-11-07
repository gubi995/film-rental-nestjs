import { PickType } from '@nestjs/mapped-types';
import { GetOneFilmRequest } from '../films/films.dto';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class AddFilmToInventoryRequest extends PickType(GetOneFilmRequest, [
  'filmId',
]) {}

export class DeleteFilmToInventoryRequest extends AddFilmToInventoryRequest {
  @IsNumber()
  @Type(() => Number)
  inventoryId: number;
}
