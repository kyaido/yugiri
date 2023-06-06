import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import log from '../util/log';

import moment from 'moment';
import trash from 'trash';

@Injectable()
export class TrashService {
  private readonly logger = new Logger(TrashService.name);

  @Cron(CronExpression.EVERY_DAY_AT_6AM, { timeZone: 'Asia/Tokyo' })
  handleCron() {
    const date = moment().format('YYMMDD');
    trash(['dist/public/optimized/*', `!dist/public/optimized/${date}`]).then(() => {
      log('Trash old images.');
    });
    this.logger.debug('Trash old images.');
  }
}
