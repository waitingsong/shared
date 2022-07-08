import assert from 'node:assert/strict'
import { tmpdir } from 'node:os'
import { join, normalize } from 'node:path'

import rmdir from 'rimraf'

import {
  createFileAsync,
  fileExists,
  isFileExists,
} from '../src/index.js'
import { fileShortPath } from '../src/lib/helper.js'


const tmpDir = join(tmpdir(), 'test-tmp')
const pathPrefix = 'mytest'


describe(fileShortPath(import.meta.url), () => {
  const fnName = 'isFileExists'

  it(`Should ${fnName}() work`, async () => {
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
      throw ex
    }
  })
})


describe(fileShortPath(import.meta.url), () => {
  const fnName = 'fileExist'

  it(`Should ${fnName}() work`, async () => {
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
      throw ex
    }
  })
})

