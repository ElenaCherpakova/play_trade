import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    mockReset: true,
    restoreMocks: true,
    clearMocks: true,
    include: [
      "./app/**/*.{test,spec}.?(c|m)[jt]s?(x)",
      "./components/**/*.{test,spec}.?(c|m)[jt]s?(x)"
    ],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/cypress/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*"
    ],
    watchExclude: ["**/node_modules/**", "**/dist/**"]
  }
});
