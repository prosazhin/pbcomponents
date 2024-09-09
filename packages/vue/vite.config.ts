import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [vue(), dts({ rollupTypes: true }), libInjectCss()],
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
      external: ['vue', 'tailwindcss'],
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
