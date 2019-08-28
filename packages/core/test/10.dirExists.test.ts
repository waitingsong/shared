import * as assert from 'power-assert'
import * as rmdir from 'rimraf'
import { from as ofrom, of } from 'rxjs'
import { mergeMap } from 'rxjs/operators'

import {
  basename,
  createDirAsync,
  dirExists,
  join,
  tmpdir,
} from '../src/index'


const filename = basename(__filename)
const tmpDir = join(tmpdir(), 'test-tmp')
const pathPrefix = 'mytest'

describe(filename + ' :dirExists()', () => {
  before(async () => {
    await createDirAsync(tmpDir)
  })
  after((done) => {
    rmdir(tmpDir, (err) => {
      err && console.error(err)
      done()
    })
  })

  const fnName = 'dirExists'

  it(`Should ${fnName}() works`, (done) => {
    return of(tmpDir).pipe(
      mergeMap(dirExists),
    ).subscribe(
      (path) => {
        assert(path && path === tmpDir, `path should exists: "${tmpDir}"`)
        done()
      },
      (err: Error) => {
        assert(false, err.message)
        done()
      },
    )
  })

  it(`Should ${fnName}() works with invalid path`, (done) => {
    const random = Math.random()
    const randomPath = `${tmpDir}/${pathPrefix}-${random}`

    return of(randomPath).pipe(
      mergeMap(dirExists),
    ).subscribe(
      (path) => {
        assert(path === '', `path should NOT exists: "${randomPath}"`)
        done()
      },
      (err: Error) => {
        assert(false, err.message)
        done()
      },
    )
  })

  it(`Should ${fnName}() works with blank path`, (done) => {
    return of('').pipe(
      mergeMap(dirExists),
    ).subscribe(
      (path) => {
        assert(path === '', 'empty path should NOT exists')
        done()
      },
      (err: Error) => {
        assert(false, err.message)
        done()
      },
    )
  })

})
