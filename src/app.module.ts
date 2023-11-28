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
      host: '127.0.0.1',
      // port: 5433,
      port: 5434,
      username: 'myuser',
      password: 'myuserpassword',
      database: 'filmrental',
      synchronize: true,
      dropSchema: process.env.NODE_ENV === 'test',
      logging: process.env.NODE_ENV === 'test' ? ['warn', 'error'] : true,
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
