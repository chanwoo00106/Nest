import { Test, TestingModule } from '@nestjs/testing';
import { UseService } from './use.service';

describe('UseService', () => {
  let service: UseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UseService],
    }).compile();

    service = module.get<UseService>(UseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
