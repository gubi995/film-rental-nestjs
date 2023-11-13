import { PickType } from '@nestjs/mapped-types';
import { GetOneFilmRequest } from '../films/films.dto';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class RentFilmRequest extends PickType(GetOneFilmRequest, ['filmId']) {}

export class ReturnFilmRequest extends RentFilmRequest {
  @IsNumber()
  @Type(() => Number)
  rentalId: number;
}
