const rules = require('./webpack.rules');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
},
{
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    }
  },
},
// {
//   test: /\.(png|jpe?g|gif)$/i,
//   use: [
//     {
//       loader: 'file-loader',
//     },
//   ],
// },
// {
//   test: /\.node$/,
//   exclude: /node_modules/,
//   use: 'node-loader' // node-loader处理.node文件，用于处理C++模块
// },
);

module.exports = {

  // Put your normal webpack config below here
  // target: 'electron-renderer',
  module: {
    rules,
  },
};
