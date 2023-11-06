import { Rental } from '../rentals/rentals.entity';
import { Film } from '../films/films.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn({ name: 'inventory_id' })
  inventoryId: number;

  @ManyToOne(() => Film, (film) => film.inventories)
  @JoinColumn({ name: 'film_id' })
  film: Film | null;

  @OneToMany(() => Rental, (rental) => rental.inventories)
  rental: Rental;
}
