import advpng from 'imagemin-advpng';
import optipng from 'imagemin-optipng';
import zopfli from 'imagemin-zopfli';
import pngquant from 'imagemin-pngquant';
import jpegtran from 'imagemin-jpegtran';
import guetzli from 'imagemin-guetzli';
import svgo from 'imagemin-svgo';
import gifsicle from 'imagemin-gifsicle';

export default {
  pluginList: {
    png: {
      losslessPlugins: [advpng(), optipng(), zopfli()],
      lossyPlugins: [pngquant({ quality: [0.75, 0.9] })]
    },
    jpg: {
      losslessPlugins: [jpegtran()],
      lossyPlugins: [guetzli()],
      progressivePlugins: [jpegtran({ progressive: true })]
    },
    svg: {
      losslessPlugins: [],
      lossyPlugins: [
        svgo({
          plugins: [{ removeViewBox: false }]
        })
      ]
    },
    gif: {
      losslessPlugins: [gifsicle()],
      lossyPlugins: []
    }
  }
};
