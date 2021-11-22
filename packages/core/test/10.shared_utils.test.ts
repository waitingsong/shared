import rmdir from 'rimraf'

import {
  basename,
  createDirAsync,
  createFileAsync,
  isDirExists,
  isDirFileExists,
  isFileExists,
  join,
  normalize,
  readFileAsync,
  tmpdir,
} from '../src/index'

// eslint-disable-next-line import/order
import assert = require('power-assert')


const filename = basename(__filename)
const tmpDir = join(tmpdir(), 'test-tmp')
const pathPrefix = 'mytest'

describe(filename, () => {
  before(async () => {
    await createDirAsync(tmpDir)
  })
  after((done) => {
    rmdir(tmpDir, (err) => {
      err && console.error(err)
      done()
    })
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

    rmdir(randomPath, err => err && console.error(err))
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

    rmdir(randomPath, err => err && console.error(err))
  })


  it('Should createDirAsync() work with blank param', (resolve) => {
    createDirAsync('')
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
      const ret = (await readFileAsync(file)).toString('utf8')
      assert(ret === String(random), `content not equal. write:"${random}", read: "${ret}"`)
    }
    catch (ex) {
      return assert(false, (ex as Error).message)
    }

    rmdir(randomPath, err => err && console.error(err))
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
      const ret = (await readFileAsync(file)).toString('utf8')

      assert(ret === str, `content not equal. write:"${str}", read: "${ret}"`)
    }
    catch (ex) {
      return assert(false, (ex as Error).message)
    }

    rmdir(randomPath, err => err && console.error(err))
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
      const ret = (await readFileAsync(file)).toString('utf8')

      assert(ret === str, `content not equal. write:"${str}", read: "${ret}"`)
    }
    catch (ex) {
      return assert(false, (ex as Error).message)
    }

    rmdir(randomPath, err => err && console.error(err))
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
      const ret = (await readFileAsync(file)).toString('utf8')

      assert(ret === buf.toString(), `content not equal. write:"${buf.toString()}", read: "${ret}"`)
    }
    catch (ex) {
      return assert(false, (ex as Error).message)
    }

    rmdir(randomPath, err => err && console.error(err))
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

})
