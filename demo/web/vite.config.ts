import { defineConfig } from "vite";
import commonConfig from "../vite.config";

// https://vitejs.dev/config/
export default defineConfig({
  ...commonConfig,
  root: ".",
  esbuild: {},
});
