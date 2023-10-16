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






export default [{
    input: ['./extensions/langchain/template/template.js',],
    output: {
        dir: 'C://Users//Administrator//AppData//Roaming//openlion//extensions//langchain//template',
        format: 'esm',
        sourcemap: true,

    },
    resolve: {
      alias: {
        'pyodide': '111',
      }
    },
    plugins: [
        // babel({
        //   presets: ['@babel/preset-react'],
        // }),
        cleaner({
          targets: [
            'C://Users//Administrator//AppData//Roaming//openlion//extensions//langchain//template'
          ]
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


        //   replace({
        //     preventAssignment: false,
        //     'process.env.NODE_ENV': '"development"'
        //  })
        postcss({
            extract: true,
            modules:true
          }),
        html({fileName:'template.html',title:'chat',template: ({ attributes, bundle, files, publicPath, title }) => { 
            return `<!DOCTYPE html>
            <html>
              <head>
                <meta charset="UTF-8">
                <title>2</title>
                <link rel="stylesheet" href="https://pyscript.net/latest/pyscript.css" />
                <script defer src="https://pyscript.net/latest/pyscript.js"></script>
                <link rel="stylesheet" type="text/css" href="template.css">
              </head>
              <body>
                <div id="root"></div>
                <script type="module" src="./template.js"></script>
            
              </body>
            </html>`}
    }),
    ],
    external: ['electron', '/@babel\/runtime/',],
    
    // exclude: "**/node_modules/**"


},]
