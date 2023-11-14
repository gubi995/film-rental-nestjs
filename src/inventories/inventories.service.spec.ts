import { Test, TestingModule } from '@nestjs/testing';
import { InventoriesService } from './inventories.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Inventory } from './inventories.entity';

describe('InventoriesService', () => {
  let inventoryService: InventoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventoriesService,
        {
          provide: getRepositoryToken(Inventory),
          useValue: {},
        },
      ],
    }).compile();

    inventoryService = module.get<InventoriesService>(InventoriesService);
  });

  it('should be defined', () => {
    expect(inventoryService).toBeDefined();
  });
});
