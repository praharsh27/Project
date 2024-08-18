import { defineConfig } from 'vite';  // Ensure this import is correct
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Project-One/',  // Correct base path for GitHub Pages
});
