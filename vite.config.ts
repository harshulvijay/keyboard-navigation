import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  root: ".",
  esbuild: {},
  build: {
    outDir: "./build",
  },
});
