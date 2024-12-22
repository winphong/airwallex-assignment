// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vitest/config" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults } from "vitest/config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    watch: {
      ignored: ["**/playwright-report/**"], // Exclude the playwright-report directory
    },
  },
  build: {
    sourcemap: "hidden",
  },
  test: {
    globals: true,
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "node_modules/**"],
    setupFiles: "./tests/vitest.setup.ts",
    include: ["**/*.test.tsx"],
  },
});
