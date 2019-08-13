import * as assert from 'power-assert'
import { tap, finalize } from 'rxjs/operators'

import { readFileLineRx, basename } from '../src/index'


const filename = basename(__filename)

describe(filename, () => {
  const fnName = 'readFileLineRx'

  it(`Should ${fnName}() works`, (done) => {
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

