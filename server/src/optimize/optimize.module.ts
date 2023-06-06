import { Module } from '@nestjs/common';
import { OptimizeService } from './optimize.service';
import { OptimizeController } from './optimize.controller';

@Module({
  imports: [],
  controllers: [OptimizeController],
  providers: [OptimizeService]
})
export class OptimizeModule {}
