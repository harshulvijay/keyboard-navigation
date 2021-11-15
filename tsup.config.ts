import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: true,
  entryPoints: [`./lib/index.ts`, `./wrappers/**/*.ts`],
  format: ["esm", "cjs"],
  legacyOutput: true,
  minify: true,
  outDir: `./dist`,
  sourcemap: true,
  target: "es2020",
});
