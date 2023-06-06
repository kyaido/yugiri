import { Test, TestingModule } from '@nestjs/testing';
import { OptimizeController } from './optimize.controller';
import { OptimizeService } from './optimize.service';

describe('Optimize Controller', () => {
  let controller: OptimizeController;
  let service: OptimizeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OptimizeController],
      providers: [OptimizeService]
    }).compile();

    controller = module.get<OptimizeController>(OptimizeController);
    service = module.get<OptimizeService>(OptimizeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
