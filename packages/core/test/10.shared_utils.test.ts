import assert from 'node:assert/strict'
import { readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, normalize } from 'node:path'

import {
  createDirAsync,
  createFileAsync,
  isDirExists,
  isDirFileExists,
  isFileExists,
  sleep,
} from '../src/index.js'
import { fileShortPath } from '../src/lib/helper.js'


const tmpDir = join(tmpdir(), 'test-tmp')
const pathPrefix = 'mytest'

describe(fileShortPath(import.meta.url), () => {
  before(async () => {
    await createDirAsync(tmpDir)
  })
  after(async () => {
    await rm(tmpDir, { recursive: true, force: true })
  })


  it('Should isDirFileExists() work', async () => {
    assert(await isDirFileExists(tmpDir, 'DIR'), `user tmp dir should exist. path: "${tmpDir}"`)
  })

  it('Should isDirFileExists() work with blank path', async () => {

    assert(! await isDirFileExists('', 'DIR'), 'should return false with blank path')
  })


  it('Should createDirAsync() work', async () => {
    const random = Math.random()
    const randomPath = `${tmpDir}/${pathPrefix}-${random}`

    try {
      const path = await createDirAsync(randomPath)
      assert(path === normalize(randomPath))
    }
    catch (ex) {
      return assert(false, (ex as Error).message)
    }

    if (! await isDirExists(randomPath)) {
      return assert(false, `folder not exists, path: "${randomPath}"`)
    }

    await rm(randomPath, { recursive: true, force: true })
  })

  it('Should createDirAsync() work with odd path', async () => {
    const random = Math.random()
    const randomPath = `${tmpDir}/${pathPrefix}-${random}/.test/0ab`

    try {
      const path = await createDirAsync(randomPath)
      assert(path === normalize(randomPath))
    }
    catch (ex) {
      return assert(false, (ex as Error).message)
    }

    if (! await isDirExists(randomPath)) {
      return assert(false, `folder not exists, path: "${randomPath}"`)
    }

    await rm(randomPath, { recursive: true, force: true })
  })


  it('Should createDirAsync() work with blank param', (resolve) => {
    void createDirAsync('')
      .then(() => {
        assert(false, 'should throw error, but NOT')
        resolve()
      })
      .catch(() => resolve())
  })

  it('Should createFileAsyncAsync() work', async () => {
    const random = Math.random()
    const randomPath = `${tmpDir}/${pathPrefix}-${random}`
    const file = `${randomPath}/test`

    try {
      const path = await createFileAsync(file, random)
      assert(path === normalize(file), `Should ${file} but result ${path}`)
    }
    catch (ex) {
      return assert(false, (ex as Error).message)
    }

    if (! await isFileExists(file)) {
      return assert(false, `file not exists, path: "${file}"`)
    }

    try {
      const ret = (await readFile(file)).toString('utf8')
      assert(ret === String(random), `content not equal. write:"${random}", read: "${ret}"`)
    }
    catch (ex) {
      return assert(false, (ex as Error).message)
    }

    await rm(randomPath, { recursive: true, force: true })
  })

  it('Should createFileAsync() work with options', async () => {
    const random = Math.random()
    const randomPath = `${tmpDir}/${pathPrefix}-${random}`
    const file = `${randomPath}/test`
    const json = { key: random }
    const str = JSON.stringify(json)
    const opts = { mode: 0o640 }

    try {
      const path = await createFileAsync(file, json, opts)
      assert(path === normalize(file), `Should ${file} but result ${path}`)
    }
    catch (ex) {
      return assert(false, (ex as Error).message)
    }

    if (! await isFileExists(file)) {
      return assert(false, `file not exists, path: "${file}"`)
    }

    try {
      const ret = (await readFile(file)).toString('utf8')

      assert(ret === str, `content not equal. write:"${str}", read: "${ret}"`)
    }
    catch (ex) {
      return assert(false, (ex as Error).message)
    }

    await rm(randomPath, { recursive: true, force: true })
  })

  it('Should createFileAsync() work with object data', async () => {
    const random = Math.random()
    const randomPath = `${tmpDir}/${pathPrefix}-${random}`
    const file = `${randomPath}/test`
    const json = { key: random }
    const str = JSON.stringify(json)

    try {
      const path = await createFileAsync(file, json)
      assert(path === normalize(file), `Should ${file} but result ${path}`)
    }
    catch (ex) {
      return assert(false, (ex as Error).message)
    }

    if (! await isFileExists(file)) {
      return assert(false, `file not exists, path: "${file}"`)
    }

    try {
      const ret = (await readFile(file)).toString('utf8')

      assert(ret === str, `content not equal. write:"${str}", read: "${ret}"`)
    }
    catch (ex) {
      return assert(false, (ex as Error).message)
    }

    await rm(randomPath, { recursive: true, force: true })
  })

  it('Should createFileAsync() work with blank path', (resolve) => {
    createFileAsync('', '')
      .then(() => {
        assert(false, 'should throw error, but NOT')
        resolve()
      })
      .catch(() => resolve())
  })

  it('Should createFileAsync() work with buffer data', async () => {
    const random = Math.random()
    const randomPath = `${tmpDir}/${pathPrefix}-${random}`
    const file = `${randomPath}/test`
    const buf = Buffer.from(random.toString())

    try {
      const path = await createFileAsync(file, buf)
      assert(path === normalize(file), `Should ${file} but result ${path}`)
    }
    catch (ex) {
      return assert(false, (ex as Error).message)
    }

    if (! await isFileExists(file)) {
      return assert(false, `file not exists, path: "${file}"`)
    }

    try {
      const ret = (await readFile(file)).toString('utf8')

      assert(ret === buf.toString(), `content not equal. write:"${buf.toString()}", read: "${ret}"`)
    }
    catch (ex) {
      return assert(false, (ex as Error).message)
    }

    await rm(randomPath, { recursive: true, force: true })
  })


  it('Should isDirExists() work', async () => {
    try {
      assert(await isDirExists(tmpDir), `path should exists: "${tmpDir}"`)
    }
    catch (ex) {
      return assert(false, (ex as Error).message)
    }
  })

  it('Should isDirExists() work with invalid path', async () => {
    const random = Math.random()
    const randomPath = `${tmpDir}/${pathPrefix}-${random}`

    try {
      assert(! await isDirExists(randomPath), `path should NOT exists: "${randomPath}"`)
    }
    catch (ex) {
      return assert(false, (ex as Error).message)
    }
  })

  it('Should isDirExists() work with blank path', async () => {
    try {
      assert(! await isDirExists(''), 'empty path should NOT exists')
    }
    catch (ex) {
      return assert(false, (ex as Error).message)
    }
  })

  it('Should sleep() work ', async () => {
    await sleep()
    await sleep(50)
  })
})

