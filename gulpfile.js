const gulp = require('gulp');
const esbuild = require('gulp-esbuild');
const { spawn } = require('child_process');
const { nodeExternalsPlugin } = require('esbuild-node-externals');

const path = require('path');
// const htmlReplace = require('gulp-html-replace');

const debug = require('gulp-debug'); // 导入 gulp-debug 插件
const rename = require('gulp-rename');
const shell = require('gulp-shell');
const { gunzip } = require('zlib');

let electronProcess;




gulp.task('esbuildRenderer', function () {
  return gulp.src('src/index.jsx')
    .pipe(esbuild({
      entryPoints: ['./src/index.jsx'],
      bundle: true,
      platform: 'node',
      format: 'esm',
      target: ['chrome98'],
      loader: { '.js': 'jsx', '.css':'local-css' },
      external: ['electron'],
      sourcemap: true,

    }))
    .pipe(gulp.dest('./esbuild'));
});

gulp.task('esbuildMain', function () {
  return gulp.src(['src/main.js'])
    .pipe(esbuild({
      bundle: true,
      format: 'cjs',
      // format: 'esm',
      outfile: 'main.js',
      minify: true,
      platform: 'node',
      target: 'chrome89',
      external: ['electron'],
      sourcemap: true,
    }))
    .pipe(gulp.dest('./esbuild'));
});

gulp.task('esbuildPreload', function () {
  return gulp.src(['src/preload.js'])
    .pipe(esbuild({
      bundle: true,
      format: 'cjs',
      // format: 'esm',
      outfile: 'preload.js',
      minify: true,
      platform: 'node',
      target: 'chrome89',
      sourcemap: true,

      external: ['electron'],
    }))
    .pipe(gulp.dest('./esbuild'));
});


gulp.task('watchrenderer', function () {
  gulp.watch(['src/**/*.js','src/**/*.jsx','src/**/*.mjs','src/**/*.css','src/**/*.module.css'], gulp.series('esbuildRenderer'));
});
gulp.task('watchpreload', function () {
  gulp.watch(['src/preload.js'], gulp.series('esbuildPreload'));
});

  // gulp.watch(['src/main.js','src/base/**/*.js'], gulp.series('esbuildMain','runE'));
gulp.task('watchmain', function () {
  gulp.watch(['src/main.js','src/main.mjs','src/base/**/*.js'], gulp.series('esbuildMain' ));
});
gulp.task('watchmain',gulp.parallel('watchmain','watchpreload','watchrenderer'));


gulp.task('esbuildExtensionPreload', function () {
  return gulp.src(['./src/extensionpreload.js'])
    .pipe(esbuild({
      bundle: true,
      format: 'cjs',
      // format: 'esm',
      outfile: 'extensionpreload.js',
      minify: true,
      platform: 'node',
      target: 'chrome89',
      external: ['electron'],
    }))
    .pipe(gulp.dest('./esbuild'));
});








gulp.task('buildex3', function () {
  return gulp.src('extensions/chatextension3/App.js')
    .pipe(esbuild({
      target: ['chrome98'],
      bundle: true,
      minify: true,
      platform: 'node',
      format: 'esm',
      loader:{ '.js': 'jsx' },
      external:['electron'],

    }))
    .pipe(gulp.dest('c:\\Users\\Administrator\\AppData\\Roaming\\openlion\\extensions\\chatextension3\\'))

});
// gulp.task('watch', function () {
//   gulp.watch('extensions/chatextension3/*.js', gulp.series('build'));
// });



gulp.task('buildex1', function () {
  return gulp.src(['extensions/chatextension/index.jsx','extensions/chatextension/extension.js'])
    .pipe(esbuild({
      target: ['es2022', 'node18'],
      bundle: true,
      minify: true,
      platform: 'node',
      format: 'esm',
      loader:{ '.js': 'jsx','.css':'local-css' },
      external:['electron'],
      sourcemap: true,

    }))
    .pipe(gulp.dest('c:\\Users\\Administrator\\AppData\\Roaming\\openlion\\extensions\\chatextension\\'))

});




gulp.task('buildex4', function () {
  return gulp.src(['extensions/langchain/extension.js','extensions/langchain/index.js','extensions/langchain/chat/chat.js'])
    .pipe(esbuild({
      target: ['es2022', 'node18'],
      bundle: true,
      minify: true,
      platform: 'node',
      format: 'esm',
      loader:{ '.js': 'jsx','.css':'local-css' },
      external:['electron'],
      sourcemap: true,

    }))
    .pipe(gulp.dest('c:\\Users\\Administrator\\AppData\\Roaming\\openlion\\extensions\\langchain\\'))

});


gulp.task('watchex4', function () {
  gulp.watch(['extensions/langchain/**/*.js','src/**/*.js'], gulp.series('buildex4'));
});
gulp.task('watchex3', function () {
  gulp.watch(['extensions/chatextension3/**/*.js','src/**/*.js'], gulp.series('buildex3'));
});
gulp.task('watchex1', function () {
  gulp.watch(['extensions/chatextension/**/*.jsx','extensions/chatextension/**/*.js','src/**/*.js'], gulp.series('buildex1'));
});
gulp.task('watchExtensionPreload', function () {
  gulp.watch(['src/extensionpreload.js'], gulp.series('esbuildExtensionPreload'));
});
gulp.task('watch', gulp.parallel('watchex3','watchex4','watchex1', 'watchExtensionPreload'));




