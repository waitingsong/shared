/// <reference types="mocha" />

import * as assert from 'power-assert'
import { from as ofrom, of, EMPTY } from 'rxjs'
import { catchError, defaultIfEmpty, finalize, tap } from 'rxjs/operators'

import {
  assertNever,
  assertNeverRx,
  basename,
} from '../src/index'


const filename = basename(__filename)

describe(filename, () => {
  const fnName = 'assertNever'

  it(`Should ${fnName}() works`, () => {
    try {
      assertNever('foo' as never)
    }
    catch (ex) {
      return assert(true)
    }
    assert(false, 'Should throw error but not')
  })
})

describe(filename, () => {
  const fnName = 'assertNeverObb'

  it(`Should ${fnName}() works`, (done) => {
    const ret$ = assertNeverRx('foo' as never)

    ret$.pipe(
      defaultIfEmpty(''),
      tap(() => {
        assert(false, 'Should not emit value')
      }),
      catchError(() => EMPTY),
      finalize(() => done()),
    ).subscribe()
  })
})
