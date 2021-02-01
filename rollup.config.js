import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import svgr from '@svgr/rollup'
import json from '@rollup/plugin-json'
import visualizer from 'rollup-plugin-visualizer'

import { minify } from 'uglify-es'

function uglify(options) {
  if (options === void 0) options = {}

  return {
    name: 'uglify',
    renderChunk: function renderChunk(code) {
      const result = minify(
        code,
        Object.assign({ sourceMap: { url: 'out.js.map' } }, options) // force sourcemap creation
      )
      if (result.map) {
        const commentPos = result.code.lastIndexOf('//#')
        result.code = result.code.slice(0, commentPos).trim()
      }
      return result
    },
  }
}

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: './dist',
      format: 'cjs',
      exports: 'named',
    },
    {
      dir: './dist/es',
      format: 'es',
      exports: 'named',
    },
  ],
  context: 'null',
  moduleContext: 'null',
  plugins: [
    external(),
    postcss({
      modules: false,
      extract: true,
      minimize: true,
    }),
    svgr(),
    json(),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
      exclude: ['src/**/*.stories.tsx', 'src/**/*.test.(tsx|ts)'],
    }),
    commonjs({
      namedExports: {
        'node_modules/react-is/index.js': [
          'typeOf',
          'isElement',
          'isValidElementType, isContextConsumer',
        ],
        'node_modules/react/index.js': [
          'useContext',
          'useState',
          'useMemo',
          'useEffect',
          'useRef',
          'useDebugValue',
          'createElement',
        ],
      },
    }),
    uglify(),
    visualizer(),
  ],
}
