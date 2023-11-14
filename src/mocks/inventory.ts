import { Inventory } from '../inventories/inventories.entity';
import { FILMS } from './film';

export const INVENTORIES: Inventory[] = [
  {
    inventoryId: 1,
    film: FILMS[0],
    rentals: [],
  },
];
