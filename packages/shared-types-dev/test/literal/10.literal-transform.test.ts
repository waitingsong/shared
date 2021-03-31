/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  basename,
  join,
} from '@waiting/shared-core'
import { run } from 'rxrunscript'

import {
  createSourceFile,
  transformCallExpressionToLiteralType,
  TransFormOptions,
} from '../../src/index'

import { expectedDict } from './config'

// eslint-disable-next-line import/order
import assert = require('power-assert')


const filename = basename(__filename)

describe(filename, () => {
  const demo1 = 'demo1.ts'
  const path1 = join(__dirname, demo1)
  const demo2 = 'demo2.ts'
  const path2 = join(__dirname, demo2)

  afterEach(async () => {
    await run(`cp -f "example.${path1}" ${path1}`).toPromise()
    await run(`cp -f "example.${path2}" ${path2}`).toPromise()
  })

  describe('Should transformCallExpressionToLiteralType works', () => {
    it('demo1', () => {
      const path = path1
      const tsConfigFilePath = join(__dirname, '../../tsconfig.json')
      const file = createSourceFile(tsConfigFilePath, path)

      const opts: TransFormOptions = {
        sourceFile: file,
        importModuleName: './dict',
        needle: 'genDbDict',
        resultType: 'DbDict',
        leadingString: '/* eslint-disable */ ',
        trailingString: ' /* eslint-enable */',
      }

      transformCallExpressionToLiteralType(opts)
      file.saveSync()

      const dict = require(path).dict
      assert.deepStrictEqual(dict, expectedDict)
    })

    it('demo1 w/o importModuleName', () => {
      const path = path1
      const tsConfigFilePath = join(__dirname, '../../tsconfig.json')
      const file = createSourceFile(tsConfigFilePath, path)

      const opts: TransFormOptions = {
        sourceFile: file,
        importModuleName: '',
        needle: 'genDbDict',
        resultType: 'DbDict',
        leadingString: '/* eslint-disable */ ',
        trailingString: ' /* eslint-enable */',
      }

      transformCallExpressionToLiteralType(opts)
      file.saveSync()

      const dict = require(path).dict
      assert.deepStrictEqual(dict, expectedDict)
    })

    it('demo1 result', () => {
      const path = path1
      const tsConfigFilePath = join(__dirname, '../../tsconfig.json')
      const file = createSourceFile(tsConfigFilePath, path)

      const opts: TransFormOptions = {
        sourceFile: file,
        importModuleName: './dict',
        needle: 'genDbDict',
        resultType: 'DbDict',
        leadingString: '/* eslint-disable */ ',
        trailingString: ' /* eslint-enable */',
      }

      const ret = transformCallExpressionToLiteralType(opts)
      const obj = ret.get('dict')

      assert.deepStrictEqual(obj, expectedDict)
    })

    it('demo2', () => {
      const path = path2
      const tsConfigFilePath = join(__dirname, '../../tsconfig.json')
      const file = createSourceFile(tsConfigFilePath, path)

      const opts: TransFormOptions = {
        sourceFile: file,
        importModuleName: './dict',
        needle: 'genDbDict',
        resultType: 'DbDict',
        leadingString: '/* eslint-disable */ ',
        trailingString: ' /* eslint-enable */',
      }

      transformCallExpressionToLiteralType(opts)
      file.saveSync()

      const dict = require(path).dict
      assert.deepStrictEqual(dict, expectedDict)
    })

    it('demo2 w/o importModuleName', () => {
      const path = path2
      const tsConfigFilePath = join(__dirname, '../../tsconfig.json')
      const file = createSourceFile(tsConfigFilePath, path)

      const opts: TransFormOptions = {
        sourceFile: file,
        importModuleName: '',
        needle: 'genDbDict',
        resultType: 'DbDict',
        leadingString: '/* eslint-disable */ ',
        trailingString: ' /* eslint-enable */',
      }

      try {
        transformCallExpressionToLiteralType(opts)
      }
      catch (ex) {
        assert(ex instanceof TypeError)
        const { message } = ex as TypeError
        assert(message.includes('has no properties'))
        assert(message.includes('pidName:'))
        assert(message.includes('pidPath:'))
        return
      }
      assert(false, 'Should throw error but not')
    })

    it('demo2 result', () => {
      const path = path2
      const tsConfigFilePath = join(__dirname, '../../tsconfig.json')
      const file = createSourceFile(tsConfigFilePath, path)

      const opts: TransFormOptions = {
        sourceFile: file,
        importModuleName: './dict',
        needle: 'genDbDict',
        resultType: 'DbDict',
        leadingString: '/* eslint-disable */ ',
        trailingString: ' /* eslint-enable */',
      }

      const ret = transformCallExpressionToLiteralType(opts)
      const obj = ret.get('dict')

      assert.deepStrictEqual(obj, expectedDict)
    })
  })

})

