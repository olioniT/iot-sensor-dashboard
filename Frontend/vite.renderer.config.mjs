import { dirname, resolve } from "node:path"
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src')
        }
    }
});