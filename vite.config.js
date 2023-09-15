import { defineConfig } from 'vite';
import path from 'path';


export default defineConfig({
    build: {
      rollupOptions: {
        input: {
          chat: 'extensions/langchain/extension.js',
        },
        output: {
            dir: `C://Users//Administrator//AppData//Roaming//openlion//extensions//langchain//chat//`,
            entryFileNames: `chat.js`,
            chunkFileNames: 'chunks/[name]-[hash].js',
            assetFileNames: 'assets/[name]-[hash].[ext]',
        }
      }
    }
  })
  
