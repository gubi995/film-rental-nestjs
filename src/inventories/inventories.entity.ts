import type { Rental } from '../rentals/rentals.entity';
import type { Film } from '../films/films.entity';
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

  @ManyToOne('Film', 'inventories')
  @JoinColumn({ name: 'film_id' })
  film: Film | null;

  @OneToMany('Rental', 'inventory')
  rentals: Rental[];
}
