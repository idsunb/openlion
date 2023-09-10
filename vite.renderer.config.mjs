import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'
import renderer from 'vite-plugin-electron-renderer'

// import reactRefresh from '@vitejs/plugin-react-refresh';

// import html from 'vite-plugin-html';



// https://vitejs.dev/config
export default defineConfig({
    server: {
        port: 5180,
        // proxy: {



    },

    resolve: {
      'electron': 'electron'

    },

    
    // plugins: [reactRefresh()],


    // build: {
    //     outDir: '.vite/renderer',
    //     rollupOptions: {
    //       input: {
    //         main_window: './src/index.jsx',
    //         chat_extension: './extensions/chatextension/index.jsx',
    //       }
    //     }
    //   },
    // resolve: {
    //     // 配置将 .js 文件解析为 jsx 格式
    //     loader: {
    //       '.js': 'jsx'
    //     }
    //   },
    // build: {
    //     rollupOptions: {
    //         input: {
    //             main: '/index.html',
    //             ex1: '/extensions/chatextension/index.html',
    //         }
    //     }
        // outDir: 'dist',
        // assetsDir: 'assets',
        // sourcemap: true,
    // },

    plugins: [
        react(
        ),
        renderer({
            nodeIntegration: true,
          }),
    
    ]
    

});

// console.log('------------------vite.renderer.config.mjs');
