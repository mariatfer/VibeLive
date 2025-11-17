// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import prettier from 'eslint-plugin-prettier'

export default withNuxt([
  {
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'arrow-spacing': 'error',
      'object-curly-spacing': ['error', 'always'],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/html-quotes': ['error', 'double', { avoidEscape: true }],
      'vue/mustache-interpolation-spacing': ['error', 'always'],
      'vue/no-multi-spaces': ['error', { ignoreProperties: false }],
      'vue/v-on-style': ['error', 'shorthand'],
      'vue/v-bind-style': ['error', 'shorthand'],
      'vue/require-v-for-key': 'error',
      'vue/no-mutating-props': 'error',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'vue/multi-word-component-names': 'off',
    },
  },
])
