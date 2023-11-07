import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './films/films.entity';
import { FilmsModule } from './films/films.module';
import { InventoriesModule } from './inventories/inventories.module';
import { RentalsModule } from './rentals/rentals.module';
import { Inventory } from './inventories/inventories.entity';
import { Rental } from './rentals/rentals.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'dvdrental',
      // synchronize: true,
      logging: true,
      entities: [Film, Inventory, Rental],
      subscribers: [],
      migrations: [],
    }),
    FilmsModule,
    InventoriesModule,
    RentalsModule,
  ],
})
export class AppModule {}
