import assert from 'node:assert/strict'

import { of, EMPTY } from 'rxjs'
import { catchError, defaultIfEmpty, finalize, tap } from 'rxjs/operators'

import {
  assertNever,
  assertNeverRx,
} from '../src/index.js'
import { fileShortPath } from '../src/lib/helper.js'


describe(fileShortPath(import.meta.url), () => {
  const fnName = 'assertNever'

  it(`Should ${fnName}() work`, () => {
    try {
      assertNever('foo' as never)
    }
    catch (ex) {
      return assert(true)
    }
    assert(false, 'Should throw error but not')
  })
})

describe(fileShortPath(import.meta.url), () => {
  const fnName = 'assertNeverObb'

  it(`Should ${fnName}() work`, (done) => {
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
