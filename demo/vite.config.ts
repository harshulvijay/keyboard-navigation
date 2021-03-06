// common configuration options

import { defineConfig } from "vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "./build",
  },
  resolve: {
    alias: {
      "@utils": resolve(__dirname, "./utils"),
    },
  },
});
