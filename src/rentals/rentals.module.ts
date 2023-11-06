import { Module } from '@nestjs/common';
import { RentalsController } from './rentals.controller';
import { RentalsService } from './rentals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './rentals.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rental])],
  controllers: [RentalsController],
  providers: [RentalsService],
})
export class RentalsModule {}
