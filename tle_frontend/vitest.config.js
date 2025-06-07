import { defineConfig } from 'vitest/config';
export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom', // <-- Change from 'node' to 'jsdom'
        setupFiles: './vitest.setup.js',
        coverage: {
            reporter: ['text', 'json', 'html'],
        },
        
    },
});