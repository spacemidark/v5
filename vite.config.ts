import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  // Required for loading generated assets inside the desktop app.
  base: './',
  plugins: [
    { enforce: 'pre', ...mdx({ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] }) },
    react(),
  ],
});
