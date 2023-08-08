const gulp = require('gulp');
const webpack = require('webpack-stream');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');


gulp.task('hello', function(cb) {
  console.log('Hello, Gulp!');
    cb();
});


gulp.task('webpackchat1', function () {
    return gulp.src('extensions/chatextension/index.js') // 输入文件路径
      .pipe(webpack({
        // mode: 'production',
        entry: {
            chat: './extensions/chatextension/index.js',
        },
        output: {
          filename: 'bundle.js'
        },
        plugins: [
          new HtmlWebpackPlugin({
            title: 'Chat1 Extension',
            filename: 'index.html',
            template: './extensions/chatextension/index.html',
            chunks: ['chat'],
          }),
          new CopyWebpackPlugin({
            patterns: [
              { from: 'extensions/chatextension/extension.json', to: 'extension.json' },
            ],
          }),
        ],
        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env', '@babel/preset-react']
                }
              }
            }
          ]
        }
      })) // 使用 webpack-stream 插件，传递 webpack 配置
      .pipe(gulp.dest(path.resolve('C:\\Users\\Administrator\\AppData\\Roaming\\openlion\\extensions','chat1'))); // 输出文件路径
  });

  gulp.task('webpackchat2', function () {
    return gulp.src('extensions/chatextension2/index.js') // 输入文件路径
      .pipe(webpack({
        // mode: 'production',
        output: {
          filename: 'bundle.js'
        },
        plugins: [
          new CopyWebpackPlugin({
            patterns: [
              { from: 'extensions/chatextension2/extension.json', to: 'extension.json' },
            ],
          }),
        ],
        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env', '@babel/preset-react']
                }
              }
            }
          ]
        }
      })) // 使用 webpack-stream 插件，传递 webpack 配置
      .pipe(gulp.dest(path.resolve('C:\\Users\\Administrator\\AppData\\Roaming\\openlion\\extensions','chat2'))); // 输出文件路径
  });



  
  exports.default = gulp.series('hello','webpackchat1','webpackchat2'); // 定义默认任务


//   function defaultTask(cb) {
//     // place code for your default task here
//     cb();
//   }
  
//   exports.default = defaultTask


