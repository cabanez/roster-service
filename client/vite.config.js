import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Reference: https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Listen on all interfaces inside the container
    hmr: {
      host: 'localhost'  // Force browser to connect via localhost (host machine)
    }
  }
})
