import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [AppService, PrismaService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('a + 1', async () => {
    const result = await service.getHello('2');
    expect(result).toBe(2);
  });

  it('should return BadRequestException when input not number', async () => {
    const result = async () => {
      await service.getHello('sdfsf');
    };
    await expect(result).rejects.toThrowError(new BadRequestException());
  });

  describe('names', () => {
    const name = 'test';
    let id: number;

    it('should save name when input name', async () => {
      const result = await service.save(name);

      id = result.id;

      expect(result.name).toBe(name);
    });

    it('findById', async () => {
      const user = await service.findById(id);
      expect(user).toStrictEqual({ name, id });
    });
  });
});
