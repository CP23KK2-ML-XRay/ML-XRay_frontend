import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/kk2/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': "/src",
    },
  },
})
