import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import commonConfig from "../vite.config";

// https://vitejs.dev/config/
export default defineConfig({
  ...commonConfig,
  root: ".",
  esbuild: {},
  plugins: [svelte()],
});
