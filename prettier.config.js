/** @type {import('prettier').Config} */
export default {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 90,
  endOfLine: 'lf',
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: './tailwind.config.ts',
}