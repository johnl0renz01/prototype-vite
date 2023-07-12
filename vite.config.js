import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteRequire } from 'vite-require';
import FullReload from 'vite-plugin-full-reload';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    FullReload(['config/routes.rb', 'app/views/**/*']),
    react(),
    viteRequire(),
  ],
});
