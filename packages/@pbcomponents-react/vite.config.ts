import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import preserveDirectives from 'rollup-preserve-directives';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  resolve: { alias: { '@': resolve(__dirname, 'src') } },
  plugins: [react(), tailwindcss(), dts({ rollupTypes: true }), libInjectCss(), preserveDirectives()],
  build: {
    minify: true,
    cssCodeSplit: true,
    lib: { entry: resolve(__dirname, 'src/index.ts'), name: 'pbcomponents', formats: ['es', 'cjs'], fileName: 'index' },
    rollupOptions: {
      external: ['react', 'react-dom', 'tailwindcss'],
      output: {
        exports: 'named',
        globals: { react: 'React', 'react/jsx-runtime': 'react/jsx-runtime', 'react-dom': 'ReactDOM', tailwindcss: 'tailwindcss' },
      },
    },
  },
});
