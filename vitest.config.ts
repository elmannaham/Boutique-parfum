import path from "path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    // ========================================================================
    // ENVIRONMENT & SETUP
    // ========================================================================
    environment: "jsdom",
    globals: true,
    setupFiles: ["./__tests__/setup.ts"],

    // ========================================================================
    // COVERAGE
    // ========================================================================
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      exclude: [
        "node_modules/",
        ".next/",
        "coverage/",
        "**/*.d.ts",
        "**/*.config.ts",
        "**/*.config.js",
        "**/__tests__/**",
        "**/dist/**",
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80,
      },
    },

    // ========================================================================
    // INCLUDE / EXCLUDE
    // ========================================================================
    include: ["**/__tests__/**/*.test.{ts,tsx}"],
    exclude: ["node_modules", ".next", "dist"],

    // ========================================================================
    // PERFORMANCE & PARALLELIZATION
    // ========================================================================
    isolate: true,

    // ========================================================================
    // OUTPUT
    // ========================================================================
    reporters: ["verbose", "html"],
    outputFile: {
      html: "./coverage/test-results.html",
    },

    // ========================================================================
    // TIMEOUTS & LIMITS
    // ========================================================================
    testTimeout: 10000,
    hookTimeout: 10000,
  },

  // ============================================================================
  // RESOLVE ALIASES (match tsconfig paths)
  // ============================================================================
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "@/components": path.resolve(__dirname, "./components"),
      "@/lib": path.resolve(__dirname, "./lib"),
      "@/types": path.resolve(__dirname, "./types"),
      "@/app": path.resolve(__dirname, "./app"),
      "@/styles": path.resolve(__dirname, "./styles"),
      "@/public": path.resolve(__dirname, "./public"),
    },
  },
});
