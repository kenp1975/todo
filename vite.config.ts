import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// GitHub Actions (GitHub Pages) では /todo/、それ以外 (Vercel 等) ではルート
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? '/todo/' : '/',
})
