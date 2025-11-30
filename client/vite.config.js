import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Enable host for network access
  // This allows the dev server to be accessed over the local network
  server: {
    host: true,
    port: 6969,
  },
});
