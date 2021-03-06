import rmdir from 'rimraf'
import { from as ofrom, of } from 'rxjs'
import { mergeMap, tap } from 'rxjs/operators'

import {
  basename,
  createDir,
  createDirAsync,
  dirExists,
  join,
  normalize,
  tmpdir,
} from '../src/index'

// eslint-disable-next-line import/order
import assert = require('power-assert')


const filename = basename(__filename)
const tmpDir = join(tmpdir(), 'test-tmp')
const pathPrefix = 'mytest'

describe(filename, () => {
  const fnName = 'createDir'

  it(`Should ${fnName}() work`, async () => {
    const random = Math.random()
    const randomPath = `${tmpDir}/${pathPrefix}-${random}`
    const file = `${randomPath}/test`

    try {
      const path = await createDir(randomPath).toPromise()
      assert(path === normalize(randomPath))
      const path2 = await createDir(randomPath).toPromise()
      assert(path2 === normalize(randomPath))
    }
    catch (ex) {
      rmdir(randomPath, err => console.warn(err))
      throw new Error(ex)
    }
  })
})

describe(filename + ' :createDir()', () => {
  before(async () => {
    await createDirAsync(tmpDir)
  })
  after((done) => {
    rmdir(tmpDir, (err) => {
      err && console.error(err)
      done()
    })
  })

  const fnName = 'createDir'

  it(`Should ${fnName}() work`, (done) => {
    const paths = [
      `${tmpDir}/${pathPrefix}-${Math.random()}`,
      `${tmpDir}/${pathPrefix}-${Math.random()}/.test/0ab`,
    ]

    return ofrom(paths).pipe(
      mergeMap((path) => {
        return createDir(path).pipe(
          tap((retPath) => {
            assert(retPath === normalize(path))
          }),
        )
      }),
      mergeMap(dirExists),
    ).subscribe(
      (path) => {
        assert(path.length)
        rmdir(path, err => err && console.error(err))
      },
      (err: Error) => {
        assert(false, err.message)
        done()
      },
      done,
    )
  })


  it(`Should ${fnName}() work with blank param`, (done) => {
    return of('').pipe(
      mergeMap(createDir),
      mergeMap(dirExists),
    ).subscribe(
      (path) => {
        assert(false, 'should throw error, but NOT with' + path)
        done()
      },
      (err: Error) => {
        assert(true, err.message)
        done()
      },
    )
  })

})

