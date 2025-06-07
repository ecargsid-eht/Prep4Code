import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node', // use 'jsdom' for frontend
        coverage: {
            reporter: ['text', 'json', 'html'],
        },
    },
});