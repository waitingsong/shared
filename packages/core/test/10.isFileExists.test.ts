import * as assert from 'power-assert'
import * as rmdir from 'rimraf'

import {
  basename,
  createFileAsync,
  fileExists,
  isFileExists,
  join,
  normalize,
  tmpdir,
} from '../src/index'


const filename = basename(__filename)
const tmpDir = join(tmpdir(), 'test-tmp')
const pathPrefix = 'mytest'

describe(filename, () => {
  const fnName = 'isFileExists'

  it(`Should ${fnName}() works`, async () => {
    const random = Math.random()
    const randomPath = `${tmpDir}/${pathPrefix}-${random}`
    const file = `${randomPath}/test`

    try {
      assert(await isFileExists(file) === false, `file should not exists, path: "${file}"`)
      assert(await isFileExists('') === false, `file should not exists, path: "${file}"`)
      const path = await createFileAsync(file, random)
      assert(path === normalize(file), `Should ${file} but result ${path}`)
    }
    catch (ex) {
      rmdir(randomPath, err => console.warn(err))
      throw new Error(ex)
    }
  })
})

describe(filename, () => {
  const fnName = 'fileExist'

  it(`Should ${fnName}() works`, async () => {
    const random = Math.random().toString()
    const randomPath = `${tmpDir}/${pathPrefix}-${random}`
    const file = `${randomPath}/test`

    assert(await fileExists(file).toPromise() === '', `file should not exists, path: "${file}"`)
    try {
      const path = await createFileAsync(file, random)
      assert(path === normalize(file), `Should ${file} but result ${path}`)
      assert(await fileExists(file).toPromise() === normalize(file), `file not exists, path: "${file}"`)
    }
    catch (ex) {
      rmdir(randomPath, err => console.warn(err))
      throw new Error(ex)
    }
  })
})

