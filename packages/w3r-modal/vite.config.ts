/// <reference types="vitest" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

export default defineConfig({
  plugins: [vanillaExtractPlugin(), react()],
  test: {
    deps: { fallbackCJS: true },
    globals: true,
    environment: 'jsdom'
  }
})
