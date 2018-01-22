import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import pkg from './package.json'

const baseOutput = {
  name: 'babel-plugin-log-and-return',
  globals: { 'babel-template': 'template' },
}

const output = [{ ...baseOutput, file: pkg.main, format: 'umd' }]

const plugins = [
  commonjs(),
  babel({
    exclude: ['node_modules/**'],
    babelrc: false,
  }),
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(uglify())
}

export default {
  input: 'src/index.js',
  output,
  plugins,
  external: ['babel-template'],
}
