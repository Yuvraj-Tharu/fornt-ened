import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://deploy-realestate.onrender.com",
        secure: false, // Set to true if your target server uses valid SSL certificates
        changeOrigin: true, // Adjust this based on your server setup
      },
    },
  },
  plugins: [react()],
});
