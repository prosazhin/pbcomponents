import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dts from 'vite-plugin-dts';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [vue(), dts(), cssInjectedByJsPlugin()],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
  build: {
    minify: true,
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'pbcomponents',
      formats: ['es', 'cjs'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          tailwindcss: 'tailwindcss',
        },
      },
    },
  },
});
