import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true, // Listen on all addresses
    port: 5173, // Default port
    proxy: {
      "/v1": {
        target: "http://192.168.20.33:2222",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v1/, "/v1"),
      },
    },
  },
  plugins: [
    tailwindcss(),

    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "My PWA App",
        short_name: "PWA App",
        description: "A modern Progressive Web Application",
        theme_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
