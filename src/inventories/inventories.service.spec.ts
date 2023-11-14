import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { Inventory } from './inventories.entity';
import { FILMS } from '../mocks/film';
import { INVENTORIES } from '../mocks/inventory';

const [INVENTORY] = INVENTORIES;
const [FILM] = FILMS;

describe('InventoriesService', () => {
  let inventoryService: InventoriesService;
  const inventoryRepository = {
    findBy: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventoriesService,
        {
          provide: getRepositoryToken(Inventory),
          useValue: inventoryRepository,
        },
      ],
    }).compile();

    inventoryService = module.get<InventoriesService>(InventoriesService);
  });

  describe('validateIfFilmBelongsToInventory', () => {
    describe('when the film belongs to the inventory', () => {
      it('should NOT throw an error', () => {
        const [film] = structuredClone(FILMS);
        const [inventory] = structuredClone(INVENTORIES);
        film.inventories.push(inventory);

        expect(() =>
          inventoryService.validateIfFilmBelongsToInventory(film, inventory),
        ).not.toThrowError(BadRequestException);
      });
    });

    describe('when the film does NOT belong to the inventory', () => {
      it('should throw a BadRequestException', () => {
        expect(() =>
          inventoryService.validateIfFilmBelongsToInventory(FILM, INVENTORY),
        ).toThrowError(BadRequestException);
      });
    });
  });

  describe('get', () => {
    describe('when a film is found in the repository', () => {
      it('should return it back', async () => {
        inventoryRepository.findOneBy.mockImplementation(() => INVENTORY);

        const inventory = await inventoryService.get(INVENTORY.inventoryId);

        expect(inventory).toBe(INVENTORY);
      });
    });

    describe('when a film is NOT found in the repository', () => {
      it('should throw a NotFoundException', async () => {
        inventoryRepository.findOneBy.mockImplementation(() => null);

        const getInventory = inventoryService.get(INVENTORY.inventoryId);

        expect(getInventory).rejects.toThrowError(NotFoundException);
      });
    });
  });

  describe('create', () => {
    it('should call the inventory repository with the correct arguments and return the inventory', async () => {
      const [film] = FILMS;
      inventoryRepository.save.mockImplementation(() => INVENTORY);

      const newInventory = await inventoryService.create(film);

      expect(newInventory).toBe(INVENTORY);
      expect(inventoryRepository.save).toHaveBeenCalledWith({ film });
    });
  });

  describe('remove', () => {
    it('should call the inventory repository with the correct arguments', async () => {
      inventoryRepository.remove.mockImplementation(() => INVENTORY);

      await inventoryService.remove(INVENTORY);

      expect(inventoryRepository.remove).toHaveBeenCalledWith(INVENTORY);
    });
  });
});
