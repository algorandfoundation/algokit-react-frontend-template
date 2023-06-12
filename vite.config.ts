import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    define: {
      global: {},
      process: {
        browser: true,
        env: {
          INDEXER_TOKEN: env.VITE_INDEXER_TOKEN,
          INDEXER_SERVER: env.VITE_INDEXER_SERVER,
          INDEXER_PORT: env.VITE_INDEXER_PORT,
        },
      },
    },
  };
});
