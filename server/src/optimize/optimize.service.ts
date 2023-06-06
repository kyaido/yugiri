import { Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';
import fs from 'fs';
import mkdirp from 'mkdirp';
import moment from 'moment';
import imageType, { ImageType } from 'image-type';
import imagemin, { Plugin } from 'imagemin';
import prettyHrtime from 'pretty-hrtime';
import prettyBytes from 'pretty-bytes';
import options from './options';

type Queries = {
  isLossy: 'true' | 'false';
  isProgressive: 'true' | 'false';
};

type ExtType = ImageType | 'svg';

type Response = {
  input: {
    size: number;
  };
  output: {
    size: number;
    savedSize: number;
    ratio: number;
    lossy: boolean;
    progressive: boolean;
    duration: string;
    url: string;
  };
};

const isTrue = (boolString: Queries['isLossy'] | Queries['isProgressive']): boolean => {
  return boolString === 'true';
};

const getPlugins = (type: ExtType, queries: Queries) => {
  const plugins: Plugin[] = [];

  if (isTrue(queries.isLossy)) {
    options.pluginList[type]['lossyPlugins'].forEach((plugin: Plugin) => {
      plugins.push(plugin);
    });
  }
  options.pluginList[type]['losslessPlugins'].forEach((plugin: Plugin) => {
    plugins.push(plugin);
  });
  if (isTrue(queries.isProgressive) && type === 'jpg') {
    options.pluginList[type]['progressivePlugins'].forEach((plugin: Plugin) => {
      plugins.push(plugin);
    });
  }
  return plugins;
};

@Injectable()
export class OptimizeService {
  private readonly logger = new Logger(OptimizeService.name);

  async optimize(queries: Queries, file: Express.Multer.File, req: Request) {
    const date = moment().format('YYMMDD');
    const now = Date.now();
    const publicDir = 'dist/public';
    const outputDir = `optimized/${date}/${now}`;

    try {
      await mkdirp(`${publicDir}/${outputDir}`);
      const time = process.hrtime();
      const content = file.buffer;
      const filename = file.originalname;
      const fileType = imageType(content);
      const extType: ExtType = fileType ? fileType.ext : 'svg'; // imageType can't detect svg
      const plugins = getPlugins(extType, queries);
      const pluginsFallback = getPlugins(extType, { isLossy: 'false', isProgressive: 'false' });

      let newContent: Buffer;
      try {
        newContent = await imagemin.buffer(content, { plugins });
      } catch (err) {
        // In case of failure, retry lossless only
        newContent = await imagemin.buffer(content, { plugins: pluginsFallback });
        this.logger.error(err);
      }
      await fs.promises.writeFile(`${publicDir}/${outputDir}/${filename}`, newContent, 'binary');

      const beforeSize = content.length;
      const afterSize = newContent.length;
      const savedSize = beforeSize - afterSize;
      const savedPercent = (savedSize / beforeSize) * 100;
      const durationTime = prettyHrtime(process.hrtime(time));
      const base = req.protocol + '://' + req.get('host');

      const response: Response = {
        input: {
          size: beforeSize,
        },
        output: {
          size: afterSize,
          savedSize: savedSize,
          ratio: savedPercent,
          lossy: isTrue(queries.isLossy),
          progressive: isTrue(queries.isProgressive),
          duration: durationTime,
          url: `${base}/${outputDir}/${filename}`,
        },
      };
      const summary = `${filename}: ${prettyBytes(beforeSize)} -> ${prettyBytes(afterSize)}`;

      return response;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
