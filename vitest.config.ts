import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: ["./__tests__/setup.ts"],
    environment: "jsdom",
    deps: {
      inline: ["./node_modules/vitest-canvas-mock/dist/index.js"],
    },
    threads: false, // fix canvas error, https://github.com/vitest-dev/vitest/issues/740
    environmentOptions: {
      jsdom: {
        resources: "usable",
      },
    },
    reporters: "verbose",
    testTimeout: 5000
  },
})