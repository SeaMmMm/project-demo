/* eslint-disable no-undef */

module.exports = {
  presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
  plugins: ['syntax-dynamic-import', 'transform-md-import-to-string'],
}
