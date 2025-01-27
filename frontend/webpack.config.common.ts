import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'



const config: webpack.Configuration = {
  context: path.resolve(__dirname, 'src'),
  entry: './index.tsx',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public/icons8-star.png'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: /\.module\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.module\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]', // Уникальные имена классов
              },
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: { plugins: [require('postcss-preset-env')] },
            },
          },
          'sass-loader',
        ],
      },
      // {
      //   test: /\.module\.css$/i, // Подключаем только файлы с .module.css
      //   use: [
      //     'style-loader',
      //     cssLoaderWithModules, // Используем наш объект
      //   ],
      // },
      {
        test: /\.[tj]sx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|png|jpg|jpeg|gif|mp3)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
              svgoConfig: {
                plugins: [
                  {
                    name: 'convertColors',
                    params: {
                      currentColor: true,
                    }
                  }
                ]
              }
            }
          }
        ],
      }
    ],
  },
}

export default config
