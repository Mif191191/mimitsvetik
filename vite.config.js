// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Correct configuration for GitHub Pages under /mimitsvetik/
export default defineConfig({
    base: "/mimitsvetik/",
    plugins: [react()],

    // Build directly into docs (used by GitHub Pages)
    build: {
        outDir: "docs",
    },
});
