const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// const {electron,renderer,preload} = require('electron');

module.exports = {
  entry: {
    chat: './extensions/chatextension/index.js',
    // bad: './extensions/badextension/index.js',
  },
  // target: 'electron25.3-renderer',
  // target:['electron-main','electron-renderer','electron-preload'],
  // output: {
  //   //根据不同的[name]生成不同的文件夹
  //   path: (chunkData)=>{return path.j('C:\\Users\\Administrator\\AppData\\Roaming\\openlion\\extensions',chunkData.chunk.name)},
  //   // filename: (chunkData) => {
  //   //   return chunkData.chunk.name === 'preload' ? 'preload.js' : '[name].bundle.js';
  //   // },
  //   filename: '[name].bundle.js',
  // },
  output: {
    // path: 'C:\\Users\\Administrator\\AppData\\Roaming\\openlion\\extensions',
    path: path.resolve(__dirname,'dist'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Chat Extension',
      filename: 'index.html',
      template: 'extensions/chatextension/index.html',
      chunks: ['chat'],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'extensions/chatextension/extension.json', to: 'extension.json' },
      ],
    }),
    // new HtmlWebpackPlugin({
    //   title: 'Bad Extension',
    //   filename: 'bad.html',
    //   template: 'extensions/badextension/index.html',
    //   chunks: ['bad'],
    // }),
    new CleanWebpackPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: ['@babel/preset-env', '@babel/preset-react'],
          // }
        },
        
      },
      {
        test: /\.node$/,
        exclude: /node_modules/,
        use: 'node-loader' // node-loader处理.node文件，用于处理C++模块
      },
      
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],

  },
  devServer: {
    static: path.resolve(__dirname,'dist'),
    hot: true,
    port: 8088,
    open: true,
  },
};