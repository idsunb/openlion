import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
    root: './extensions/chatextension',
    server: {
        port: 5181,
        // proxy: {

    },

    build: {
        rollupOptions: {
          output: {
            format: 'es', // 输出为 ESM 格式
          },
        },
      },

});
