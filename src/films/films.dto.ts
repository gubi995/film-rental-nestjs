import { PickType } from '@nestjs/mapped-types';
import { IsString, IsNumber, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class GetFilmRequest {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  releaseYeas?: string;
}

export class GetOneFilmRequest {
  @IsNumber()
  @Type(() => Number)
  filmId: number;
}

export class CreateFilmRequest {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear())
  releaseYear: number;
}

export class DeleteFilmRequest extends PickType(GetOneFilmRequest, [
  'filmId',
]) {}
