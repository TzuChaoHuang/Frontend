import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    strictPort: true, // Make sure the application uses port 5173
    watch: {
      usePolling: true,
    },
    host: true, // Needed for Docker container port mapping to work
    proxy: {
      // Proxy API requests to the .NET Core backend
      '/api': {
        target: 'https://localhost:7181', // Replace with your .NET Core backend URL
        changeOrigin: true,
        secure: false, // Set to false for self-signed certificates in development
      },
    },
  }
})
