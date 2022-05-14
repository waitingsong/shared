import assert from 'node:assert/strict'

import rmdir from 'rimraf'
import { from as ofrom, of } from 'rxjs'
import { mergeMap } from 'rxjs/operators'

import {
  createDirAsync,
  isPathAccessible,
  join,
  pathAccessible,
  tmpdir,
} from '../src/index.js'
import { fileShortPath } from '../src/lib/helper.js'


const tmpDir = join(tmpdir(), 'test-tmp')


describe(fileShortPath(import.meta.url) + ':isPathAcessible()', () => {

  before(async () => {
    await createDirAsync(tmpDir)
  })
  after((done) => {
    rmdir(tmpDir, (err) => {
      err && console.error(err)
      done()
    })
  })

  const fnName = 'isPathAcessible'

  it(`Should ${fnName}() work`, async () => {
    const dir = tmpdir()

    assert(isPathAccessible(dir), `sytem temp path should accessible: "${dir}"`)
  })

  it(`Should ${fnName}() work with invalid value`, async () => {
    const dir = join(tmpDir, Math.random().toString())

    if (await isPathAccessible('')) {
      return assert(false, 'should return false with blank path')
    }

    if (await isPathAccessible(dir)) {
      return assert(false, `path should not accessible: "${dir}"`)
    }

    if (await isPathAccessible(dir)) {
      return assert(false, `path should not accessible: "${dir}"`)
    }

    await createDirAsync(dir)
    if (! await isPathAccessible(dir)) {
      return assert(false, `path should accessible: "${dir}"`)
    }
  })

})


describe(fileShortPath(import.meta.url) + ':pathAcessible()', () => {
  after((done) => {
    rmdir(tmpDir, (err) => {
      err && console.error(err)
      done()
    })
  })

  const fnName = 'pathAcessible'

  it(`Should ${fnName}() work`, (done) => {
    const dir = tmpdir()
    return of(dir).pipe(
      mergeMap(pathAccessible),
    ).subscribe(
      (path) => {
        assert(path === dir, `sytem temp path should accessible: "${dir}"`)
        done()
      },
      (err: Error) => {
        assert(false, err.message)
        done()
      },
    )
  })

  it(`Should ${fnName}() work with invalid value`, async () => {
    const dir = join(tmpDir, Math.random().toString())

    const ret = await pathAccessible('').toPromise()
    assert(ret === '', 'should return false with blank path:' + (ret ? ret : ''))

    if (await pathAccessible(dir).toPromise()) {
      return assert(false, `path should not accessible: "${dir}"`)
    }

    if (await pathAccessible(dir).toPromise()) {
      return assert(false, `path should not accessible: "${dir}"`)
    }

    await createDirAsync(dir)
    if (! await pathAccessible(dir).toPromise()) {
      return assert(false, `path should accessible: "${dir}"`)
    }
  })

})
