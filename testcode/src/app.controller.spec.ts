import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [AppController],
      providers: [AppService, PrismaService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return 3', async () => {
      const result = appController.test({ num: { num: 3 } });
      expect(result).toBe(3);
    });

    it('should throw BadRequest Error', async () => {
      const result = async () => {
        const num: any = '3';
        return await appController.test({ num: { num } });
      };
      expect(result).rejects.toThrowError(new BadRequestException());
    });
  });
});
