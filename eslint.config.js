import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  react: true,
  ignores: ['src/components/ui/**/*'],
  rules: {
    'unused-imports/no-unused-vars': 'warn',
    'no-unused-vars': 'warn',
  },
})
