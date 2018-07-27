import HtmlWebpackPlugin from 'html-webpack-plugin';
import epubSettings from './epub.json';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { kebabCase } from 'lodash';

const config = {
  entry: ['./src/js/index.js', './src/css/index.less'],
  mode: process.env.NODE_ENV,
  output: {
    path:
      __dirname + `/reader/epub_content/${kebabCase(epubSettings.name)}/OEBPS/`,
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/epub.css'
    }),
    new HtmlWebpackPlugin({
      title: epubSettings.title,
      pages: epubSettings.pages,
      // Load a custom template (lodash by default see the FAQ for details)
      template: 'src/index.hbs',
      filename: 'index.xhtml',
      xhtml: true
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/mimetype',
        to: __dirname + `/reader/epub_content/${kebabCase(epubSettings.name)}/`
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: 'src/container.xml',
        to:
          __dirname +
          `/reader/epub_content/${kebabCase(epubSettings.name)}/META-INF/`,
        toType: 'dir'
      }
    ])
  ]
};

export default config;
