import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths({ projects: ["./tsconfig.json"] })],
  test: {
    globals: true,
    environment: "node",
    include: ["src/tests/**/*.test.ts"],
    testTimeout: 120000, // render.com free tier cold-starts can take > 1 min
    sequence: {
      // run test files sequentially so shared state flows correctly
      concurrent: false,
    },
  },
});
