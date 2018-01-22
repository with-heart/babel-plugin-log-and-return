import stripIndent from 'strip-indent'
import * as recast from 'recast'
import * as babel from 'babel-core'
import plugin from '.'

test('transpiles @log declarator into logAndReturn calls', () => {
  const source = stripIndent(
    `
      // @log
      a + b

      // @log
      hello('world')

      function test() {
        // @log
        return a + b + c
      }
    `,
  ).trim()
  const code = transpile(source)
  expect(code).toMatchSnapshot()
})

function transpile(source) {
  const { code } = babel.transform(source, {
    parserOpts: { parser: recast.parse },
    generatorOpts: { generator: recast.print, lineTerminator: '\n' },
    babelrc: false,
    plugins: [plugin],
  })
  return code
}
