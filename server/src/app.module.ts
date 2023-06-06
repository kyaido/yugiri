import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { OptimizeModule } from './optimize/optimize.module';
import { TrashModule } from './trash/trash.module';

@Module({
  imports: [OptimizeModule, TrashModule, ScheduleModule.forRoot()]
})
export class AppModule {}
