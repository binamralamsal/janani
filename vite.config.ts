// app.config.ts
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, loadEnv } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [tsConfigPaths(), tailwindcss(), tanstackStart()],
    define: { "process.env.DATABASE_URL": JSON.stringify(env.DATABASE_URL) },
  };
});
