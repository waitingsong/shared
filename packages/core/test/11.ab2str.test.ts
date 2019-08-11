/// <reference types="mocha" />

import * as assert from 'power-assert'

import {
  ab2str,
  basename,
  str2ab,
} from '../src/index'


const filename = basename(__filename)

describe(filename, () => {
  const fnName = 'ab2str'

  it(`Should ${fnName}() works`, async () => {
    const input = '𠮷'

    const u8arr = new Uint8Array([240, 160, 174, 183])
    const u8str = ab2str(u8arr)
    assert(u8str === input)

    const i8arr = new Int8Array([-16, -96, -82, -73])
    const i8str = ab2str(i8arr, 'utf8')
    assert(i8str === input)

    const u16arr = new Uint16Array([41200, 47022])
    const u16str = ab2str(u16arr)
    assert(u16str === input)

    const i16arr = new Int16Array([-24336, -18514])
    const i16str = ab2str(i16arr)
    assert(i16str === input)

    const u32arr = new Uint32Array([3081674992])
    const u32str = ab2str(u32arr)
    assert(u32str === input)

    const i32arr = new Int32Array([-1213292304])
    const i32str = ab2str(i32arr)
    assert(i32str === input)
  })
})

describe(filename, () => {
  const fnName = 'str2ab'

  it(`Should ${fnName}() works`, async () => {
    const arr: (string | number)[] = []
    arr.push('A')
    arr.push('€')
    arr.push('𠮷')
    arr.push('中文')
    arr.push('Привет, мир!')
    arr.push('a\'b"c<d>e&f= ')
    arr.push(Math.random())

    const input = arr.join('')
    const ab = str2ab(input)
    const ret = ab2str(ab)

    assert(ret === input)
  })
})
