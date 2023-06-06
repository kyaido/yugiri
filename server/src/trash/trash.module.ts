import { Module } from '@nestjs/common';
import { TrashService } from './trash.service';

@Module({
  providers: [TrashService]
})
export class TrashModule {}
