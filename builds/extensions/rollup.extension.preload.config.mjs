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
import { build } from 'esbuild';
import builtins from 'rollup-plugin-node-builtins';



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



export default [{
    input: [`./src/parts/extension/${filenameValue}`,],
    output: {
        dir: './esbuild/extensionManager/',
        format: 'cjm',
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
        

        commonjs(
            { 
                transformMixedEsModules: true,
            dynamicRequireTargets: [
                'node_modules/electron/**', // 根据你的 Electron 版本和目录结构进行调整
              ],ignoreDynamicRequires: [
                'electron',
              ],
            
            sourceMap: false,
            }
        ),
        // nodePolyfills( /* options */),
        // builtins(),

          replace({
            preventAssignment: false,
            'process.env.NODE_ENV': '"development"'
         }),
        postcss({
            extract: true,
            modules:true
          }),

    ],
    external: ['electron', '/@babel\/runtime/'],


},]
