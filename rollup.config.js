import { terser } from 'rollup-plugin-terser'

export default {
  input: './wc-progress.js',
  output: {
    file: 'dist/wc-progress.min.js',
    format: 'iife',
    sourcemap: 'inline',
  },
  plugins: [terser()],
}