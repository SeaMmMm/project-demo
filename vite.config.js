/* eslint-disable no-undef */
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'

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
  build: {
    target: 'es2015',
  },
  plugins: [
    react(),
    mdToJs(),
    legacy({
      targets: ['ie >= 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      renderLegacyChunks: true,
      polyfills: [
        'es.promise',
        'es.array.iterator',
        'es.object.assign',
        'es.object.keys',
        'es.object.values',
        'es.object.entries',
        'es.array.find',
        'es.array.includes',
        'es.array.fill',
        'es.array.from',
        'es.array.of',
        'es.string.includes',
        'es.string.starts-with',
        'es.string.ends-with',
        'es.string.trim',
        'es.string.trim-start',
        'es.string.trim-end',
        'es.symbol',
        'es.symbol.description',
        'es.symbol.async-iterator',
        'es.symbol.has-instance',
        'es.symbol.is-concat-spreadable',
        'es.symbol.iterator',
        'es.symbol.match',
        'es.symbol.match-all',
        'es.symbol.replace',
        'es.symbol.search',
        'es.symbol.species',
        'es.symbol.split',
        'es.symbol.to-primitive',
        'es.symbol.to-string-tag',
        'es.symbol.unscopables',
        'es.array.flat',
        'es.array.flat-map',
        'es.global-this',
        'esnext.array.last-index',
        'esnext.array.last-item',
        'esnext.array.unique-by',
        'esnext.map.update',
        'esnext.set.add-all',
        'esnext.set.delete-all',
        'esnext.set.difference',
        'esnext.set.intersection',
        'esnext.set.is-disjoint-from',
        'esnext.set.is-subset-of',
        'esnext.set.is-superset-of',
        'esnext.set.union',
        'esnext.string.at',
        'esnext.string.code-points',
        'esnext.string.match-all',
        'esnext.symbol.dispose',
        'esnext.symbol.observable',
        'esnext.symbol.pattern-match',
        'esnext.symbol.replace-all',
        'esnext.weak-map.delete-all',
        'esnext.weak-map.from',
        'esnext.weak-map.of',
        'esnext.weak-set.add-all',
        'esnext.weak-set.delete-all',
        'esnext.weak-set.from',
        'esnext.weak-set.of',
        'esnext.math.clamp',
        'esnext.math.deg-per-rad',
        'esnext.math.degrees',
        'esnext.math.fscale',
        'esnext.math.iaddh',
        'esnext.math.imulh',
      ],
    }),
  ],
})
