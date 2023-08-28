import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({



    build: {
        format: 'esm',

        rollupOptions: {
          output: {
            format: 'es', // 输出为 ESM 格式
          },
        },
      },
});
