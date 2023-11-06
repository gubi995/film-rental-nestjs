import { Inventory } from '../inventories/inventories.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Film {
  @PrimaryGeneratedColumn({ name: 'film_id' })
  filmId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ name: 'release_year' })
  releaseYear: number;

  @Column({ name: 'rental_rate' })
  rentalRate?: number;

  @OneToMany(() => Inventory, (inventory) => inventory.film)
  inventories: Inventory[];
}
