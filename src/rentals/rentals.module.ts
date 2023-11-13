import { Module } from '@nestjs/common';
import { RentalsController } from './rentals.controller';
import { RentalsService } from './rentals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './rentals.entity';
import { FilmsModule } from '../films/films.module';
import { InventoriesModule } from '../inventories/inventories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rental]), FilmsModule, InventoriesModule],
  controllers: [RentalsController],
  providers: [RentalsService],
  exports: [RentalsService],
})
export class RentalsModule {}
