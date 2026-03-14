import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: '/' for GitHub User Page (abhishekmyana.github.io)
export default defineConfig({
  plugins: [react()],
  base: '/',
})
