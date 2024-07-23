/* eslint-disable no-undef */
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

function mdToJs() {
  return {
    name: 'md-to-js',
    transform(code, id) {
      if (id.endsWith('.md')) {
        const content = JSON.stringify(code)
          .replace(/\u2028/g, '\\u2028') // 转义 Unicode 分段符
          .replace(/\u2029/g, '\\u2029') // 转义 Unicode 段落分隔符
        return `export default ${content}`
      }
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mdToJs()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
