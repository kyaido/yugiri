import { Controller, Query, Post, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { OptimizeDto } from './optimize.dto';
import { OptimizeService } from './optimize.service';

@Controller('optimize')
export class OptimizeController {
  constructor(private optimizeService: OptimizeService) {}

  @Post()
  @UseInterceptors(FileInterceptor('inputFile'))
  async optimize(@Query() optimizeDto: OptimizeDto, @UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const result = await this.optimizeService.optimize(optimizeDto, file, req);
    return result;
  }
}
