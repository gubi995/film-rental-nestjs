import { Module } from '@nestjs/common';
import { InventoriesController } from './inventories.controller';
import { InventoriesService } from './inventories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './inventories.entity';
import { FilmsModule } from '../films/films.module';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory]), FilmsModule],
  controllers: [InventoriesController],
  providers: [InventoriesService],
})
export class InventoriesModule {}
