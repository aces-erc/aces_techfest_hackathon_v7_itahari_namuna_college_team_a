import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy WebSocket connections (for socket.io)
      '/socket.io': {
        target: 'http://localhost:5000',  // Backend Socket.IO server URL
        changeOrigin: true,
        ws: true,  // Enable WebSocket support
      },
    },
  },
})
