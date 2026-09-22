import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Base path for GitHub Pages: derived from the repo name at build time
// (GITHUB_REPOSITORY is set automatically inside GitHub Actions), so no
// username/repo needs to be hardcoded here.
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base = process.env.VITE_BASE_PATH ?? (repoName ? `/${repoName}/` : '/birthday-world/')

export default defineConfig({
  base,
  plugins: [react()],
})
