import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change base to '/your-repo-name/' if deploying as a GitHub Project Page
// Leave as './' for GitHub User Pages (username.github.io)
export default defineConfig({
  plugins: [react()],
  base: './',
})
