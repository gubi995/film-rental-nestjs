import { Inventory } from '../inventories/inventories.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Rental {
  @PrimaryGeneratedColumn({ name: 'rental_id' })
  rentalId: number;

  @Column({ name: 'rental_date' })
  rentalDate: Date;

  @Column({ name: 'return_date' })
  returnDate: Date;

  @ManyToOne(() => Inventory, (inventory) => inventory.rental)
  @JoinColumn({ name: 'inventory_id' })
  inventories: Inventory[];
}
