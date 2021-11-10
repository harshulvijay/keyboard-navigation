import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  root: "./testing/manual",
  esbuild: {},
  build: {
    outDir: "./build",
  },
});
