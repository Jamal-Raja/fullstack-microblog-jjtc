import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Enable host for network access
  // This allows the dev server to be accessed over the local network
  server: {
    host: true,
  },
});
