import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import esbuild from 'rollup-plugin-esbuild'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import postcss from 'rollup-plugin-postcss'
import html from '@rollup/plugin-html'
import cleaner from 'rollup-plugin-cleaner';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import json from '@rollup/plugin-json';
import copy from 'rollup-plugin-copy'
import del from 'rollup-plugin-delete'




const argv = process.argv;
const filenameIndex = argv.indexOf('--filename');
let filenameValue

if (filenameIndex !== -1 && filenameIndex + 1 < argv.length) {
  // 如果找到--filename参数且它的下一个元素存在，就获取它的值
  filenameValue = argv[filenameIndex + 1];
  console.log(`--filename 参数的值是: ${filenameValue}`);
} else {
  console.log('--filename 参数未指定或没有值');
}

const dirPosition = argv.indexOf('--dirposition');
let dirPositionValue

if (dirPosition !== -1 && dirPosition + 1 < argv.length) {
  // 如果找到--filename参数且它的下一个元素存在，就获取它的值
  dirPositionValue = argv[dirPosition + 1];
  console.log(`--filename 参数的值是: ${dirPositionValue}`);
} else {
  console.log('--filename 参数未指定或没有值');
}





export default [{
    input: [`./extensions/${dirPositionValue}/${filenameValue}.js`,],
    // input: [`./extensions/langchain/template/template.js`,],
    output: {
        dir: `C://Users//Administrator//AppData//Roaming//openlion//extensions/${dirPositionValue}`,
        format: 'esm',
        sourcemap: true,

    },
    resolve: {
    },
    plugins: [
        // babel({
        //   presets: ['@babel/preset-react'],
        // }),
        del({
          targets: `C://Users//Administrator//AppData//Roaming//openlion//extensions/${dirPositionValue}/`,
          runOnce: true,
          force: true,

        }),


  // 使用 rollup-plugin-node-globals 处理全局变量

        esbuild({
            // esbuild 配置项
            // include: /\.[jt]sx?$/, // default, inferred from `loaders` option
            // exclude: /node_modules/, // default
            target: ['es2022', 'node18'],
            minify: true,
            platform: 'node',
            format: 'esm',
            loaders: {
                // Add .json files support
                '.json': 'json',
                // Enable JSX in .js files too
                '.js': 'jsx',
            },
            // packages: 'external',
            // mainFields: ['module', 'main'],
            define: {
                __VERSION__: '"x.y.z"',
            },
            sourcemap: false,

        }),


        // resolve({browser: true}),
        resolve(),
        commonjs(),

        nodePolyfills(),
        json(),
        builtins(),
        copy({
          
          targets: [
            { src: `./extensions/${dirPositionValue}/extension.json`, dest: `C:/Users/Administrator/AppData/Roaming/openlion/extensions/${dirPositionValue}` },
            { src: `./extensions/${dirPositionValue}/assets/*`, dest: `C:/Users/Administrator/AppData/Roaming/openlion/extensions/${dirPositionValue}/assets` }
          ]
        }),


          replace({
            preventAssignment: false,
            'process.env.NODE_ENV': '"development"'
         }),
        postcss({
            extract: true,
            modules:true
          }),
        html({fileName:`${filenameValue}.html`,title:'chat',template: ({ attributes, bundle, files, publicPath, title }) => { 
            return `<!DOCTYPE html>
            <html>
              <head>
                <meta charset="UTF-8">
                <title>2</title>
                <link rel="stylesheet" type="text/css" href="${filenameValue}.css">
              </head>
              <body>
                <div id="root"></div>
                <script type="module" src="./${filenameValue}.js"></script>
            
              </body>
            </html>`}
    }),


    ],
    external: ['electron', '/@babel\/runtime/',],
    
    // exclude: "**/node_modules/**"


},]
