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
    proxy: {
      "/prod": {
        target: "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/prod/, ""),
      },
    },
  },
  build: {
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "node_modules/**"],
    setupFiles: "./test/vitest.setup.ts",
    include: ["**/*.test.tsx"],
  },
});
