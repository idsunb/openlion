import { defineConfig } from 'vite';
import electron from 'vite-electron-plugin'


export default defineConfig({
  // plugins: [react()],

  resolve: {
    // Some libs that can run in both Web and Node.js, such as `axios`, we need to tell Vite to build them in Node.js.
    browserField: false,
    conditions: ['node'],
    mainFields: ['module', 'jsnext:main', 'jsnext'],
  },
  plugins: [
    electron({
      include: ['electron'],
      main: {
        entry: '/src/main.js', // 此处指向electron主进程文件
      },
    }),
  ]});