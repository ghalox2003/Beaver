import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Forward API calls to the Express server so the browser only ever talks to one origin.
    proxy: {
      "/api": "http://localhost:3001",
    },
    // Allow ngrok tunnels (a leading dot also matches subdomains).
    allowedHosts: [".ngrok-free.app", ".ngrok-free.dev", ".ngrok.app", ".ngrok.io"],
  },
});
