import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./src/tests/setup.js'],
        include: ['src/**/*.spec.js'],
        coverage: {
            provider: 'v8',
            include: ['src/**/*.{js,vue}'],
            exclude: ['src/main.js', 'src/preload.js', 'src/renderer.js', 'src/**/*.spec.js', 'src/tests/**'],
        },
    },
})
