import { defineConfig } from 'vite';
import liveReload from 'vite-plugin-live-reload';

export default defineConfig({
  plugins: [
    // This watches your Grav templates for changes too
    liveReload(['./templates/**/*.twig','./../../pages/**/*.md']),
  ],

  build: {
    // Generates a manifest.json so Grav can find the hashed CSS files
    manifest: true,
    outDir: 'dist',
    rollupOptions: {
      input: './scss/main.js', // Point to your entry SCSS
    },
  },

  server: {
    // This is required for HMR to work across different ports
    cors: true,
    strictPort: true,
    port: 5173,
    hmr: {
      host: 'localhost',
    },
  },
});

