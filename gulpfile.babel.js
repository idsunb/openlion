const gulp = require('gulp');
const esbuild = require('gulp-esbuild');
const { spawn } = require('child_process');
const { nodeExternalsPlugin } = require('esbuild-node-externals');
const path = require('path');
// const htmlReplace = require('gulp-html-replace');
// import { polyfillNode } from "esbuild-plugin-polyfill-node";
const {polyfillNode} = require('esbuild-plugin-polyfill-node');
const { nodeBuiltin } = require('esbuild-node-builtin')
const NodeResolvePlugin =require('@esbuild-plugins/node-resolve') 


const { NodeModulesPolyfillPlugin } = require('@esbuild-plugins/node-modules-polyfill')


const rollup = require('gulp-rollup');
// const rollup = require('rollup-stream')


const debug = require('gulp-debug'); // 导入 gulp-debug 插件
const rename = require('gulp-rename');
const shell = require('gulp-shell');
const { gunzip } = require('zlib');

import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import nodePolyfills from 'rollup-plugin-polyfill-node';

let electronProcess;




gulp.task('esbuildRenderer', function () {
  return gulp.src('src/index.jsx')
    .pipe(esbuild({
      entryPoints: ['./src/index.jsx'],
      bundle: true,
      platform: 'node',
      format: 'esm',
      target: ['chrome98','node20'],
      loader: { '.js': 'jsx', '.css':'local-css' },
      external: ['electron','fs'],
      sourcemap: true,
      // plugins: [
      //   // NodeModulesPolyfillPlugin(),
      //   NodeGlobalsPolyfillPlugin({
      //     process: true,
      //     buffer: true,
      //     // define: { 'process.env.var': '"hello"' }, // inject will override define, to keep env vars you must also pass define here https://github.com/evanw/esbuild/issues/660
      // }),
      // ],
      define: {
        'process.env.NODE_ENV': '"development"',
      },
      // plugins: [
      //   // nodeExternalsPlugin(),
      //   polyfillNode({
      //     polyfills:{fs:false}
      //     // Options (optional)
      //   }),
      // ],


      // plugins: [
        // nodeExternalsPlugin(),
        // nodeModulesPolyfillPlugin({
        //   globals: {
        //     process: true,
        //     Buffer: true,
        //   },
        //   modules: {
        //     buffer:true,
        //     worker_thread:false,
        //     process:true,
        //     events:true,
        //     fs: true,
        //     crypto:true,
        //     util:true,
        //     stream:true,
        //     path:true,
        //   },
        // }),
        // nodeBuiltin()

          // Options (optional)
      // ],
      // plugins: [ESBuildNodePolyfillsPlugin],


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


gulp.task('watchExtensionPreload', function () {
  gulp.watch(['src/workspace/lionAPI/openlion.js','src/extensionpreload.js'], gulp.series('esbuildExtensionPreload'));
});
gulp.task('watchmain',gulp.parallel('watchmain','watchpreload','watchrenderer','watchExtensionPreload'));


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


// gulp.task('buildex4', gulp.parallel(shell.task([
//   'rollup -c ./builds/extensions/rollup.langchain.config.mjs -w',
// ]),shell.task('rollup -c ')));



let langchainProcess;
let langchainChatProcess;
const kill = require('tree-kill');

gulp.task('buildex4', function (done) {
  // 如果进程已经存在，则杀死进程
  if (langchainProcess) {
    langchainProcess.kill();
  }
  if (langchainChatProcess) {
    langchainChatProcess.kill();
  }
  
  // 启动进程
  langchainProcess = spawn('rollup.cmd', ['-c', './builds/extensions/rollup.langchain.config.mjs', '-w'], { detached: true, stdio: 'inherit' });
  langchainChatProcess = spawn('rollup.cmd', ['-c', './builds/extensions/rollup.langchain.chat.config.mjs', '-w'], { detached: true, stdio: 'inherit' });
  langchainChatProcess = spawn('rollup.cmd', ['-c', './builds/extensions/rollup.langchain.template.config.mjs', '-w'], { detached: true, stdio: 'inherit' });

  
  // 解除进程的引用
  langchainProcess.unref();
  langchainChatProcess.unref();

  // 在任务结束时，杀死进程，目前看没用，以后再试
  process.on('SIGINT', () => {
    process.kill(langchainProcess.pid);
    process.kill(langchainChatProcess.pid);
    console.log('Received SIGINT signal.');
      process.exit(0);

  });

  done()
});




// gulp.task('buildex4', function () {
//   return gulp.src(['extensions/langchain/extension.js','extensions/langchain/index.js','extensions/langchain/chat/chat.js'])
//     .pipe(esbuild({
//     //   alias: {
//     //     // This Rollup aliases are extracted from @esbuild-plugins/node-modules-polyfill,
//     //     // see https://github.com/remorses/esbuild-plugins/blob/master/node-modules-polyfill/src/polyfills.ts
//     //     // process and buffer are excluded because already managed
//     //     // by node-globals-polyfill
//     //     util: "rollup-plugin-node-polyfills/polyfills/util",
//     //     sys: "util",

//     //     events: "rollup-plugin-node-polyfills/polyfills/events",
//     //     stream: "rollup-plugin-node-polyfills/polyfills/stream",
//     //     path: "rollup-plugin-node-polyfills/polyfills/path",
//     //     querystring: "rollup-plugin-node-polyfills/polyfills/qs",
//     //     punycode: "rollup-plugin-node-polyfills/polyfills/punycode",
//     //     url: "rollup-plugin-node-polyfills/polyfills/url",
//     //     string_decoder: "rollup-plugin-node-polyfills/polyfills/string-decoder",
//     //     http: "rollup-plugin-node-polyfills/polyfills/http",
//     //     https: "rollup-plugin-node-polyfills/polyfills/http",
//     //     os: "rollup-plugin-node-polyfills/polyfills/os",
//     //     assert: "rollup-plugin-node-polyfills/polyfills/assert",
//     //     constants: "rollup-plugin-node-polyfills/polyfills/constants",
//     //     _stream_duplex: "rollup-plugin-node-polyfills/polyfills/readable-stream/duplex",
//     //     _stream_passthrough: "rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough",
//     //     _stream_readable: "rollup-plugin-node-polyfills/polyfills/readable-stream/readable",
//     //     _stream_writable: "rollup-plugin-node-polyfills/polyfills/readable-stream/writable",
//     //     _stream_transform: "rollup-plugin-node-polyfills/polyfills/readable-stream/transform",
//     //     timers: "rollup-plugin-node-polyfills/polyfills/timers",
//     //     console: "rollup-plugin-node-polyfills/polyfills/console",
//     //     vm: "rollup-plugin-node-polyfills/polyfills/vm",
//     //     zlib: "rollup-plugin-node-polyfills/polyfills/zlib",
//     //     tty: "rollup-plugin-node-polyfills/polyfills/tty",
//     //     domain: "rollup-plugin-node-polyfills/polyfills/domain",
//     //     // process: "rollup-plugin-node-polyfills/polyfills/process-es6",
//     //     // fs: "rollup-plugin-node-polyfills/polyfills/browserify-fs",
//     //     // buffer: "rollup-plugin-node-polyfills/polyfills/buffer-es6",
//     // },
//       target: ['chrome98'],
//       bundle: true,
//       minify: true,
//       platform: 'node',
//       format: 'cjs',
//       loader:{ '.js': 'jsx','.css':'local-css' },
//       // packages: 'external',
//       // mainFields: ['module', 'main'],
//       external:['electron'],
//       sourcemap: true,

//       // polyfills: ['@babel/polyfill'],


//       // conditions: ['node'],
//       // mainFields: ['module', 'jsnext:main', 'jsnext'],
//       // plugins: [
//       //   nodeExternalsPlugin(), // 使用插件
//       // ],
//       // plugins: [
//       //   // nodeExternalsPlugin(),
//       //   NodeResolvePlugin({
//       //     extensions: ['.ts', '.js'],
//       //     onResolved: (resolved) => {
//       //         if (resolved.includes('node_modules')) {
//       //             return {
//       //                 external: true,
//       //             }
//       //         }
//       //         return resolved
//       //     },
//       // }),
//       //   polyfillNode({
//       //     polyfills:{worker_threads:false,fs:false}
//       //   }),
//       // ],

//     }))
//     .pipe(gulp.dest('c:\\Users\\Administrator\\AppData\\Roaming\\openlion\\extensions\\langchain\\'))

// });


gulp.task('watchex4', function () {
  gulp.watch(['extensions/langchain/**/*.js','src/**/*.js'], gulp.series('buildex4'));
});
gulp.task('watchex3', function () {
  gulp.watch(['extensions/chatextension3/**/*.js','src/**/*.js'], gulp.series('buildex3'));
});
gulp.task('watchex1', function () {
  gulp.watch(['extensions/chatextension/**/*.jsx','extensions/chatextension/**/*.js','src/**/*.js'], gulp.series('buildex1'));
});

gulp.task('watch', gulp.parallel('watchex3','watchex4','watchex1'));




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
  // electronProcess.unref();
  done();

}

const psTree = require('ps-tree');

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


