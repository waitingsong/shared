import assert from 'node:assert/strict'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import rmdir from 'rimraf'
import { from as ofrom, of } from 'rxjs'
import { mergeMap } from 'rxjs/operators'

import {
  createDirAsync,
  dirExists,
} from '../src/index.js'
import { fileShortPath } from '../src/lib/helper.js'


const tmpDir = join(tmpdir(), 'test-tmp')
const pathPrefix = 'mytest'

describe(fileShortPath(import.meta.url), () => {

  before(async () => {
    await createDirAsync(tmpDir)
  })
  after(async () => {
    await rmdir(tmpDir)
  })

  const fnName = 'dirExists'

  it(`Should ${fnName}() work`, (done) => {
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

  it(`Should ${fnName}() work with invalid path`, (done) => {
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

  it(`Should ${fnName}() work with blank path`, (done) => {
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
