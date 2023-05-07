import assert from 'node:assert/strict'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

import { fileShortPath, genCurrentDirname, genCurrentFilename, getCallerStack } from '@waiting/shared-core'


import { test1, test2, test3, test4, test5, fake1, fake2 } from './call-config.js'


const __dirname = genCurrentDirname(import.meta.url)
const __filename = genCurrentFilename(import.meta.url)
// dummy line
// const callerInfo = getCallerStack(0, true) // line:14!!!, column: 2/20
const tmpFile = join(__dirname, 'call-config.ts').replace(/\\/ug, '/')
const pathUrl = pathToFileURL(tmpFile)
const path1 = pathUrl.href

describe(fileShortPath(import.meta.url), () => {

  describe('Should demo1 work', () => {
    it('test1()', () => {
      const info = test1()
      console.log({ info })
      assert(info.path === path1, path1)
      assert(info.line === 6, info.line.toString())
      assert(info.column === 22, info.column.toString())
      assert(info.columnNumber === 24)
      assert(info.enclosingColNumber === 8)
    })
    it('test2()', () => {
      const info = test2()
      assert(info.path === path1)
      assert(info.line === 11, info.line.toString())
      assert(info.column === 10, info.column.toString())
    })
    it('test3()', () => {
      const info = test3()
      assert(info.path === path1)
      assert(info.line === 24)
      assert(info.column === 1)
    })
    it('test4()', () => {
      const info = test4()
      assert(info.path === path1)
      assert(info.line === 30)
      assert(info.column === 1)
    })
    it('test5()', () => {
      const info = test5()
      assert(info.path === path1)
      assert(info.line === 37)
      assert(info.column === 18)
    })

    it('fake1()', () => {
      const info = fake1()
      assert(info.path !== path1)
      assert(info.line !== 15)
      assert(info.column !== 10)
    })
    it('fake2()', () => {
      const info = fake2()
      assert(info.path !== path1)
      assert(info.line !== 19)
      assert(info.column !== 10)
    })

    // it('self', () => {
    //   const info = callerInfo
    //   const expected = pathToFileURL(__filename).href
    //   console.log({ infoSelf: info, expected })
    //   assert(info.path === expected, expected)
    //   assert(info.line === 14)
    //   assert(info.column === 2)
    //   assert(info.columnNumber === 20)
    // })
  })

})

