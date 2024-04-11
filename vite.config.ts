import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/hanoi-tower/',
  plugins: [react()],
  preview: { port: 3000, strictPort: true }
});
