import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"], // produce both CJS and ESM
  dts: true, // generate TypeScript types
  clean: true,
  bundle: true, // 🔑 bundle everything, including @faker-js/faker
  sourcemap: true, // optional but helps debugging
  splitting: false, // keep it simple, no dynamic imports
  minify: false, // optional; don’t minify to avoid surprises
});
