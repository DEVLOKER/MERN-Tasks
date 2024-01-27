import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@/shared": path.resolve(__dirname, "../backend/src/shared/"),
            "@": path.resolve(__dirname, "./src/"),
        },
    },
    server: {
        port: 3000,
        proxy: {
            "/api": {
                target: "http://localhost:8080/",
                changeOrigin: true,
                secure: false,
            },
        },
    },
    build: {
        outDir: "../backend/build/frontend",
        // outDir: "build",
    },
    preview: {
        port: 3000,
        host: true,
    },
});
