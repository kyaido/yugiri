const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => ({
  context: path.resolve(__dirname, './client/src'),
  entry: {
    index: './index.tsx',
  },
  output: {
    path: path.resolve(__dirname, './dist/public/scripts'),
    filename: '[name].js',
  },
  devtool: argv.mode === 'development' ? 'cheap-module-source-map' : false,
  module: {
    rules: [
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(?:ts|tsx)$/,
        exclude: [path.resolve(__dirname, 'node_modules/')],
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]_[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'client/public/'),
          to: path.resolve(__dirname, 'dist/public'),
        },
      ],
    }),
  ],
});
