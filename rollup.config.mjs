import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import esbuild from 'rollup-plugin-esbuild'
import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'

// import { terser } from 'rollup-plugin-terser';

export default [{
  input: ['extensions/langchain/extension.js','extensions/langchain/index.js',],
  output: {
    dir: 'C://Users//Administrator//AppData//Roaming//openlion//extensions//langchain//',
    format: 'esm',
    sourcemap: true,

  },
  plugins: [
    // babel({
    //   presets: ['@babel/preset-react'],
    // }),
    resolve(),

    esbuild({
      // esbuild 配置项
      // include: /\.[jt]sx?$/, // default, inferred from `loaders` option
      exclude: /node_modules/, // default
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
    commonjs(),
    nodePolyfills( /* options */),


    //   replace({
    //     preventAssignment: false,
    //     'process.env.NODE_ENV': '"development"'
    //  })
  ],
  external: ['electron'],
  external: [/@babel\/runtime/],
  exclude: "**/node_modules/**"

},
{
  input: ['./extensions/langchain/chat/chat.js',],
  output: {
    dir: 'C://Users//Administrator//AppData//Roaming//openlion//extensions//langchain//chat',
    format: 'esm',
    sourcemap: true,

  },
  plugins: [
    // babel({
    //   presets: ['@babel/preset-react'],
    // }),
    resolve(),

    esbuild({
      // esbuild 配置项
      // include: /\.[jt]sx?$/, // default, inferred from `loaders` option
      exclude: /node_modules/, // default
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
    commonjs(),
    nodePolyfills( /* options */),
    // livereload(),
    // serve({
    //   open:true,
    //   openPage:'/chat.html',
    //   port: 8082,
    //   contentBase: 'C://Users//Administrator//AppData//Roaming//openlion//extensions//langchain//chat',
    // })


    //   replace({
    //     preventAssignment: false,
    //     'process.env.NODE_ENV': '"development"'
    //  })
  ],
  external: ['electron'],
  external: [/@babel\/runtime/],
  exclude: "**/node_modules/**"

},



]


console.log(process.execPath);