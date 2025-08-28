// Simple recommended React linting (optional)
import js from '@eslint/js'
import reactPlugin from 'eslint-plugin-react'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: { globals: { ...js.environments.browser.globals } },
    plugins: { react: reactPlugin },
    rules: {
      'react/react-in-jsx-scope': 'off'
    }
  }
]
