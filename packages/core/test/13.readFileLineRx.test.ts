import assert from 'node:assert/strict'

import { tap, finalize } from 'rxjs/operators'

import { readFileLineRx } from '../src/index.js'
import { fileShortPath } from '../src/lib/helper.js'


describe(fileShortPath(import.meta.url), () => {
  const fnName = 'readFileLineRx'

  it(`Should ${fnName}() work`, (done) => {
    const path = './test/fixtures/fileline.txt'
    let num = 1

    readFileLineRx(path).pipe(
      tap((str) => {
        assert(typeof str === 'string')
        if (str) {
          assert(str === `line${num}`)
        }
        num += 1
      }),
      finalize(done),
    ).subscribe()
  })

})

