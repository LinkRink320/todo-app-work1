import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  base: "/todo-app-work1/", // GitHub Pages用ベースパス
  plugins: [react()],
});
