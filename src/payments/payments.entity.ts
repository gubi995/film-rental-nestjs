import { Rental } from '../rentals/rentals.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn({ name: 'payment_id' })
  paymentId: number;

  @Column()
  amount: number;

  @Column({ name: 'payment_date' })
  paymentDate: Date;

  @ManyToOne(() => Rental, (rental) => rental.payment)
  @JoinColumn({ name: 'rental_id' })
  rentals: Rental[];
}
