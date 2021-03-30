/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  basename,
  join,
} from '@waiting/shared-core'
import ts from 'typescript'

import { transTypeKeystoLiteralArray } from '../../src/index'

// eslint-disable-next-line import/order
import assert = require('power-assert')


const filename = basename(__filename)

describe(filename, () => {

  describe('Should transTypeKeystoLiteralArray works', () => {
    it('interface', () => {
      const demo = 'demo1.ts'
      const path = join(__dirname, demo)
      const program = ts.createProgram(
        [path],
        {
          noEmitOnError: true,
          noImplicitAny: true,
          target: ts.ScriptTarget.ESNext,
          inlineSourceMap: false,
          module: ts.ModuleKind.CommonJS,
        },
      )
      const file = program.getSourceFile(path)
      if (! file) {
        throw new TypeError('sourceFile undefined')
      }
      const tf = transTypeKeystoLiteralArray(program)
      const result: ts.TransformationResult<ts.SourceFile> = ts.transform<ts.SourceFile>(file, [tf])

      const [fileRet] = result.transformed
      if (fileRet) {
        const printer = ts.createPrinter()
        const codeRet = printer.printFile(fileRet)
        const expectStr = 'export const fooKeys = ["foo", "barz"]'
        // console.info({ codeRet })
        assert(codeRet.includes(expectStr))
        return
      }
      assert(false)
    })

    it('class', () => {
      const demo = 'demo2.ts'
      const path = join(__dirname, demo)
      const program = ts.createProgram(
        [path],
        {
          noEmitOnError: true,
          noImplicitAny: true,
          target: ts.ScriptTarget.ESNext,
          inlineSourceMap: false,
          module: ts.ModuleKind.CommonJS,
        },
      )
      const file = program.getSourceFile(path)
      if (! file) {
        throw new TypeError('sourceFile undefined')
      }
      const tf = transTypeKeystoLiteralArray(program)
      const result: ts.TransformationResult<ts.SourceFile> = ts.transform<ts.SourceFile>(file, [tf])

      const [fileRet] = result.transformed
      if (fileRet) {
        const printer = ts.createPrinter()
        const codeRet = printer.printFile(fileRet)
        const expectStr = 'export const fooKeys = ["foo", "barz"]'
        // console.info({ codeRet })
        assert(codeRet.includes(expectStr))
        return
      }
      assert(false)
    })

    it('interface extends class', () => {
      const demo = 'demo3.ts'
      const path = join(__dirname, demo)
      const program = ts.createProgram(
        [path],
        {
          noEmitOnError: true,
          noImplicitAny: true,
          target: ts.ScriptTarget.ESNext,
          inlineSourceMap: false,
          module: ts.ModuleKind.CommonJS,
        },
      )
      const file = program.getSourceFile(path)
      if (! file) {
        throw new TypeError('sourceFile undefined')
      }
      const tf = transTypeKeystoLiteralArray(program)
      const result: ts.TransformationResult<ts.SourceFile> = ts.transform<ts.SourceFile>(file, [tf])

      const [fileRet] = result.transformed
      if (fileRet) {
        const printer = ts.createPrinter()
        const codeRet = printer.printFile(fileRet)
        const expectStr = 'export const fooKeys = ["bar", "foo", "barz"]'
        // console.info({ codeRet })
        assert(codeRet.includes(expectStr))
        return
      }
      assert(false)
    })

    it('mixed', () => {
      const demo = 'demo4.ts'
      const path = join(__dirname, demo)
      const program = ts.createProgram(
        [path],
        {
          noEmitOnError: true,
          noImplicitAny: true,
          target: ts.ScriptTarget.ESNext,
          inlineSourceMap: false,
          module: ts.ModuleKind.CommonJS,
        },
      )
      const file = program.getSourceFile(path)
      if (! file) {
        throw new TypeError('sourceFile undefined')
      }
      const tf = transTypeKeystoLiteralArray(program)
      const result: ts.TransformationResult<ts.SourceFile> = ts.transform<ts.SourceFile>(file, [tf])

      const [fileRet] = result.transformed
      if (fileRet) {
        const printer = ts.createPrinter()
        const codeRet = printer.printFile(fileRet)
        const expectStr1 = 'export const fooKeys1 = ["foo", "barz"]'
        const expectStr2 = 'export const fooKeys2 = ["bar", "foo", "barz"]'
        // console.info({ codeRet })
        assert(codeRet.includes(expectStr1))
        assert(codeRet.includes(expectStr2))
        return
      }
      assert(false)
    })

  })

})

