import { defineConfig } from 'vitest/config'
const { createVuePlugin } = require('vite-plugin-vue2');


export default defineConfig({
    plugins: [
        createVuePlugin(),
    ],
    test: {
        globals: true,
        environment: 'happy-dom',
      },
})


