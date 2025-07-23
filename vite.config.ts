import { defineConfig } from 'vite';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    emptyOutDir: true,
    minify: 'esbuild',
    lib: {
      formats: ['es', 'cjs'],
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'vite-plugin-conceal',
      fileName: (format) => `vite-plugin-conceal.${format}.js`,
    },
    rollupOptions: {
      external: [],
      output: {
        exports: 'named',
        globals: {}
      }
    },
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  plugins: [
    dts(),
  ],
});
