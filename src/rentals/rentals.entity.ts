import type { Inventory } from '../inventories/inventories.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Rental {
  @PrimaryGeneratedColumn({ name: 'rental_id' })
  rentalId: number;

  @Column({ name: 'rental_date' })
  rentalDate: Date;

  @Column({
    name: 'return_date',
    type: 'timestamp without time zone',
  })
  returnDate: Date | null;

  @ManyToOne('Inventory', 'rentals')
  @JoinColumn({ name: 'inventory_id' })
  inventory: Inventory;
}
