import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    return {
        define: {
            // "process.env.BACKEND_URL": JSON.stringify(env.BACKEND_URL),
            "process.env": env,
        },
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
            // outDir: "../backend/build/frontend",
            outDir: "build",
        },
        preview: {
            port: 3000,
            host: true,
        },
    };
});
