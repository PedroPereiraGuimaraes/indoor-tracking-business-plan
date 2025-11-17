import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carrega as variáveis de ambiente do arquivo .env localmente
  const env = loadEnv(mode, (process as any).cwd(), "");

  return {
    plugins: [react()],
    css: {
      postcss: "./postcss.config.cjs",
    },
    define: {
      // Isso permite usar process.env.API_KEY no código React, mesmo rodando no Vite
      "process.env.API_KEY": JSON.stringify(env.API_KEY),
    },
  };
});