gulp.task('openlion', function () {
  return gulp.src('src/workspace/lionAPI/openlion.js')
    .pipe(esbuild({
      target: ['es2022','node18'],
      platform: 'node',
      outfile: 'openlion.js',
      bundle: true,
      minify: true,
      loader:{ '.js': 'jsx' },
      external:['electron'],
    }))
    .pipe(gulp.dest('openlion'))

});

// gulp.task('runE', shell.task([
//   'electron esbuild/main.js'
// ]));

gulp.task('runE', (done) => {
  if (electronProcess) {
    killProcess(electronProcess.pid, () => {
      startElectron(done);
    });
  } else {
    startElectron(done);
  }
});


function startElectron(done) {
  electronProcess = spawn('electron.cmd', ['esbuild/main.js'], { detached: true, stdio: 'inherit' });
  electronProcess.unref();
  done();
}

function killProcess(pid, callback) {
  psTree(pid, (err, children) => {
    process.kill(pid);
    children.forEach((child) => {
      process.kill(child.PID);
    });
    callback();
  });
}



gulp.task('copy', function () {
  return gulp.src(['extensions/**/*','!extensions/**/index.html'])
    .pipe(gulp.dest('C:\\Users\\Administrator\\AppData\\Roaming\\openlion\\extensions\\'));
    
});



gulp.task('hello', function(cb) {
  console.log('Hello, Gulp!');
    cb();
});





gulp.task('test', function () {
return gulp.src(['src/**/*.js','src/**/*.jsx','src/**/*.css','src/**/*.module.css'])
  .pipe(gulp.dest('dist'));
});

exports.default = gulp.series('hello','copy','watch'); // 定义默认任务






console.log(process.env.NODE_ENV)


























// gulp.task('webpackchat1', function () {
//     return gulp.src('extensions/chatextension/index.js') // 输入文件路径
//       .pipe(webpack({
//         mode: 'production',
//         entry: {
//             chat: './extensions/chatextension/index.js',
//         },
//         output: {
//           filename: 'bundle.js'
//         },
//         plugins: [
//           new HtmlWebpackPlugin({
//             title: 'Chat1 Extension',
//             filename: 'index.html',
//             template: './extensions/chatextension/index.html',
//             chunks: ['chat'],
//           }),
//           new CopyWebpackPlugin({
//             patterns: [
//               { from: 'extensions/chatextension/extension.json', to: 'extension.json' },
//             ],
//           }),
//         ],
//         module: {
//           rules: [
//             {
//               test: /\.js$/,
//               exclude: /node_modules/,
//               use: {
//                 loader: 'babel-loader',
//                 options: {
//                   presets: ['@babel/preset-env', '@babel/preset-react']
//                 }
//               }
//             }
//           ]
//         }
//       })) // 使用 webpack-stream 插件，传递 webpack 配置
//       .pipe(gulp.dest(path.resolve('C:\\Users\\Administrator\\AppData\\Roaming\\openlion\\extensions','chat1'))); // 输出文件路径
//   });

//   gulp.task('webpackchat2', function () {
//     return gulp.src('extensions/chatextension2/index.js') // 输入文件路径
//       .pipe(webpack({
//         mode: 'production',
//         entry: {
//           chat: './extensions/chatextension2/index.js',
//       },
//         output: {
//           filename: 'bundle.js'
//         },
//         plugins: [
//           new HtmlWebpackPlugin({
//             title: 'Chat1 Extension',
//             filename: 'index.html',
//             template: './extensions/chatextension2/index.html',
//             chunks: ['chat'],
//           }),
//           new CopyWebpackPlugin({
//             patterns: [
//               { from: 'extensions/chatextension2/extension.json', to: 'extension.json' },
//             ],
//           }),
//         ],
//         module: {
//           rules: [
//             {
//               test: /\.js$/,
//               exclude: /node_modules/,
//               use: {
//                 loader: 'babel-loader',
//                 options: {
//                   presets: ['@babel/preset-env', '@babel/preset-react']
//                 }
//               }
//             }
//           ]
//         }
//       })) // 使用 webpack-stream 插件，传递 webpack 配置
//       .pipe(gulp.dest(path.resolve('C:\\Users\\Administrator\\AppData\\Roaming\\openlion\\extensions','chat2'))); // 输出文件路径
//   });

//   //暂时为2
//   gulp.task('webpackchat3', function () {
//     return gulp.src('extensions/chatextension3/App.js') // 输入文件路径
//       .pipe(webpack({
//         mode: 'production',
//         entry: {
//           chat: './extensions/chatextension3/App.js',
//       },
//         output: {
//           filename: 'App.js'
//         },
//         plugins: [
//           new CopyWebpackPlugin({
//             patterns: [
//               { from: 'extensions/chatextension3/extension.json', to: 'extension.json' },
//             ],
//           }),
//         ],
//         module: {
//           rules: [
//             {
//               test: /\.js$/,
//               exclude: /node_modules/,
//               use: {
//                 loader: 'babel-loader',
//                 options: {
//                   presets: ['@babel/preset-env', '@babel/preset-react']
//                 }
//               }
//             }
//           ]
//         }
//       })) // 使用 webpack-stream 插件，传递 webpack 配置
//       .pipe(gulp.dest(path.resolve('C:\\Users\\Administrator\\AppData\\Roaming\\openlion\\extensions','chat3'))); // 输出文件路径
//   });



  


//   function defaultTask(cb) {
//     // place code for your default task here
//     cb();
//   }
  
//   exports.default = defaultTask


