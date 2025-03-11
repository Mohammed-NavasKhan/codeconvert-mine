import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4200,
    // proxy: {
    //   '/api': {
    //     target: 'https://sit.nonprod.tcsaiwisdomnext.tcsapps.com',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '/wisdomv3/api')
    //   }
    // }
  },
});
